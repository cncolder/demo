// Verify oxfmt (formatter) and oxlint (linter)
// Run: pnpm lint

// Test 1: Formatting - inconsistent spacing and quotes
const message = "Hello, World!";
const numbers = [1, 2, 3, 4, 5];
const obj = { foo: "bar", baz: 42 };

// Test 2: Unused variables (oxlint should warn)
const unusedVariable = "I am not used";

// Test 3: Prefer const (oxlint rule)
let shouldBeConst = "This should be const";
console.log(shouldBeConst);

// Test 4: No console (optional lint rule)
console.log(message);

// Test 5: Arrow function formatting
const add = (a: number, b: number): number => a + b;
const multiply = (a: number, b: number): number => {
    return a * b;
};

// Test 6: Type annotations
interface User {
    id: number;
    name: string;
    email?: string;
}

const user: User = {
    id: 1,
    name: "John Doe",
};

// Test 7: Array methods
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);

// Test 8: Async function
async function fetchData(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
}

// Test 9: Class definition
class Calculator {
    private value: number;

    constructor(initial: number = 0) {
        this.value = initial;
    }

    add(n: number): this {
        this.value += n;
        return this;
    }

    getResult(): number {
        return this.value;
    }
}

// Test 10: Generic function
function identity<T>(arg: T): T {
    return arg;
}

// Test 11: Union types
type Status = "pending" | "success" | "error";
const status: Status = "pending";

// Test 12: Optional chaining and nullish coalescing
const data: { user?: { name?: string } } = {};
const userName = data?.user?.name ?? "Anonymous";

// Test 13: Destructuring
const { foo, baz } = obj;
const [first, second, ...rest] = numbers;

// Test 14: Template literals
const greeting = `Hello, ${user.name}! Your ID is ${user.id}.`;

// Test 15: Export
export { add, multiply, Calculator, identity, fetchData };
export type { User, Status };

// Usage to avoid some unused warnings
console.log(doubled, evens, userName, foo, baz, first, second, rest, greeting, status);

const calc = new Calculator(10).add(5);
console.log(calc.getResult());
console.log(identity("test"));
