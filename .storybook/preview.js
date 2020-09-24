import { isValidMetaData, setCustomElements } from '@storybook/web-components';
import { defineCustomElements } from '../dist-stencil/esm/loader.js';

defineCustomElements(window, {});

const elementDefs = require('../dist-stencil/stencilbook-ding.json');
// console.log('[preview.js] isValidMetaData: ', isValidMetaData(elementDefs));
setCustomElements(elementDefs);

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
        extractComponentDescription: (component, { notes }) => {
            if (notes) {
                return typeof notes === 'string' ? notes : notes.markdown || notes.text;
            }
            return null;
        },
    },
};

if (module.hot) {
    // Tells the webpack-hot-middleware that this preview iframe module is not HMR capable.
    // This will cause webpack to do a full reload of the preview frame on any changes.
    // Note that similar module.hot.decline() code is injected into each *.stories.tsx file via a webpack plugin
    module.hot.decline();

    // Webpack logs a bunch of extra warnings about this situation, have patched console.warn to suppress these messages.
    // Remove if you prefer not to have global console messed with..
    const blockList = [
        `Ignored an update to declined module`,
        `[HMR] The following modules couldn't be hot updated`,
        `[HMR]  - `,
    ];
    const originalConsoleWarn = console.warn;
    console.warn = function() {
        if (arguments[0] && typeof arguments[0] === 'string') {
            if (blockList.some(ignored => arguments[0].startsWith(ignored))) {
                return;
            }
        }
        originalConsoleWarn.apply(console, arguments);
    };
}
