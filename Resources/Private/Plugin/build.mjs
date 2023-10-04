/* eslint-env node */
import esbuild from "esbuild";
import eslint from "esbuild-plugin-eslint";
import {cssModules} from "esbuild-plugin-lightningcss-modules";
import extensibilityMap from "@neos-project/neos-ui-extensibility/extensibilityMap.json" assert { type: 'json' };

const isWatch = process.argv.includes('--watch');

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: 'info',
    bundle: true,
    target: 'es2020',
    entryPoints: { 'Plugin': 'src/index.js' },
    outdir: '../../Public/Plugin',
    alias: extensibilityMap,
    plugins: [
        eslint(),
        cssModules({}),
    ],
};

if (isWatch) {
    esbuild.context(options).then((ctx) => ctx.watch());
} else {
    options.minify = true;
    esbuild.build(options);
}
