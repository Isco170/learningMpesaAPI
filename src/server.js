var express = require('express');

const c2bRoutes = require('./routes/c2b.route');
const b2cRoutes = require('./routes/b2c.route');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', c2bRoutes);
app.use('/api', b2cRoutes);

app.listen(8080, () =>{
    console.log("Listining");
});