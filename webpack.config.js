import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let views = fs.readdirSync('./src/views');
let htmlPlugins = [];
for(let view of views){
    htmlPlugins.push(new HtmlWebpackPlugin({
        filename: path.parse(view).name + '.html',
        template: './src/views/' + view
    }));
}


export default {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public')
        },
        port: 9000,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.nunjucks$/i,
                use: ['simple-nunjucks-loader']
            }
        ]
    },
    plugins: [
       ...htmlPlugins,
        new MiniCssExtractPlugin()
    ],
}