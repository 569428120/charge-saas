export default {
    theme: {
        '@primary-color': '#40a9ff',
        '@link-color': '#40a9ff',
        '@border-radius-base': '4px',
        '@font-size-base': '16px',
        '@line-height-base': '1.2'
    },
    proxy: {
        '/api': {
            target: 'http://jsonplaceholder.typicode.com/',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        },
        '/charge': {
            target: 'http://127.0.0.1:9999/',
            changeOrigin: true,
            pathRewrite: {'^/charge': ''}
        }
    },
    extraBabelPlugins: [['import', {libraryName: 'antd', style: true}]],
    env: {
        development: {
            extraBabelPlugins: ['dva-hmr']
        }
    }
}
