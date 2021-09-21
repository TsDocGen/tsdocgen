import { GatsbyNode } from "gatsby";
import { resolve } from 'path';
import TSDocGen from "../src/tsdocgen"

const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions

  const App = new TSDocGen();

  const result = await App.generateDocumentation();

  for (const projectName in result) {
    const docs = result[projectName];

    const component = resolve(__dirname, '../src/themes/ant-design/App.tsx');
  
    createPage({
        path: `${projectName}`,
        component: component,
        context: { docs: [docs[0].docs[0].toJSON()], name: projectName }
    });
  }
  
}

module.exports = exports = createPages;