if (typeof window !== 'undefined' && window.origin.endsWith('.csb.app')) {
    module.exports = require('./benchmark.min');
} else {
    Object.assign(window, { _: require('lodash') });
    Object.assign(window, { Benchmark: require('benchmark') });

    module.exports = window.Benchmark;
}
