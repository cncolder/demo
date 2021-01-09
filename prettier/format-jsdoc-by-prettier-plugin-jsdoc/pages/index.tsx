import React, { useState } from 'react';
import useSWR from 'swr';

const sampleCode = `
/**
 * # Prettier
 *
 * Prettier enforces a consistent code style (i.e. code formatting that won’t affect the AST) across your entire codebase because it disregards the original styling* by parsing it away and re-printing the parsed AST with its own rules that take the maximum line length into account, wrapping code when necessary.
 *
 * ## Why Prettier?
 *
 * ### Building and enforcing a style guide
 *
 * By far the biggest reason for adopting Prettier is to stop all the on-going debates over styles. It is generally accepted that having a common style guide is valuable for a project and team but getting there is a very painful and unrewarding process. People get very emotional around particular ways of writing code and nobody likes spending time writing and receiving nits.
 *
 * So why choose the “Prettier style guide” over any other random style guide? Because Prettier is the only “style guide” that is fully automatic. Even if Prettier does not format all code 100% the way you’d like, it’s worth the “sacrifice” given the unique benefits of Prettier, don’t you think?
 *
 * - “We want to free mental threads and end discussions around style. While sometimes fruitful, these discussions are for the most part wasteful.”
 * - “Literally had an engineer go through a huge effort of cleaning up all of our code because we were debating ternary style for the longest time and were inconsistent about it. It was dumb, but it was a weird on-going “great debate” that wasted lots of little back and forth bits. It’s far easier for us all to agree now: just run Prettier, and go with that style.”
 * - “Getting tired telling people how to style their product code.”
 * - “Our top reason was to stop wasting our time debating style nits.”
 * - “Having a githook set up has reduced the amount of style issues in PRs that result in broken builds due to ESLint rules or things I have to nit-pick or clean up later.”
 * - “I don’t want anybody to nitpick any other person ever again.”
 * - “It reminds me of how Steve Jobs used to wear the same clothes every day because he has a million decisions to make and he didn’t want to be bothered to make trivial ones like picking out clothes. I think Prettier is like that.”
 *
 * ## prettier-plugin-jsdoc
 *
 * Prettier plugin for format jsdoc and convert to standard Match with Visual studio and other IDE which support jsdoc. Many good examples of how this plugin work, are in tests directory. Compare tests and their snapshot configured with best practices of jsDoc style guides
 */
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
                    min-height: 300px;
                    min-height: 500px;
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
