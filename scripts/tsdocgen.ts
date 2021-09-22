import TSDocGen from './../src/tsdocgen';

const App = new TSDocGen();

const projects = App.generateDocumentation();

projects.forEach((project) => {
    project.forEachDoc((doc) => {
        console.log(doc);
    });
});
