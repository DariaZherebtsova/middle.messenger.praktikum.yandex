const history = require('connect-history-api-fallback');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'", "'unsafe-eval'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      connectSrc: ["'self'", 'ya-praktikum.tech', 'wss://ya-praktikum.tech'],
      imgSrc: ["'self'", 'ya-praktikum.tech'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
    },
  }),
);

app.use(history());

const PORT = process.env.PORT || 3000;
app.use('/', express.static(__dirname +'/dist'));

app.listen(PORT, () => {
  console.log(`Start on port ${PORT}!`);
});
