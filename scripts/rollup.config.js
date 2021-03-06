const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const closure = require('rollup-plugin-closure-compiler-js');
const replace = require('rollup-plugin-replace');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  input: 'src/index.js',
  output: {
    file: dev ? 'lib/react-dom-lite.js' : 'lib/react-dom-lite.min.js',
    format: 'cjs',
  },
  plugins: [
    replace({ __DEV__: dev, __SVG__: true }), // Needs attention! A way/config to selectively turn this on or off
    babel(),
    commonjs(),
    !dev &&
      closure({
        compilationLevel: 'SIMPLE',
        languageIn: 'ECMASCRIPT5_STRICT',
        languageOut: 'ECMASCRIPT5_STRICT',
        env: 'CUSTOM',
        rewritePolyfills: false,
        applyInputSourceMaps: false,
        processCommonJsModules: false,
      }),
  ].filter(Boolean),
  external: [
    'warning',
    'dom-helpers/ownerDocument',
    'dom-helpers/style',
    'dom-helpers/util/hyphenate',
    'invariant',
    'react-reconciler',
  ],
};
