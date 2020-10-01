import { Config } from '@stencil/core';

export const config: Config = {
    buildDist: true, // needed to make the --dev build output the ./dist-stencil/esm directory which storybook's preview.js imports from.
    namespace: 'stencilbook-ding',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: './loader',
            dir: './dist-stencil',
        },
        {
            type: 'dist-custom-elements-bundle',
            dir: './dist-stencil',
        },
        {
            type: 'docs-readme',
            dir: './dist-stencil',
        },
        {
            type: 'docs-vscode',
            file: './dist-stencil/stencilbook-ding.json',
        },
        {
            type: 'www',
            dir: './dist-stencil',
            serviceWorker: null, // disable service workers
        },
    ],
    devServer: {
        port: 3333, // if changing, also change the iframe "src" in .storybook/preview-body.html and the port in package.json start:storybook
    },
};
