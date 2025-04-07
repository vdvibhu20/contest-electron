export default interface IProblem {
	id: number;
	name: string;
	timelimits: {
		cpp: number;
		c: number;
		py2: number;
		py3: number;
		js: number;
		csharp: number;
		java: number;
	};
	image: string;
	//todo: change this to enum
	status: string;
	content: {
		name: string;
		difficulty: number;
		constraints: string;
		description: string;
		explanation: string;
		input_format: string;
		sample_input: string;
		output_format: string;
		sample_output: string;
	};
}
