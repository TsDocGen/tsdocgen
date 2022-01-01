// import TSDocGen from '@tsdocgen/core';
// import getThemeCache from '@tsdocgen/core/theme/getThemeCache';
import { inspect } from 'util';
// import getThemeCache from '../src/theme/getThemeCache';
import TSDocGen from '../src/tsdocgen';
const App = new TSDocGen();

// console.log(getThemeCache().getCurrentTheme());

App.projects.forEach((project) => {
    project.forEachPage((page) => {
        console.log(inspect(page, {showHidden: false, depth: null, colors: true}));
        // return doc;
    });
});
