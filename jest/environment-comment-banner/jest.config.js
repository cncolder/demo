/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    reporters: [
        'default',
        ['jest-html-reporter', { outputPath: './public/index.html' }],
        // ['jest-html-reporters', { expand: true, filename: 'index.html', hideIcon: true, publicPath: 'public' }],
        // [
        //     'jest-stare',
        //     {
        //         disableCharts: true,
        //         hidePassing: true,
        //         log: 'false',
        //         resultDir: 'public',
        //         reportHeadline: 'Jest',
        //         reportSummary: true,
        //         reportTitle: 'Jest',
        //     },
        // ],
    ],
    /** @default 'jsdom' */
    testEnvironment: 'jsdom',
    verbose: true,
};
