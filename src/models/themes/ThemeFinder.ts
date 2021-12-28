import Config from "../configuration";

class TsDocGenThemeFinder {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public getCurrentTheme = () => {
        return this.config.tsDocGenConfig.theme;
    }
}

export default TsDocGenThemeFinder;
