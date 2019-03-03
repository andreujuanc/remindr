const polka = require('polka');
const { DOCKER_IMAGE_TAG='notset'} = process.env;
module.exports = polka()
    .get('/users/:id', (req, res) => {
        console.log(`~> Hello, ${req.hello}`);
        res.end(`User: ${req.params.id}`);
    })
    .get('/', (req, res) => {
        res.end(`OK - DOCKER_IMAGE_TAG: ${DOCKER_IMAGE_TAG} - Time: ${new Date().toISOString()}`);
    })