/*!
 * dot-filter <https://github.com/enrichman/dot-filter>
 *
 * Copyright (c) 2015, Enrico Candino.
 * Licensed under the MIT License.
 */
'use strict';

var dotFilter = function filter(obj, fields) {
    if (!fields || fields.length == 0) {
        return obj;
    }

    if(Object.prototype.toString.call(obj) === '[object Array]') {
        return filterArray(obj, fields);

    } else {
        return filterObject(obj, fields);
    }
};

var filterArray = function filterArray(obj, fields) {
    var filtered = [];

    obj.forEach(function(arrElement) {
        var f = dotFilter(arrElement, fields);
        if(Object.keys(f).length > 0) {
            filtered.push(f);
        }
    });

    return filtered;
};

var filterObject = function filterObject(obj, fields) {
    var filtered = {};

    fields.forEach(function (key) {

        var index = key.indexOf(".");
        if(index > -1) {
            var innerKey = key.substring(0, index);
            var outerKey = key.substring(index+1);

            var innerObj = dotFilter(obj[innerKey], [outerKey]);
            if(!filtered[innerKey] && Object.keys(innerObj).length > 0) {
                filtered[innerKey] = innerObj;
            } else {
                merge(filtered[innerKey], innerObj)
            }

        } else {
            if (obj && obj.hasOwnProperty(key)) {
                filtered[key] = obj[key];
            }
        }
    });

    return filtered;
};

var merge = function merge(obj1, obj2) {
    if(obj1 === obj2)
        return;

    for(var k1 in obj2) {
        if(obj2.hasOwnProperty(k1)) {
            if(!obj1[k1]) {
                obj1[k1] = obj2[k1];
            }
            merge(obj1[k1], obj2[k1]);
        }
    }
};

module.exports = dotFilter;