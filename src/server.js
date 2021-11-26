var express = require('express');

const c2bRoutes = require('./routes/c2b.route');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', c2bRoutes);

app.listen(8080, () =>{
    console.log("Listining");
});