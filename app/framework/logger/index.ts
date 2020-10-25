class Logger {
	debug = (msg: any) => {
		console.debug(`DEBUG: ${msg}`);
	};

	info = (msg: any) => {
		console.debug(`INFO: ${msg}`);
	};

	warn = (msg: any) => {
		console.debug(`WARN: ${msg}`);
	};

	error = (msg: any) => {
		console.debug(`ERROR: ${msg}`);
	};
}

const logger = new Logger();

export default logger;
