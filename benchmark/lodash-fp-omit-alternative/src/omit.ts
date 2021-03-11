import cloneDeep from 'lodash/cloneDeep';
import unset from 'lodash/fp/unset';
import omit from 'lodash/omit';

export const omitClone = <T extends object>(object: T | null | undefined, ...paths: string[]) => {
    return omit(cloneDeep(object), ...paths);
};

export const omitUnset = <T extends object>(object: T | null | undefined, ...paths: string[]) => {
    return paths.reduce((result, path) => unset(path)(result), object);
};
