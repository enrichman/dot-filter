# dot-filter [![npm version](https://badge.fury.io/js/dot-filter.svg)](https://badge.fury.io/js/dot-filter)

> A node.js module to filter the fields of an object using the dot notation.

The goal of dot-filter is to provide an easy way to downsize your fat javascript objects.


## Install

Install dot-filter using [npm](https://www.npmjs.com/)

```sh
$ npm install dot-filter --save
```

## Usage

Import the library with require and simply pass to it your object and the array of fields that you want to keep:

```js
var dotFilter = require('dot-filter');

var obj =  {a: {b: {c: 'd'}, e: {f: 'g'}};
var fields = ["a.b.c"];
dotFilter(obj, fields);
//=> {a: {b: {c: 'd'}}}
```

## Examples

Let's suppose that we have a full user object:

```js
var user = {
    name: "John",
    password: "$2a$04$/oskCCAGHJpqcd3Uwn/gKex1GCxz/XYQ5uK0T20BY1zPVY8IhNHZG",
    email: "john.smith@mail.com",
    phones: [
        { personal: "+1 123 123456" },
        { work: "+1 123 123456" }
    ],
    address: {
        street: "1600 Amphitheatre Pkwy",
        postalCode: "94043",
        city: "Mountain View",
        region: "CA",
        country: "USA"
    }
};
```

but we want to provide just basic informations, such as *name* and *email*.

We can filter out the rest, specifying the fields that we want to keep:

```js
var fields = [ "name", "email" ];
var filteredUser = dotFilter(user, fields);
```

this will produce a lighter object, with only the required informations


```js
// filteredUser
{
    name: "John",
    email: "john.smith@mail.com"
};
```

### Dot notation

We can dive into inner objects using the dot notation.

#### Simple object

Using the previous user object we can keep only part of the address, such as the *country*:

```js
var fields = [ "name", "address.country" ];
var filteredUser = dotFilter(user, fields);
```

the result will be:

```js
// filteredUser
{
    name: "John",
    address: {
        country: "USA"
    }
};
```

#### Array

In case of arrays, only object with the matching property will be returned:

```js
var fields = [ "name", "phones.work" ];
var filteredUser = dotFilter(user, fields);
```

the result will be:

```js
// filteredUser
{
    name: "John",
    phones: [
        { work: "+1 123 123456" }
    ]
};
```

## Contributing

Pull requests and stars are always welcome!

If you discover any bugs or you have a feature requests, [please create an issue](https://github.com/enrichman/dot-filter/issues/new).

## Author

**Enrico Candino**

+ [github/enrichman](https://github.com/enrichman)
+ [twitter/enrichmann](https://twitter.com/enrichmann)

# License

Copyright © 2015 Enrico Candino

Released under the MIT license.
