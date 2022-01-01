class TsDocGenPage {
    public url: string;
    public navigation: [];

    constructor(url: string) {
        this.url = url;
        this.navigation = [];
    }

    public toJSON = () => {
        return {
            url: this.url,
            navigation: this.navigation
        }
    }
}

export default TsDocGenPage;
