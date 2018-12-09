import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';

export default {
    input: 'src/scripts/app.js',
    output: {
        file: 'dist/scripts/app.js',
        format: 'iife',
        name: 'TMDSearch'
    },
    plugins: [json(), nodeResolve({ browser: true }), commonjs(), globals()]
};
