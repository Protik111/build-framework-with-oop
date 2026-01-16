function LogPerformance() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(
        `\n🔴 ------ Performance decorator called for ${propertyKey} ------ 🔴`
      );

      const start = performance.now();

      const result = originalMethod.apply(this, args);

      const end = performance.now();
      const duration = (end - start).toFixed(2);

      console.log("Arguments:", args);
      console.log("Result:", result);
      console.log("Execution Time:", duration, "ms");
      console.log("-------- End --------\n");

      return result;
    };
  };
}

class MathOperations {
  private operationCount = 0;
  private lastOperation = "";

  constructor(private name: string = "Default Calculator") {}

  @LogPerformance()
  multiply(a: number, b: number): number {
    this.operationCount++;
    this.lastOperation = "multiply";

    // simulate heavy work
    for (let i = 0; i < 1_000_000; i++) {}

    return a * b;
  }

  @LogPerformance()
  factorial(n: number): number {
    this.operationCount++;
    this.lastOperation = "factorial";

    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}

// ===== Usage =====
const math = new MathOperations("Scientific Calculator");

math.multiply(23, 45);
math.factorial(7);
