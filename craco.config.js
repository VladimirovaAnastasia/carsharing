const path = require(`path`);

console.log('fffff')
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
};
