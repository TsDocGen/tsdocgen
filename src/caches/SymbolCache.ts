import { Node, Structure, Symbol } from "ts-morph";
import BaseDoc from "../models/documentation/BaseDoc";

class SymbolCache {
    private cache = new Map<Symbol, BaseDoc<string, Node, Structure, any>>()

    public add = (symbol: Symbol, doc: BaseDoc<string, Node, Structure, any>) => {
        this.cache.set(symbol, doc);
    }

    public getDocFromSymbol = (symbol: Symbol) => {
        if (this.cache.has(symbol)) {
            return this.cache.get(symbol);
        }
        return undefined;
    }
}

export default SymbolCache;
