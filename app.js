const express = require('express')
const port = 3000;
const app = express();
app.get('/api', (req, res) => res.send('Api is runing!'))
httpServer.listen(port);