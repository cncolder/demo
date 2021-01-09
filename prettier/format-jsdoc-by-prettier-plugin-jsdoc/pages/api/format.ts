import type { NextApiRequest, NextApiResponse } from 'next';
import prettier from 'prettier';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.body;

    const result = prettier.format(code, { parser: 'babel-ts', printWidth: 50 });

    res.status(200).send(result);
};
