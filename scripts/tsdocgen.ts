// import TSDocGen from '@tsdocgen/core';
// import getThemeCache from '@tsdocgen/core/theme/getThemeCache';
import { inspect } from 'util';
// import getThemeCache from '../src/theme/getThemeCache';
import TSDocGen from '../src/tsdocgen';
const App = new TSDocGen();

// console.log(getThemeCache().getCurrentTheme());

App.projects.forEach((project) => {
    project.forEachDoc((doc) => {
        console.log(inspect(doc, {showHidden: false, depth: null, colors: true}));
        // return doc;
    });
});
