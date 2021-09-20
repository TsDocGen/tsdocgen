import * as ReactDOMServer from "react-dom/server";
import { Helmet, HelmetData } from 'react-helmet';
import * as fs from 'fs';
import * as path from 'path';
import { DocUnion, ProjectDocs } from "../types/docs";
import { ThemeProps } from "../types/theme";
import RendererProvider from "./RendererProvider";
import * as DefaultTheme from 'tsdocgen-themes';

export interface RenderOptions {
    helmet?: HelmetData;
    outDir: string;
    projectName: string;
    projectDir: string;
    docs: ProjectDocs[];
    Theme: React.FC<ThemeProps>;
}

class Renderer {
    public getUrlForDoc(doc: DocUnion) {
        console.log(doc);
    }

    public renderProject({
        helmet = Helmet.renderStatic(),
        Theme,
        outDir,
        projectName,
        projectDir,
        docs
    }: RenderOptions) {
        const html = ReactDOMServer.renderToStaticMarkup(
            <RendererProvider renderer={this}>
                <Theme helmet={helmet} projectName={projectName} docs={docs} />
            </RendererProvider>
        );

        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
        }

        const dir = path.join(outDir, projectDir);

        fs.writeFileSync(path.join(dir, 'index.html'), html);

        console.log(`Output project files to ${dir}`);
    }
}

export default Renderer;