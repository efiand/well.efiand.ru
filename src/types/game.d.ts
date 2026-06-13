declare global {
	type EvaluateDropParams = {
		acceptIndex: number;
		acceptType: string;
		cardIndex: number;
		cardType: string;
		cornerSuits: string[];
		isCorner: boolean;
	};

	type EvaluateDropResult = {
		isAccepted: boolean;
		newDataAccept?: string;
	};
}

export {};
