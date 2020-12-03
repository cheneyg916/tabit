import { readdirSync } from 'fs';
import { join } from 'path';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const packagesDirPath = join(__dirname, 'packages');

const packagesDirs = readdirSync(packagesDirPath);

const terserInstance = terser({
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false,
    drop_console: true,
    drop_debugger: true
  },
  output: {
    comments: false
  }
});

const env = process.env.NODE_ENV;
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const generateRollupOptions = function generateRollupOptions(path$) {
  const pkg = require(`${path$}/package.json`);
  const entryFile = join(path$, 'src/index.ts');
  const outputFile = join(path$, 'lib/index.js');
  const tsconfigPath = join(path$, 'tsconfig.json');
  const externalList = [];
  const plugins = [
    postcss({
      extensions: ['.css', '.pcss', '.less'],
      extract: true,
      modules: true
    }),
    env === 'production' && terserInstance,
    nodeResolve({
      browser: true,
      extensions
    }),
    commonJs(),
    typescript({
      tsconfig: tsconfigPath,
      //transpiler: 'babel',
      //transpileOnly:true,
      //exclude: [ "*.d.ts", "**/*.d.ts" ],
      // check: true,
      check: process.env.NODE_ENV === 'production',
      // tsconfig: resolvedOptions => {
      //     const config = require(tsconfigPath).compilerOptions;
      //     const rootConfig = require('./tsconfig').compilerOptions;
      //     resolvedOptions.configFilePath = tsconfigPath;
      //
      //     return {
      //         ...resolvedOptions,
      //         ...rootConfig,
      //         ...config,
      //
      //         rootDir: path$,
      //         baseUrl: path$,
      //         paths: {
      //             'src/*': [`${join(path$, 'src')}/*`]
      //         }
      //     };
      // },
      extensions
    })
  ].filter(Boolean);

  if (!pkg) return;

  if (pkg['peerDependencies']) {
    [].push.apply(externalList, Object.keys(pkg['peerDependencies']));
  }
  return {
    input: entryFile,
    plugins,
    output: {
      sourceMap: 'inline',
      file: outputFile,
      format: 'umd',
      name: pkg['umdName'] || pkg['name']
    },
    external: id => {
      return externalList.some(ex => {
        return new RegExp(ex).test(id);
      });
    }
  };
};

const options = packagesDirs
  .map(path => {
    const packagePath = join(packagesDirPath, path);
    return generateRollupOptions(packagePath);
  })
  .filter(Boolean);
export default options;
