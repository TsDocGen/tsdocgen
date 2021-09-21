import TSDocGen from './../src/tsdocgen';

const App = new TSDocGen();

const projects = App.generateDocumentation();

projects.forEach((project) => {
    console.log(project.toJSON());
})
