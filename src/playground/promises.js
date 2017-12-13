const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Resolved data');
    // reject('Something went wrong');
  }, 2500);
});

promise.then((data) => {
  console.log('1', data);
  return 'some data';
}).then((str) => {
  console.log('2', str);
}).catch((error) => {
  console.log('error:', error);
});