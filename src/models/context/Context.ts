import { TypeChecker } from "ts-morph";
import SymbolCache from "../../caches/SymbolCache";

class TsDocGenContext {
    public symbolCache = new SymbolCache();
    public typeChecker: TypeChecker;
    
    constructor(typeChecker: TypeChecker) {
        this.typeChecker = typeChecker;
    }
}

export default TsDocGenContext;
