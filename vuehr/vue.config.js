let proxyObj = {};
// 拦截 http 请求
proxyObj['/'] = {
    // 关闭 websocket
    ws: false,
    // 转发的地址
    target: 'http://localhost:8081',
    changeOrigin: true,
    // 地址是否重写
    pathRewrite: {
        // 不修改
        '^/':''
    }
}

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}