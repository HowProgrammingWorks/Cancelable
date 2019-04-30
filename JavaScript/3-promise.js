'use strict';

class Cancelable extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      executor(val => {
        if (this.canceled) return;
        resolve(val);
      }, err => {
        if (this.canceled) return;
        reject(err);
      });
    });
    this.canceled = false;
  }
  cancel() {
    this.canceled = true;
  }
}

// Usage

{
  const promise = new Cancelable(resolve => {
    setTimeout(() => {
      resolve('first');
    }, 10);
  });

  promise.then(console.log).catch(console.log);
  console.dir({ promise });
}

{
  const promise = new Cancelable(resolve => {
    setTimeout(() => {
      resolve('second');
    }, 10);
  });

  promise.cancel();
  promise.then(console.log).catch(console.log);
  console.dir({ promise });
}
