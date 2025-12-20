/**
 * TypeScript 7 New Features Demo
 * Compiled with @typescript/native-preview (tsgo)
 */

// ============================================
// 1. Improved Type Inference
// ============================================

// Smarter generic inference
function createPair<T, U>(first: T, second: U) {
  return { first, second } as const;
}

const pair = createPair("hello", 42);
// TypeScript 7 provides better readonly type inference

// ============================================
// 2. Satisfies Expression (TS 4.9+)
// ============================================

type Color = "red" | "green" | "blue";
type RGB = readonly [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Color, string | RGB>;

// palette.red remains number[] type instead of string | RGB

// ============================================
// 3. Const Type Parameters (TS 5.0+)
// ============================================

function createConfig<const T extends readonly string[]>(items: T): T {
  return items;
}

const config = createConfig(["a", "b", "c"]);
// config type is readonly ["a", "b", "c"] instead of string[]

// ============================================
// 4. Decorators - ECMAScript Standard
// ============================================

function logged<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
): T {
  const methodName = String(context.name);

  return function (this: any, ...args: any[]) {
    console.log(`Calling ${methodName} with args:`, args);
    const result = target.apply(this, args);
    console.log(`${methodName} returned:`, result);
    return result;
  } as T;
}

class Calculator {
  @logged
  add(a: number, b: number): number {
    return a + b;
  }

  @logged
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// ============================================
// 5. Using Declaration - Explicit Resource Management (TS 5.2+)
// ============================================

class DatabaseConnection implements Disposable {
  private connected = true;

  query(sql: string) {
    if (!this.connected) throw new Error("Connection closed");
    console.log(`Executing: ${sql}`);
    return [];
  }

  [Symbol.dispose]() {
    console.log("Closing database connection...");
    this.connected = false;
  }
}

async function queryDatabase() {
  using db = new DatabaseConnection();
  db.query("SELECT * FROM users");
  // db will automatically call [Symbol.dispose]() when scope ends
}

// Async resource management
class AsyncFileHandle implements AsyncDisposable {
  constructor(private filename: string) {
    console.log(`Opening file: ${filename}`);
  }

  async read(): Promise<string> {
    return `Contents of ${this.filename}`;
  }

  async [Symbol.asyncDispose]() {
    console.log(`Closing file: ${this.filename}`);
  }
}

async function readFile() {
  await using file = new AsyncFileHandle("data.txt");
  const content = await file.read();
  console.log(content);
}

// ============================================
// 6. Template Literal Types - Advanced Usage
// ============================================

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIPath = "/users" | "/posts" | "/comments";
type APIEndpoint = `${HTTPMethod} ${APIPath}`;

const endpoint: APIEndpoint = "GET /users";

// Extract path parameters
type ExtractParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : T extends `${infer _Start}:${infer Param}`
      ? Param
      : never;

type UserRouteParams = ExtractParams<"/users/:userId/posts/:postId">;
// Type is "userId" | "postId"

// ============================================
// 7. NoInfer Utility Type (TS 5.4+)
// ============================================

function createStreetLight<C extends string>(
  colors: C[],
  defaultColor: NoInfer<C>
) {
  // Prevents defaultColor from affecting the inference of C
}

createStreetLight(["red", "yellow", "green"], "red");
// Error if a color not in the array is passed

// ============================================
// 8. Improved Control Flow Analysis
// ============================================

function processValue(value: string | number | null | undefined) {
  if (value == null) {
    return "No value";
  }

  // TypeScript 7 has more precise control flow analysis
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}

// ============================================
// 9. Pattern Index Signatures
// ============================================

interface EnvironmentVars {
  NODE_ENV: "development" | "production" | "test";
  PORT?: string;
  [key: `CUSTOM_${string}`]: string | undefined;
}

const env: EnvironmentVars = {
  NODE_ENV: "development",
  PORT: "3000",
  CUSTOM_API_KEY: "xxx",
  CUSTOM_SECRET: "yyy",
};

// ============================================
// 10. Variadic Tuple Types
// ============================================

type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U,
];

type Numbers = [1, 2, 3];
type Strings = ["a", "b"];
type Combined = Concat<Numbers, Strings>;
// Type is [1, 2, 3, "a", "b"]

// Labeled tuple elements
type NamedTuple = [first: string, second: number, ...rest: boolean[]];

function processTuple(...args: NamedTuple) {
  const [first, second, ...rest] = args;
  console.log(first, second, rest);
}

// ============================================
// 11. Conditional Type Inference Improvements
// ============================================

type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Awaited2<T> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? Awaited2<U>
    : U
  : T;

async function fetchData(): Promise<Promise<string>> {
  return Promise.resolve("data");
}

type FetchResult = Awaited2<ReturnType<typeof fetchData>>;
// Type is string

// ============================================
// 12. Export Type Modifier
// ============================================

export type { Color, RGB };
export { Calculator, DatabaseConnection };

// ============================================
// 13. Import Attributes
// ============================================

// Note: Requires runtime support
// import config from "./config.json" with { type: "json" };

// ============================================
// 14. Pattern Matching Type Extraction
// ============================================

type UnwrapArray<T> = T extends (infer U)[] ? U : T;
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapAll<T> = UnwrapPromise<UnwrapArray<T>>;

type Test1 = UnwrapAll<Promise<string[]>>;
// Type is string

// ============================================
// 15. Recursive Type Aliases
// ============================================

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const jsonData: JSONValue = {
  name: "TypeScript",
  version: 7,
  features: ["decorators", "using", "satisfies"],
  config: {
    strict: true,
    target: "ESNext",
  },
};

// ============================================
// Execution Examples
// ============================================

console.log("=== TypeScript 7 Demo ===");
console.log("Pair:", pair);
console.log("Config:", config);
console.log("Endpoint:", endpoint);
console.log("Env:", env);
console.log("JSON Data:", jsonData);

const calc = new Calculator();
console.log("Add:", calc.add(2, 3));
console.log("Multiply:", calc.multiply(4, 5));

queryDatabase();
readFile();
