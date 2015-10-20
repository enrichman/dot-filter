# dot-filter [![npm version](https://badge.fury.io/js/dot-filter.svg)](https://badge.fury.io/js/dot-filter)

> A node.js module to filter the fields of an object using the dot notation.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install dot-filter --save
```

## Usage

```js
var dotFilter = require('dot-filter');

var obj =  {a: {b: {c: 'd'}, e: {f: 'g'}};
var fields = ["a.b.c"];
dotFilter(obj, fields);
//=> {a: {b: {c: 'd'}}}
```

# License
Copyright © 2015 Enrico Candino - Released under the MIT license.
