import React, { useState } from 'react';
import useSWR from 'swr';

const sampleCode = `
/**
 * # Prettier
 *
 * Prettier enforces a consistent code style (i.e. code formatting that won’t affect the AST) across your entire codebase because it disregards the original styling* by parsing it away and re-printing the parsed AST with its own rules that take the maximum line length into account, wrapping code when necessary.
 *
 * ## prettier-plugin-jsdoc
 *
 * Prettier plugin for format jsdoc and convert to standard Match with Visual studio and other IDE which support jsdoc. Many good examples of how this plugin work, are in tests directory. Compare tests and their snapshot configured with best practices of jsDoc style guides
 * @examples
 *   var one= 5
 *   var two=10
 *
 *   if(one > 2) { two += one }
 *
   @typedef {
    {
        "userId": {
        "profileImageLink": *,
        "isBusinessUser": "isResellerUser"|"isBoolean"|  "isSubUser" |    "isNot",
        "shareCode": number,
        "referredBy": any,
        },
        id:number
      }
     } User
 *
 * @param {  React.FC<{   message:string}   >   }    param0 description
 */
export default ( ) => { }
`;

const IndexPage: React.FC = () => {
    const [code, setCode] = useState(sampleCode.trim());
    const { data } = useSWR(['/api/format', code], (url, body) =>
        fetch(url, { method: 'POST', body }).then((res) => res.text())
    );

    return (
        <div>
            <style jsx global>{`
                @import 'https://unpkg.com/normalize.css';
                body {
                    font-family: -apple-system, system-ui;
                }
            `}</style>

            <style jsx>{`
                div {
                    padding: 10px;
                }
                .playground {
                    display: flex;
                    font-family: monospace;
                    font-size: 14px;
                }
                .editor,
                .preview {
                    flex: 1;
                    margin: 5px;
                    height: 80vh;
                }
                .preview {
                    overflow-y: scroll;
                    border: 1px solid gray;
                    white-space: pre-wrap;
                    word-break: keep-all;
                }
            `}</style>

            <h1>Format JSDoc by "prettier-plugin-jsdoc"</h1>

            <b>printWidth: 50</b>

            <div className="playground">
                <textarea className="editor" value={code} onChange={(e) => setCode(e.target.value)} />
                <pre className="preview">
                    <code>{data}</code>
                </pre>
            </div>
        </div>
    );
};

export default IndexPage;
