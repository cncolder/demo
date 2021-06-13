import mocha from 'mocha';
import { expect } from 'chai';

import { omitClone, omitUnset } from './omit';
import Benchmark from './benchmark';
import data from './data.json';

import 'mocha/mocha.css';

mocha.setup('bdd');

describe('omit', () => {
    const data = { a: 1, b: [{ c: 3 }], d: 4 };
    const json = JSON.stringify(data);
    const paths = ['a', 'b[0].c'];
    const expected = { b: [{}], d: 4 };

    it('omitClone - omit paths after clone', () => {
        expect(omitClone(data, ...paths)).eql(expected);
        expect(JSON.stringify(data)).equal(json);
    });

    it('omitUnset - omit paths by unset fp', () => {
        expect(omitUnset(data, ...paths)).eql(expected);
        expect(JSON.stringify(data)).equal(json);
    });
});

describe('benchmark', function () {
    this.timeout('60s');

    const testSuite = (fn: Function): mocha.Func => {
        return function () {
            return new Promise<void>((resolve, reject) => {
                return new Benchmark.Suite()
                    .add(' ', fn)
                    .on('cycle', (event: Benchmark.Event) => {
                        if ('error' in event.target && event.target['error']) return reject(event.target['error']);
                        this.test!.title += String(event.target);
                        resolve();
                    })
                    .run({ async: true });
            });
        };
    };

    for (const paths of data.paths) {
        describe(`${paths.length} path`, () => {
            it(
                'omitClone',
                testSuite(() => omitClone(data, ...paths))
            );

            it(
                'omitUnset',
                testSuite(() => omitUnset(data, ...paths))
            );
        });
    }
});

mocha.run();
