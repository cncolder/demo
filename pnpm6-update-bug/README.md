# Pnpm cannot update devDependencies version

Before `pnpm update`

```json
{
  "dependencies": {
    "react": "^17",
    "react-dom": ""
  },
  "devDependencies": {
    "@types/react": "^17",
    "@types/react-dom": ""
  }
}
```

After `pnpm update`

```json
{
  "dependencies": {
    "@types/react-dom": "^17.0.11",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@types/react": "^17.0.38",
    "@types/react-dom": ""
  }
}

```

## Links

https://pnpm.io/cli/update
