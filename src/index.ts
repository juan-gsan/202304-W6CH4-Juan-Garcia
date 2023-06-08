import http from 'http';
import * as dotenv from 'dotenv';
import url from 'url';

dotenv.config();

const PORT = process.env.PORT || 9999;

const server = http.createServer((req, res) => {
  const { path } = url.parse(req.url as string);

  if (path !== '/calculator') {
    server.emit('error', new Error('404'));
    res.end();
    return;
  }

  if (path === '/calculator') {
    res.write(`<h1>Calculator</h1>`);
    return;
  }

  if (path === '/calculator?a=6&b=3') {
    res.write(`<h1>Calculator</h1>`);
    res.write(`<h2>Resultados:</h2>`);
    return;
  }

  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
