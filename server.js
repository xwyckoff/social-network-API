const routes = require('./routes/index');
const express = require('express');
const db = require('./config/connection');
const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}!`);
    });
});