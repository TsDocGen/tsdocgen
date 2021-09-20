import { ProjectDocs } from "../types/docs";

type AppProps = {
    name: string;
    docs: ProjectDocs[]
}

function App({ docs, name }: AppProps) {
    return (
        <div>
            <h1>{name}</h1>
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