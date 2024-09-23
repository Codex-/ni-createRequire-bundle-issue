// @ts-check
import { build } from "esbuild";

(async () => {
  return build({
    entryPoints: ["./src/main.ts"],
    outfile: "dist/index.mjs",
    metafile: true,
    bundle: true,
    format: "esm",
    platform: "node",
    target: ["node20"],
    treeShaking: true,
    // Ensure require is properly defined: https://github.com/evanw/esbuild/issues/1921
    banner: {
      js:
        "import { createRequire } from 'node:module';\n" +
        "const require = createRequire(import.meta.url);",
    },
  });
})();
