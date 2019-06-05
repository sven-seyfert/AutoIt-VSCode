'use strict'

const path = require('path')

/**@type {import('webpack').Configuration} */
const config = {
    target: 'node', // vscode extensions run in a Node.js-context

    entry: './out/src/extension.js', // the entry point of this extension

    output: {
        // the bundle is stored in the 'dist' folder
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },

    devtool: 'source-map',

    externals: {
        vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded.
        // Add other modules that cannot be webpack'ed

    },

    resolve: {
        // support reading JavaScript files,
        extensions: ['.js']
    },
}

module.exports = config
