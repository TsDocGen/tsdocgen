'use strict'

require('source-map-support').install();
require('ts-node').register();

const createPages = require('./gatsby/createPages');

console.log(createPages);

exports.createPages = createPages;