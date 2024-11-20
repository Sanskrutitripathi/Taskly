const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
var dbConfig = require("./services/config").dbConfig;
var indexRouter = require('./routes').routes;

app.use(cors());
app.use(bodyParser.json());

MONGODB_URI=`${dbConfig.host}` 
mongoose.connect(dbConfig.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/', indexRouter);
app.listen(3000, () => console.log(`Server running on port 3000`));
