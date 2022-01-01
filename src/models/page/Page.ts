export interface TsDocGenPageJSON<T extends string> {
    type: T;
    url: string;
    navigation: [];
}

class TsDocGenPage<T extends string> {
    public url: string;
    public type: T;
    public navigation: [];

    constructor(type: T, url: string) {
        this.url = url;
        this.navigation = [];
        this.type = type;
    }

    public toJSON(): TsDocGenPageJSON<T> {
        return {
            type: this.type,
            url: this.url,
            navigation: this.navigation
        }
    }
}

export default TsDocGenPage;
