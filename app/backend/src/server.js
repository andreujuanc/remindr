const polka = require('polka');

function one(req, res, next) {
    req.hello = 'world';
    next();
}

function two(req, res, next) {
    req.foo = '...needs better demo 😔';
    next();
}

polka()
    .use(one, two)
    .get('/users/:id', (req, res) => {
        console.log(`~> Hello, ${req.hello}`);
        res.end(`User: ${req.params.id}`);
    })
    .get('/', (req, res) => {
        res.end(`OK ${new Date().toISOString()}`);
    })
    .listen(3000, err => {
        if (err) throw err;
        console.log(`> Running on localhost:3000`);
    });