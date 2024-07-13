import { LoggerService, Injectable, LogLevel } from "@nestjs/common";

@Injectable()
export class CustomLogger implements LoggerService {
	log(message: string, ...optionalParams: any[]) {
		throw new Error("Method not implemented.");
	}

	error(message: string, ...optionalParams: any[]) {
		throw new Error("Method not implemented.");
	}

	warn(message: string, ...optionalParams: any[]) {
		throw new Error("Method not implemented.");
	}

	debug?(message: string, ...optionalParams: any[]) {
		throw new Error("Method not implemented.");
	}

	verbose?(message: string, ...optionalParams: any[]) {
		throw new Error("Method not implemented.");
	}

	setLogLevels?(levels: LogLevel[]) {
		throw new Error("Method not implemented.");
	}
}
