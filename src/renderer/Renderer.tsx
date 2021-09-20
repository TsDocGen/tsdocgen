import * as ReactDOMServer from "react-dom/server";
import { Helmet, HelmetData } from 'react-helmet';
import * as fs from 'fs';
import * as path from 'path';
import { ProjectDocs } from "../types/docs";
import { ThemeProps } from "../types/theme";

export interface RenderOptions {
    helmet?: HelmetData;
    outDir: string;
    projectName: string;
    projectDir: string;
    docs: ProjectDocs[];
    Theme: React.FC<ThemeProps>;
}

class Renderer {
    renderProject({ 
        helmet = Helmet.renderStatic(), 
        Theme, 
        outDir, 
        projectName, 
        projectDir, 
        docs 
    }: RenderOptions) {
        const html = ReactDOMServer.renderToStaticMarkup(<Theme helmet={helmet} projectName={projectName} docs={docs} />);

        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
        }

        const dir = path.join(outDir, projectDir);

        fs.writeFileSync(path.join(dir, 'index.html'), html);

        console.log(`Output project files to ${dir}`);
    }
}

export default Renderer;