import TSDocGen from './../src/tsdocgen';

const App = new TSDocGen();

const projects = App.generateDocumentation();

projects.forEach((project) => {
    project.forEachSourceDoc((doc) => {
        console.log(doc);
    });
})
