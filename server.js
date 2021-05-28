const express = require('express');

const app = express();
const PORT = 3000;
console.log('__dirname', __dirname);
app.use("/", express.static(__dirname +'/dist'));
app.use("/auth", express.static(__dirname + '/dist/authorization'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});