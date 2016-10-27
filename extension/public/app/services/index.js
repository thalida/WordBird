// Requires all of the index.js files for the components in this directory
global.requireUtils.requireAll( require.context('./', true, /\.\/[\w\-\_]+\/index\.js$/) );
