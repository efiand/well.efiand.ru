import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import pkg from '../package.json' with { type: 'json' };
import { upgradeGitHubActions } from './upgrade-github-actions.js';

const PACKAGE_LOCK_PATH = fileURLToPath(new URL('../package-lock.json', import.meta.url));
const WASM_BINDING_KEY = 'node_modules/@rolldown/binding-wasm32-wasi';

const { devDependencies = {} } = pkg;

/** @type {(name: string, version: string) => PackageLockEntry} */
function buildLockEntry(name, version) {
	const meta = fetchPackageMeta(name, version);
	const { dependencies } = meta;

	/** @type {[string, unknown][]} */
	const fields = [
		['version', version],
		['resolved', meta.dist.tarball],
		['integrity', meta.dist.integrity],
		['dev', true],
		['license', meta.license || 'MIT'],
		['optional', true],
		['peer', true],
	];

	if (dependencies) {
		fields.push([
			'dependencies',
			Object.fromEntries(
				Object.keys(dependencies)
					.sort()
					.map((dependencyName) => [dependencyName, dependencies[dependencyName]]),
			),
		]);
	}

	return Object.fromEntries(fields);
}

/** @type {(name: string, version: string) => NpmPackageMeta} */
function fetchPackageMeta(name, version) {
	return JSON.parse(execSync(`npm view ${name}@${version} --json`, { encoding: 'utf8' }));
}

/** @type {(packages: PackageLockPackages, key: string, entry: PackageLockEntry) => PackageLockPackages} */
function insertPackageInKeyOrder(packages, key, entry) {
	const { [key]: _removedEntry, ...rest } = packages;
	/** @type {PackageLockPackages} */
	const result = {};
	let isInserted = false;

	for (const [packageKey, packageEntry] of Object.entries(rest)) {
		if (!isInserted && packageKey > key) {
			result[key] = entry;
			isInserted = true;
		}

		result[packageKey] = packageEntry;
	}

	if (!isInserted) {
		result[key] = entry;
	}

	return result;
}

/** @type {(entry: PackageLockEntry, version: string) => boolean} */
function isCanonicalLockEntry(entry, version) {
	if (!entry || entry.version !== version || Object.keys(entry)[0] !== 'version') {
		return false;
	}

	const { dependencies } = entry;

	if (!dependencies || typeof dependencies !== 'object') {
		return !dependencies;
	}

	const dependencyKeys = Object.keys(dependencies);

	return dependencyKeys.every((key, index) => key === [...dependencyKeys].sort()[index]);
}

/**
 * npm i на текущей ОС вырезает optional wasm-зависимости rolldown (@emnapi/*) из lockfile.
 * Дописываем их по версиям из @rolldown/binding-wasm32-wasi — package.json не трогаем.
 */
function restoreRolldownWasmLockfileEntries() {
	const lock = JSON.parse(readFileSync(PACKAGE_LOCK_PATH, 'utf8'));
	const wasmBinding = lock.packages[WASM_BINDING_KEY];

	if (!wasmBinding?.dependencies) {
		return;
	}

	const { '@emnapi/core': coreVersion, '@emnapi/runtime': runtimeVersion } = wasmBinding.dependencies;

	for (const [packageName, version] of [
		['@emnapi/core', coreVersion],
		['@emnapi/runtime', runtimeVersion],
	]) {
		const key = `node_modules/${packageName}`;
		const existing = lock.packages[key];

		if (isCanonicalLockEntry(existing, version)) {
			continue;
		}

		lock.packages = insertPackageInKeyOrder(lock.packages, key, buildLockEntry(packageName, version));
	}

	writeFileSync(PACKAGE_LOCK_PATH, `${JSON.stringify(lock, null, '\t')}\n`);
}

const list = Object.keys(devDependencies);

if (list.length) {
	execSync(`npm i -DE ${list.join('@latest ')}@latest`, { stdio: 'inherit' });
	execSync('npx update-browserslist-db@latest --yes', { stdio: 'inherit' });
	restoreRolldownWasmLockfileEntries();
}

await upgradeGitHubActions();
