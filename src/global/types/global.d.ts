export = global;

declare global {
	interface ProcessEnv extends Dict<string> {
		[key: string]: number | string;
	}
}
