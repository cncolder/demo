import assert from 'assert';
import immer from 'immer';
import cloneDeep from 'lodash/cloneDeep';
import unset from 'lodash/unset';
import unsetFp from 'lodash/fp/unset';
import omit from 'lodash/omit';

import Benchmark from './benchmark';
import example from './example.json';
import './style.css';

const omitClone = <T extends object>(object: T | null | undefined, ...paths: string[]) => {
    return omit(cloneDeep(object), ...paths);
};

// const omitUnset = <T extends object>(object: T | null | undefined, ...paths: string[]) => {
//     let clonedObject = { ...object };
//     for (const path of paths) {
//         unset(clonedObject, path);
//     }
//     return clonedObject;
// };

const omitUnsetFp = <T extends object>(object: T | null | undefined, ...paths: string[]) => {
    return paths.reduce((result, path) => unsetFp(path)(result), object);
};

const omitUnsetAfterUnsetFp = <T extends object>(object: T | null | undefined, ...paths: string[]) => {
    return paths.reduce((result, path, index) => {
        if (index) {
            unset(result, path);
            return result;
        } else {
            unsetFp(path)(result);
        }
    }, object);
};

const omitImmer = <T extends object>(object: T | null | undefined, ...paths: string[]) => {
    return immer(object, (draft) => {
        omit(draft, ...paths);
    });
};

(function () {
    const jsonString = JSON.stringify(example);
    const rootElement = document.getElementById('root')!;

    const log = (...messages: any[]) => {
        const code = document.createElement('code');
        code.innerHTML = messages.join(' ');

        const pre = document.createElement('pre');
        pre.appendChild(code);

        rootElement.appendChild(pre);
    };

    const paths1 = ['web-app.servlet[0]["servlet-name"]'];

    const paths2 = [
        'web-app.servlet[0]["servlet-name"]',
        'web-app.servlet[0]["servlet-class"]',
        'web-app.servlet[0]["init-param"]["configGlossary:installationAt"]',
        'web-app.servlet[0]["init-param"]["configGlossary:adminEmail"]',
        'web-app.servlet[0]["init-param"]["configGlossary:poweredBy"]',
        'web-app.servlet[0]["init-param"]["configGlossary:poweredByIcon"]',
        'web-app.servlet[0]["init-param"]["configGlossary:staticPath"]',
        'web-app.servlet[0]["init-param"].templateProcessorClass',
        'web-app.servlet[0]["init-param"].templateLoaderClass',
        'web-app.servlet[0]["init-param"].templatePath',
    ];

    const paths3 = [
        'web-app.servlet[0]["servlet-name"]',
        'web-app.servlet[0]["servlet-class"]',
        'web-app.servlet[0]["init-param"]["configGlossary:installationAt"]',
        'web-app.servlet[0]["init-param"]["configGlossary:adminEmail"]',
        'web-app.servlet[0]["init-param"]["configGlossary:poweredBy"]',
        'web-app.servlet[0]["init-param"]["configGlossary:poweredByIcon"]',
        'web-app.servlet[0]["init-param"]["configGlossary:staticPath"]',
        'web-app.servlet[0]["init-param"].templateProcessorClass',
        'web-app.servlet[0]["init-param"].templateLoaderClass',
        'web-app.servlet[0]["init-param"].templatePath',

        'web-app.servlet[0]["init-param"].templateOverridePath',
        'web-app.servlet[0]["init-param"].defaultListTemplate',
        'web-app.servlet[0]["init-param"].defaultFileTemplate',
        'web-app.servlet[0]["init-param"].useJSP',
        'web-app.servlet[0]["init-param"].jspListTemplate',
        'web-app.servlet[0]["init-param"].jspFileTemplate',
        'web-app.servlet[0]["init-param"].cachePackageTagsTrack',
        'web-app.servlet[0]["init-param"].cachePackageTagsStore',
        'web-app.servlet[0]["init-param"].cachePackageTagsRefresh',
        'web-app.servlet[0]["init-param"].cacheTemplatesTrack',

        'web-app.servlet[0]["init-param"].cacheTemplatesStore',
        'web-app.servlet[0]["init-param"].cacheTemplatesRefresh',
        'web-app.servlet[0]["init-param"].cachePagesTrack',
        'web-app.servlet[0]["init-param"].cachePagesStore',
        'web-app.servlet[0]["init-param"].cachePagesRefresh',
        'web-app.servlet[0]["init-param"].cachePagesDirtyRead',
        'web-app.servlet[0]["init-param"].searchEngineListTemplate',
        'web-app.servlet[0]["init-param"].searchEngineFileTemplate',
        'web-app.servlet[0]["init-param"].searchEngineRobotsDb',
        'web-app.servlet[0]["init-param"].useDataStore',

        'web-app.servlet[0]["init-param"].dataStoreClass',
        'web-app.servlet[0]["init-param"].redirectionClass',
        'web-app.servlet[0]["init-param"].dataStoreName',
        'web-app.servlet[0]["init-param"].dataStoreDriver',
        'web-app.servlet[0]["init-param"].dataStoreUrl',
        'web-app.servlet[0]["init-param"].dataStoreUser',
        'web-app.servlet[0]["init-param"].dataStorePassword',
        'web-app.servlet[0]["init-param"].dataStoreTestQuery',
        'web-app.servlet[0]["init-param"].dataStoreLogFile',
        'web-app.servlet[0]["init-param"].dataStoreInitConns',

        'web-app.servlet[1]["servlet-name"]',
        'web-app.servlet[1]["servlet-class"]',
        'web-app.servlet[1]["init-param"].mailHost',
        'web-app.servlet[1]["init-param"].mailHostOverride',
        'web-app.servlet[2]["servlet-name"]',
        'web-app.servlet[2]["servlet-class"]',
        'web-app.servlet[3]["servlet-name"]',
        'web-app.servlet[3]["servlet-class"]',
        'web-app.servlet[4]["servlet-name"]',

        'invalid.path',
    ];

    new Benchmark.Suite()
        .add(`omit deep clone (${paths1.length} paths)`, () => {
            omitClone(example, ...paths1);
        })
        .add(`omit deep clone (${paths2.length} paths)`, () => {
            omitClone(example, ...paths2);
        })
        .add(`omit deep clone (${paths3.length} paths)`, () => {
            omitClone(example, ...paths3);
        })
        .add(`omit with unset after unset fp (${paths1.length} paths)`, () => {
            omitUnsetAfterUnsetFp(example, ...paths1);
        })
        .add(`omit with unset after unset fp (${paths2.length} paths)`, () => {
            omitUnsetAfterUnsetFp(example, ...paths2);
        })
        .add(`omit with unset after unset fp (${paths3.length} paths)`, () => {
            omitUnsetAfterUnsetFp(example, ...paths3);
        })
        .add(`omit with unset fp (${paths1.length} paths)`, () => {
            omitUnsetFp(example, ...paths1);
        })
        .add(`omit with unset fp (${paths2.length} paths)`, () => {
            omitUnsetFp(example, ...paths2);
        })
        .add(`omit with unset fp (${paths3.length} paths)`, () => {
            omitUnsetFp(example, ...paths3);
        })
        .add(`omit by immer (${paths1.length} paths)`, () => {
            omitImmer(example, ...paths1);
        })
        .add(`omit by immer (${paths2.length} paths)`, () => {
            omitImmer(example, ...paths2);
        })
        .add(`omit by immer (${paths3.length} paths)`, () => {
            omitImmer(example, ...paths3);
        })
        .on('start', function (this: Benchmark.Suite, event: Benchmark.Event) {
            log(this.length, 'benchmark cases');
        })
        .on('cycle', (event: Benchmark.Event) => {
            if ('error' in event.target && event.target['error']) return console.error(event.target['error']);

            assert(JSON.stringify(example) === jsonString, `${event.target.name} mutates the original object!`);

            const { name = '', hz = 0 } = event.target;
            const opsPerSec = Math.round(hz).toLocaleString();

            log(name.padEnd(36, '.'), opsPerSec.padStart(12, ' '), 'ops/s');
        })
        .on('complete', () => {
            log('DONE!');
        })
        .run({ async: true });
})();
