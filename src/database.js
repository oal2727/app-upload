const mongodb = require('mongoose');

const options = {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true};

mongodb.connect(process.env.MONGODB,options).then(
    () => { console.log('Conectado a DB') },
    err => { console.log(err) }
)

