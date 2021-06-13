/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    reporters: ['default', ['jest-html-reporter', { outputPath: './dist/index.html' }]],
    /** @default 'jsdom' */
    testEnvironment: 'jsdom',
    verbose: true,
};
