/**
 * Copyright (c) 2016 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mix = require('./');

function prefix(directory) {
  return function (dirent) {
    return path.join(directory, dirent);
  };
}

function javascript(dirent) {
  if (fs.statSync(dirent).isFile()) {
    return path.extname(dirent) === '.js';
  }

  return true;
}

function ignored(dirent) {
  return path.basename(dirent) !== 'index.js';
}

function required(dirent) {
  return require(dirent);
}

module.exports = function () {
  var directory = path.join.apply(this, arguments);

  var mixins = fs.readdirSync(directory)
    .map(prefix(directory))
    .filter(javascript)
    .filter(ignored)
    .map(required);

  return mix(mixins);
};
