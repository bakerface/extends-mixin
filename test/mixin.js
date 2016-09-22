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

const mixin = require('..');
const assert = require('assert');

class Base {
  calculate() {
    return 0;
  }
}

const clear = () => Base => class extends Base {
  calculate() {
    return 0;
  }
};

const plus = n => Base => class extends Base {
  calculate() {
    return super.calculate() + n;
  }
};

const pow = n => Base => class extends Base {
  calculate() {
    return Math.pow(super.calculate(), n);
  }
};

describe('mix(mixins)', function () {
  it('should return base when mixins are undefined', function () {
    const mix = mixin();
    const Calculator = mix(Base);
    const calculator = new Calculator();

    assert.equal(calculator.calculate(), 0);
  });

  it('should return base when mixins are an empty array', function () {
    const mix = mixin([]);
    const Calculator = mix(Base);
    const calculator = new Calculator();

    assert.equal(calculator.calculate(), 0);
  });

  it('should allow mixing by arguments', function () {
    const mix = mixin(plus(10), pow(2));
    const Calculator = mix(Base);
    const calculator = new Calculator();

    assert.equal(calculator.calculate(), 100);
  });

  it('should allow mixing by array', function () {
    const mix = mixin([
      plus(2),
      pow(8)
    ]);

    const Calculator = mix(Base);
    const calculator = new Calculator();

    assert.equal(calculator.calculate(), 256);
  });

  it('should allow an empty target', function () {
    const mix = mixin([
      clear(),
      plus(3),
      pow(2)
    ]);

    const Calculator = mix();
    const calculator = new Calculator();

    assert.equal(calculator.calculate(), 9);
  });
});
