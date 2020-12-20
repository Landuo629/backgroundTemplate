'use strict'
/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
const url = 'http://183.129.249.104:9009'
    //后台网关地址
    // const url = 'http://localhost:9999'
    // const fs = require('fs');
module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    // chainWebpack: config => {
    //     // 忽略的打包文件
    //     config.externals({
    //         'axios': 'axios'
    //     })
    //     const entry = config.entry('app')
    //     entry
    //         .add('babel-polyfill')
    //         .end()
    //     entry
    //         .add('classlist-polyfill')
    //         .end()
    // },
    // 本地开发环境配置
    devServer: {
        //https相关配置
        // https: {
        //   key: fs.readFileSync('E:/JL/GIT/all/file/2881827_test.joolun.com_nginx/2881827_test.joolun.com.key'),
        //   cert: fs.readFileSync('E:/JL/GIT/all/file/2881827_test.joolun.com_nginx/2881827_test.joolun.com.pem')
        // },
        disableHostCheck: true,
        port: 8080,
        //转发代理
        proxy: {
            '/auth': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/auth': '/auth'
                }
            },
            '/upms': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/upms': '/upms'
                }
            }
        }
    }
}