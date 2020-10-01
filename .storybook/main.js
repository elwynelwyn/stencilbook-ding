const { ModifyModuleSourcePlugin } = require('modify-source-webpack-plugin');

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

        // console.log('\n\n\n', JSON.stringify(config, null, 4), '\n\n\n');

        return config;
    },
};
