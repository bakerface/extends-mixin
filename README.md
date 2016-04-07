# extends-mixin
[![npm package](https://badge.fury.io/js/extends-mixin.svg)](http://badge.fury.io/js/extends-mixin)
[![build](https://travis-ci.org/bakerface/extends-mixin.svg?branch=master)](https://travis-ci.org/bakerface/extends-mixin)
[![code climate](https://codeclimate.com/github/bakerface/extends-mixin/badges/gpa.svg)](https://codeclimate.com/github/bakerface/extends-mixin)
[![coverage](https://codeclimate.com/github/bakerface/extends-mixin/badges/coverage.svg)](https://codeclimate.com/github/bakerface/extends-mixin/coverage)
[![issues](https://img.shields.io/github/issues/bakerface/extends-mixin.svg)](https://github.com/bakerface/extends-mixin/issues)
[![dependencies](https://david-dm.org/bakerface/extends-mixin.svg)](https://david-dm.org/bakerface/extends-mixin)
[![devDependencies](https://david-dm.org/bakerface/extends-mixin/dev-status.svg)](https://david-dm.org/bakerface/extends-mixin#info=devDependencies)
[![downloads](http://img.shields.io/npm/dm/extends-mixin.svg)](https://www.npmjs.com/package/extends-mixin)

The purpose of this package is to provide a function for reducing a collection
of mixins into a single mixin that applies each of the mixins. Let's take an
example:

Lets assume we have a `Person` class with a `name` field that we want to augment
to include accessors for accessing a person's first and last name.

``` javascript
class Person {
	constructor(name) {
		this.name = name;
	}
}

const john = new Person('John Doe');
assert.equal(john.name, 'John Doe');
```

We can create a mixin to get the first name like so:

``` javascript
const canGetFirstName = Base => class extends Base {
	get first() {
		return this.name.split(' ').shift();
	}
};

const PersonWithFirstName = canGetFirstName(Person);
const john = new PersonWithFirstName('John Doe');

assert.equal(john.name, 'John Doe');
assert.equal(john.first, 'John');
```

We can also create another mixin to get the last name like so:

``` javascript
const canGetLastName = Base => class extends Base {
	get last() {
		return this.name.split(' ').pop();
	}
};

const PersonWithLastName = canGetLastName(Person);
const john = new PersonWithLastName('John Doe');

assert.equal(john.name, 'John Doe');
assert.equal(john.last, 'Doe');
```

If we want to combine the mixins, we can do this:

``` javascript
const PersonWithFirstAndLastName = canGetFirstName(canGetLastName(Person));
const john = new PersonWithFirstAndLastName('John Doe');

assert.equal(john.name, 'John Doe');
assert.equal(john.first, 'John');
assert.equal(john.last, 'Doe');
```

While this appears ok for two mixins, it becomes difficult to read as the number
of mixins increase. Consider the following:

``` javascript
const CustomPerson = canGetFirstName(canGetLastName(canGetChildren(canGetSiblings(Person))));
```

The purpose of this package is to make this easier by allow you to do this:

``` javascript
const mix = require('extends-mixin');

const canGetAncestry = mix([
	canGetFirstName,
	canGetLastName,
	canGetChildren,
	canGetSiblings
]);

const CustomPerson = canGetAncestry(Person);
```

You can also pass each mixin as an argument if it makes you feel better:

``` javascript
const mix = require('extends-mixin');

const canGetAncestry = mix(canGetFirstName,
	canGetLastName,
	canGetChildren,
	canGetSiblings);

const CustomPerson = canGetAncestry(Person);
```

If your mixin list happens to be empty, the identity function is returned:

``` javascript
const mix = require('extends-mixin');
const doNothing = mix();
const JustAPerson = doNothing(Person);

const john = new JustAPerson('John Doe');
assert.equal(john.name, 'John Doe');
```

Because this package reduces many mixins to a single mixin, grouping mixins is
easy:

``` javascript
const mix = require('extends-mixin');

const canGetFirstAndLastName = mix(canGetFirstName, canGetLastName);
const canGetChildrenAndSiblings = mix(canGetChildren, canGetSiblings);
const canGetAncestry = mix(canGetFirstAndLastName, canGetChildrenAndSiblings);

const CustomPerson = canGetAncestry(Person);
```

As a convenience, a function is provided for loading all mixins within a
directory. Nested directories are required as normal. Only files with `.js` extensions are accepted and `index.js` is ignored. A typical `index.js` would be the following:

``` javascript
const all = require('extends-mixin/all');
module.exports = all(__dirname);
```

Pull requests and bug reports are welcome, as always.
