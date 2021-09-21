import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Static from 'koa-static';
import Router from '@koa/router';
import axios from 'axios';
import createReport from 'docx-templates';

export const app = new Koa();
const router = new Router();

const root = (p: string) => path.resolve(__dirname, '..', p);

router.get('/api/resume', async (ctx) => {
  const {
    data: {
      results: [user],
    },
  } = await axios.get('https://randomuser.me/api');

  const { data: userAvatarBuffer } = await axios.get(user.picture.large, {
    responseType: 'arraybuffer',
  });
  user.avatar = {
    data: userAvatarBuffer,
    width: 6,
    height: 6,
    extension: path.extname(user.picture.large),
  };

  const template = await fs.promises.readFile(root('public/resume-template.docx'));
  const document = await createReport({
    template,
    data: user,
    cmdDelimiter: ['{', '}'],
  });

  const filename = `${user.name.first}-${user.name.last}.docx`;

  ctx.status = 200;
  ctx.set(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  ctx.set('Content-Disposition', `attachment; filename=${filename}`);
  ctx.set('Content-Length', String(document.length));
  ctx.body = Buffer.from(document);
});

app
  .use(Static(root('public')))
  .use(router.routes())
  .use(router.allowedMethods());
