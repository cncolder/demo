/** @jest-environment node */

it('missing document', () => {
    expect(() => document).toThrow('document is not defined');
});
