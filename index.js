const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const routes = require('./routes/index.route');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));

// innit database
require('./configs/dbs/mongo.db');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
