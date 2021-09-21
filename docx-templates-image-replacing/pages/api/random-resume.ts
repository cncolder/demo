import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import createReport from 'docx-templates';

export default async function (req: NextApiRequest, res: NextApiResponse) {
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

  const template = await fs.promises.readFile('public/resume-template.docx');
  const document = await createReport({
    template,
    data: user,
    cmdDelimiter: ['{', '}'],
  });

  const filename = `${user.name.first}-${user.name.last}.docx`;

  res.status(200);
  res.setHeader('Content-Length', document.length);
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.write(document, 'binary');
  res.end('', 'binary');
}
