import TSDocGen from './../src/tsdocgen';

const App = new TSDocGen();

App.projects.forEach((project) => {
    project.forEachDoc((doc) => {
        console.log(doc);
    });
});
