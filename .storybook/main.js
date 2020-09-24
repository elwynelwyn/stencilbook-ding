const { ModifyModuleSourcePlugin } = require('modify-source-webpack-plugin');
const execa = require('execa');
const { pt } = require('prepend-transform');

const stencilLogPrefix = '    stencil: ';
const stencilDevServerUrl = 'http://localhost:3333';

module.exports = {
    'stories': [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    'addons': [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
    ],
    webpackFinal: async (config, { configType }) => {
        config.plugins = config.plugins || [];
        config.plugins.push(new ModifyModuleSourcePlugin({
            test: /.*\.stories\.(js|jsx|ts|tsx)$/,
            modify: (src) => {
                return src + `

// Auto added by webpack plugin, see main.js
if (module.hot) {
    module.hot.decline();
}
`;
            },
        }));

        if (configType === 'DEVELOPMENT') {
            // You may prefer to remove this and manually start the Stencil devserver separately, or use concurrently / npm-run-all or similar
            await startStencilDevServer();
        }

        // console.log('\n\n\n', JSON.stringify(config, null, 4), '\n\n\n');

        return config;
    },
};

async function startStencilDevServer() {
    console.log('\n' + stencilLogPrefix + 'Launching StencilJS dev server...');
    const stencilProcess = execa.command('npm run stencil:start-via-storybook', {
        buffer: false,
    });
    stencilProcess.stdout.pipe(pt(stencilLogPrefix)).pipe(process.stdout);
    stencilProcess.stderr.pipe(pt(stencilLogPrefix)).pipe(process.stderr);

    let isKilling = false;
    [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
        process.on(eventType, (eventType, exitCode) => {
            if (isKilling) { return; }
            isKilling = true;
            stencilProcess.kill(exitCode || 1, { forceKillAfterTimeout: 2000 });
        });
        stencilProcess.on(eventType, (...args) => {
            if (isKilling) { return; }
            isKilling = true;
            process.exit(1);
        });
    });

    await new Promise((resolve) => {
        stencilProcess.stdout.on('data', (data) => {
            if (data.toString().includes(stencilDevServerUrl)) {
                console.log(stencilLogPrefix + 'StencilJS dev server is ready!\n');
                resolve();
            }
        });
    });
}
