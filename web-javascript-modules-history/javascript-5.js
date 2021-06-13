// app.js
import header from '/header.js';
import body from '/body.js';

// header.js
export default 'Hello';

// body.js
import article from '/article.js';
export default article + '\n 30 分钟阅读';

// article.js
export default 'JavaScript modules 模块';
