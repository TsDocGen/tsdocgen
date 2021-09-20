import ClassDoc from "../models/documentation/ClassDoc";
import EnumDoc from "../models/documentation/EnumDoc";
import FunctionDoc from "../models/documentation/FunctionDoc";
import InterfaceDoc from "../models/documentation/InterfaceDoc";
import TypeAliasDoc from "../models/documentation/TypeAliasDoc";
import UnknownDoc from "../models/documentation/UnknownDoc";
import VariableDoc from "../models/documentation/VariableDoc";

type Doc = ClassDoc | FunctionDoc | TypeAliasDoc | InterfaceDoc | EnumDoc | VariableDoc | UnknownDoc;

interface ProjectDocs {
    name: string;
    docs: Doc[]
}

type AppProps = {
    name: string;
    docs: ProjectDocs[]
}

function App({ docs }: AppProps) {
    return (
        <div>
            <div>Hey!</div>
            {docs.map((doc) => {
                return (
                    <div key={doc.name}>
                        <h2>{doc.name}</h2>
                        {doc.docs.map((doc) => {
                        const json = doc.toJSON();
                            return (
                                <pre key={json.name}>{JSON.stringify(json, null, 2)}</pre>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default App;