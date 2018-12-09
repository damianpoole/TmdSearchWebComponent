const tmd = require('./tmd.js');

tmd.search('Jack Reacher').then(data => {
    console.log(data[0].overview);
});
