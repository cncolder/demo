import fs from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import Koa from 'koa';

const app = new Koa();
const port = 3000;

app.use((ctx) => {
  if (ctx.url === '/') {
    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.resolve(process.cwd(), 'public/index.html'));
  } else if (ctx.url === '/event') {
    ctx.type = 'text/event-stream';
    const stream = (ctx.body = new PassThrough());
    const timer = setInterval(() => {
      const message = `data: ${Date.now()}\n\n`;
      console.log(message);
      stream.write(message);
    }, 1000);
    ctx.req.once('close', () => clearInterval(timer));
  }
});

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
