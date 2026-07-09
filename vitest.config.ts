import { defineConfig } from "vitest/config";

// Node environment: the regression guards read source files and the compiled
// CSS off disk — there's no component rendering to do, so jsdom isn't needed.
export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
