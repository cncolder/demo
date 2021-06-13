import type { NextApiRequest, NextApiResponse } from 'next';
import prettier from 'prettier';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.body;

    let result = '';

    try {
        result = prettier.format(code, { parser: 'babel-ts', printWidth: 50 });
    } catch (err) {
        result = err.message;
    }

    res.status(200).send(result);
};
