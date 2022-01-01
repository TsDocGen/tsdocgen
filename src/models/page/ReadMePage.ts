import Page, { TsDocGenPageJSON } from "./Page";

export interface TsDocGenReadMePageJSON extends TsDocGenPageJSON<"ReadMePage"> {
}

class TsDocGenReadMePage extends Page<'ReadMePage'> {
    constructor() {
        super("ReadMePage", '');
    }

    public override toJSON(): TsDocGenReadMePageJSON {
        return {
            ...super.toJSON()
        }
    }
}

export default TsDocGenReadMePage;
