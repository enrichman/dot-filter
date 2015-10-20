/*!
 * dot-filter <https://github.com/enrichman/dot-filter>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var dotFilter = require('./');

var fixture = {
    a: {
        b: {
            c: 'd',
            e: 'f',
            g: 'h',
            i: { j: 'k', z: 'k' },
            l: { g: 'k' }
        },
        i: 'j',
        m: ['n'],
        o: [
            { p: 'q' },
            { r: 's' }
        ]
    }
};

describe('dot-filter', function () {
    it('should match properties with undefined fields', function () {
        assert.deepEqual(dotFilter(fixture), fixture);
    });

    it('should match properties with empty fields', function () {
        assert.deepEqual(dotFilter(fixture, []), fixture);
    });

    it('should match normal properties:', function () {
        assert.deepEqual(dotFilter(fixture, ["a"]), fixture);
        assert.deepEqual(dotFilter(fixture, ["a.b.c", "a.b.e"]),
            {
                a: {
                    b: {
                        c: 'd',
                        e: 'f'
                    }
                }
            });
        assert.deepEqual(dotFilter(fixture, ["a.b.c", "a.i"]),
            {
                a: {
                    b: {
                        c: 'd'
                    },
                    i: 'j'
                }
            });
        assert.deepEqual(dotFilter(fixture, ["a.b.i", "a.b.i.j"]),
            {
                a: {
                    b: {
                        i: { j: 'k', z: 'k' }
                    }
                }
            });
    });

    it('should match nested array:', function () {
        assert.deepEqual(dotFilter(fixture, ["a.b.c", "a.m"]),
            {
                a: {
                    b: {
                        c: 'd'
                    },
                    m: ['n']
                }
            });
    });

    it('should match nested array with all fields:', function () {
        assert.deepEqual(dotFilter(fixture, ["a.b.c", "a.o"]),
            {
                a: {
                    b: {
                        c: 'd'
                    },
                    o: [
                        { p: 'q' },
                        { r: 's' }
                    ]
                }
            });
    });

    it('should match nested array with matching fields:', function () {
        assert.deepEqual(dotFilter(fixture, ["a.b.c", "a.o.p"]),
            {
                a: {
                    b: { c: 'd' },
                    o: [
                        { p: 'q' }
                    ]
                }
            });
    });
});