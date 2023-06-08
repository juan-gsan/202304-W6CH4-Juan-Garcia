import http from 'http';
import * as dotenv from 'dotenv';
import url from 'url';
import { calculator } from './calculator.js';

dotenv.config();

const PORT = process.env.PORT || 9999;

const server = http.createServer((req, res) => {
  if (!req.url) {
    server.emit('error', new Error('No url in the request'));
    return;
  }

  const { pathname, query } = url.parse(req.url as string, true);

  if (pathname !== '/calculator') {
    server.emit('error', new Error('404'));
    res.statusCode = 404;
    res.end('Error. Not found.');
    process.exit(-1);
  }

  const a = parseInt(query.a as string, 10);
  const b = parseInt(query.b as string, 10);

  if (isNaN(a) || isNaN(b)) {
    res.statusCode = 400;
    res.end('Error. Invalid input');
    process.exit(-1);
  }

  const calculatorResult = calculator(a, b);

  res.write(`<h1>Calculator</h1>`);
  res.write(`<p>${a} + ${b} = ${calculatorResult.sum}</p>`);
  res.write(`<p>${a} - ${b} = ${calculatorResult.difference}</p>`);
  res.write(`<p>${a} x ${b} = ${calculatorResult.multiply}</p>`);
  res.write(`<p>${a} / ${b} = ${calculatorResult.division}</p>`);
  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
