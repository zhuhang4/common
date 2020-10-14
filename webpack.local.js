const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
module.exports = {
    entry: {
        main: projectName + '/src/Main.js',
        edit: projectName + '/src/MainEdit.js',
    },
    resolve: {
        // 设置别名
        alias: {
            '@': resolve('./src'),// 这样配置后 @ 可以指向 src 目录
            '@assets': resolve('./src/assets'),// 这样配置后 @ 可以指向 src 目录
            '@images': resolve('./src/assets/images')// 这样配置后 @ 可以指向 src 目录
        }
    },
    plugins: [
        // new CleanWebpackPlugin(['public'],{
        //     root:path.resolve(projectName,'..'),
        //     exclude:[
        //         'vendor',
        //         '.htaccess',
        //         'css',
        //         'js',
        //         'docs',
        //         'favicon.ico',
        //         'index.php',
        //         'mix-manifest.json',
        //         'robots.txt',
        //     ]
        // }),
        new CopyPlugin([
            { from: projectName + '/src/static', to: './static', 'ignore': ['images/**/*'] },
            { from: projectName + '/src/lib', to: './lib' }
        ]),

        new HtmlWebpackPlugin({
            test: '[hash]',
            chunks: ['main'],
            template: projectName + '/src/template.html'
        }),
        new HtmlWebpackPlugin({
            title:'edit',
            filename: 'edit.html',
            test: '[hash]',
            chunks: ['edit'],
            template: projectName + '/src/templatedit.html'
        }),
    ],
    devServer: {
        https: {
          key: fs.readFileSync('./192.168.18.114-key.pem'),
          cert: fs.readFileSync('./192.168.18.114.pem'),
        },
        host: "192.168.18.114",
        port: global.port,
        contentBase: './dist',
        // stats: 'errors-warnings',
        // hot:true
    },
    output: {
        filename: '[name].js?v=[hash]',
        path: path.resolve(__dirname, projectName + '/dist'),
    }
}
