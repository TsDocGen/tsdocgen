#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as ReactDOMServer from "react-dom/server";
import TSDocGen from "./../src/tsdocgen";
import Page from '../src/components/App';
import { Helmet } from 'react-helmet';
import HTML from '../src/components/HTML';

function render(projectName: string, projectDir: string, outDir: string, docs: any) {
    const helmet = Helmet.renderStatic();

    const element = HTML({
        helmet,
        children: Page({ docs: docs, name: projectName })
    });

    const html = ReactDOMServer.renderToStaticMarkup(element);

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }

    fs.writeFileSync(path.join(outDir, projectDir, 'index.html'), html);

    console.log(`Wrote files to ${outDir}`);
  }

const App = new TSDocGen();

App.generateDocumentation().then(async (result) => {
    const projects = Object.keys(result);

    if (projects.length === 1) {
        const docs = result[projects[0]];
        render(projects[0], '.', App.config.getOutputDir(), docs);
    }
    else {
        for (const projectName of projects) {
            const docs = result[projectName];
    
            render(projectName, projectName, App.config.getOutputDir(), docs);
        }
    }
}).catch((e) => {
    console.log(e);
});