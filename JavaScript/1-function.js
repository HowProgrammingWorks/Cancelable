'use strict';

const cancelable = (fn) => {
  const wrapper = (...args) => (fn ? fn(...args) : null);
  wrapper.cancel = () => {
    fn = null;
  };
  return wrapper;
};

// Usage

const fn = (par) => {
  console.log('Function called, par:', par);
};

const f = cancelable(fn);
f('first');
f.cancel();
f('second');
