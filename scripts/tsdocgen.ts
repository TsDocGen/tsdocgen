import TSDocGen from './../src/tsdocgen';
import { inspect } from 'util'
const App = new TSDocGen();

App.projects.forEach((project) => {
    project.forEachDoc((doc) => {
        console.log(inspect(doc, {showHidden: false, depth: null, colors: true}));
        // return doc;
    });
});
