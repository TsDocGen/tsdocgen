import { green, red, symbols } from "ansi-colors";

class ReporterModel {
    info = (message: string): void => {
        console.log(message)
    }
    verbose = (message: string): void => {
        console.log(message)
    }
    log = (message: string): void => {
        console.log(message)
    }
    success = (message: string): void => {
        console.log(green(symbols.check + ` `) + message)
    }
    error = (message: string): void => {
        console.error(red(symbols.cross + ` `) + message)

    }
    panic = (message: string): never => {
        console.error(message)
        process.exit(1)
    }
    warn = (message: string): void => {
        console.warn(message)
    }
}

const Reporter = new ReporterModel();

export default Reporter;