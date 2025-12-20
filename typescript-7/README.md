# TypeScript 7 New Features Demo

[![TypeScript](https://img.shields.io/badge/TypeScript-7.0--dev-blue?logo=typescript)](https://github.com/microsoft/typescript-go)

This project demonstrates the new features and capabilities of TypeScript 7 using the native Go-based compiler (`tsgo`).

## What is TypeScript 7?

TypeScript 7 is a major milestone featuring a complete rewrite of the TypeScript compiler in Go, offering:

- **10x faster** compilation speeds
- **Native performance** without Node.js overhead
- **Full compatibility** with existing TypeScript code
- **Same language features** as the JavaScript-based compiler

## Installation

```bash
pnpm add @typescript/native-preview
```

## Usage

```bash
# Compile using tsgo
pnpm typecheck
```

## Features Demonstrated

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Improved Type Inference** | Smarter generic inference with `as const` |
| 2 | **Satisfies Expression** | Validate types while preserving narrow types |
| 3 | **Const Type Parameters** | Keep literal types like `readonly ["a", "b", "c"]` |
| 4 | **ECMAScript Decorators** | Standardized decorators with `ClassMethodDecoratorContext` |
| 5 | **Using Declaration** | Explicit resource management (`Disposable` / `AsyncDisposable`) |
| 6 | **Template Literal Types** | Path parameter extraction `ExtractParams<"/users/:id">` |
| 7 | **NoInfer Utility** | Prevent inference at specific positions |
| 8 | **Control Flow Analysis** | More precise type narrowing |
| 9 | **Pattern Index Signatures** | `[key: \`CUSTOM_${string}\`]: string` |
| 10 | **Variadic Tuple Types** | Tuple spreading and labeled elements |
| 11 | **Conditional Type Inference** | `infer` with recursive `Awaited` patterns |
| 12 | **Export Type Modifier** | `export type { ... }` for type-only exports |
| 13 | **Import Attributes** | `with { type: "json" }` syntax |
| 14 | **Pattern Matching Types** | `UnwrapArray`, `UnwrapPromise` utilities |
| 15 | **Recursive Type Aliases** | Self-referential types like `JSONValue` |

## Code Examples

### 1. Const Type Parameters

```typescript
function createConfig<const T extends readonly string[]>(items: T): T {
  return items;
}

const config = createConfig(["a", "b", "c"]);
// Type: readonly ["a", "b", "c"] instead of string[]
```

### 2. Satisfies Expression

```typescript
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<Color, string | RGB>;
// palette.red stays as number[] type
```

### 3. Explicit Resource Management (using)

```typescript
class DatabaseConnection implements Disposable {
  [Symbol.dispose]() {
    console.log("Closing connection...");
  }
}

async function queryDatabase() {
  using db = new DatabaseConnection();
  db.query("SELECT * FROM users");
  // db automatically disposed when scope ends
}
```

### 4. Template Literal Type Extraction

```typescript
type ExtractParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : T extends `${infer _Start}:${infer Param}`
      ? Param
      : never;

type Params = ExtractParams<"/users/:userId/posts/:postId">;
// Type: "userId" | "postId"
```

### 5. ECMAScript Decorators

```typescript
function logged<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
): T {
  return function (...args: any[]) {
    console.log(`Calling ${String(context.name)}`);
    return target.apply(this, args);
  } as T;
}

class Calculator {
  @logged
  add(a: number, b: number): number {
    return a + b;
  }
}
```

## Configuration

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true
  }
}
```

## Links

- [TypeScript Native Preview (tsgo)](https://github.com/microsoft/typescript-go)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript 5.0 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/)
- [ECMAScript Decorators Proposal](https://github.com/tc39/proposal-decorators)
- [Explicit Resource Management Proposal](https://github.com/tc39/proposal-explicit-resource-management)
