**How to turn off typescript-eslint `parserOptions.project` when you extends or inherits an existed eslint config?**

Set to false.

```json
{
  "parserOptions": {
    "project": false
  }
}
```

Run `pnpm lint`, you will get the following error:

```
Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
```

## Links

https://typescript-eslint.io/docs/linting/type-linting
