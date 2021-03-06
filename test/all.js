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

const assert = require('assert');
const Calculator = require('./calculator');

describe('all(...path)', function () {
  it('should be able to create', function () {
    const calculator = new Calculator();
    assert.equal(calculator.value, undefined);
  });

  it('should be able to clear', function () {
    const calculator = new Calculator();
    calculator.clear();
    assert.equal(calculator.value, 0);
  });

  it('should be able to add', function () {
    const calculator = new Calculator();
    calculator.clear();
    calculator.add(1);
    calculator.add(2);
    assert.equal(calculator.value, 3);
  });

  it('should be able to pow', function () {
    const calculator = new Calculator();
    calculator.clear();
    calculator.add(2);
    calculator.pow(8);
    assert.equal(calculator.value, 256);
  });
});
