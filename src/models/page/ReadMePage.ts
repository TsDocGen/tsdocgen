import Page from "./Page";

class TsDocGenReadMePage extends Page {
    public override toJSON = () => {
        return {
            ...super.toJSON()
        }
    }
}

export default TsDocGenReadMePage;
