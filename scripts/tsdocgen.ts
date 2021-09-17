#!/usr/bin/env node

import TSDocGen from "./../src/tsdocgen";

const App = new TSDocGen();

App.generateDocumentation().then(() => {

}).catch((e) => {
    console.log(e);
});