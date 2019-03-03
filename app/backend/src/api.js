const polka = require('polka');

module.exports = polka()
    .get('/users/:id', (req, res) => {
        console.log(`~> Hello, ${req.hello}`);
        res.end(`User: ${req.params.id}`);
    })
    .get('/', (req, res) => {
        res.end(`OK ${new Date().toISOString()}`);
    })