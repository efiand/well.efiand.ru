# Пасьянс «Колодец»

Карточная игра для настольных и мобильных браузеров.

## Набор возможностей

- Можно играть в любом современном браузере [онлайн](https://well.efiand.ru) или оффлайн, если сохранить страницу (все стили, скрипты и векторная графика находятся в одном минифицированном файле).
- PWA.

## Для разработчика

Инфраструктура, CLI, postinstall, CI — см. [README site-core](https://github.com/efiand/site-core).

```bash
npm install
npm run dev
npm test
```

## CI и deploy

Push в `main`: lint + test; deploy на GitHub Pages по умолчанию после зелёного CI.

| Маркер в commit message | CI | Deploy |
| ----------------------- | -- | ------ |
| *(нет)* | ✅ | ✅ |
| `[no-deploy]` | ✅ | ❌ |
| `[WIP]` | ✅ | ❌ |
| `[skip` (`[skip ci]` …) | ❌ | ❌ |

См. [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Технические особенности

- SSR на [site-core](https://github.com/efiand/site-core): inline CSS/JS в одном HTML-файле
- Игровая логика — `src/client/modules/functions/`
- БЭМ-нейминг, валидация разметки в integration-тестах
