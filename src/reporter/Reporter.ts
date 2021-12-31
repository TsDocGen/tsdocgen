import { green, red, blue, yellow } from "ansi-colors";

class ReporterModel {
    info = (message: string): void => {
        console.log(blue('info ') + message);
    }
    verbose = (message: string): void => {
        console.log(message);
    }
    log = (message: string): void => {
        console.log(message);
    }
    success = (message: string): void => {
        console.log(green('success ') + message);
    }
    error = (message: string): void => {
        console.error(red('error ') + message);
    }
    panic = (message: string): never => {
        console.error(message);
        process.exit(1);
    }
    warn = (message: string): void => {
        console.log(yellow('warn ') + message);
    }
}

const Reporter = new ReporterModel();

export default Reporter;