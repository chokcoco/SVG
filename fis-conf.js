var domainList=[
    'http://res.cont.yy.com'
];

fis.hook('amd',{

})
fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true // 资源映射表内嵌
    })
})
// 默认产出路径
fis.match('/html/(**)',{
        release:'/svg/html/$1'
    })
    .match('/static/(**)',{
        release:'/svg/$1'
    })
    .match('/static/js/(*).js',{
        packTo: '/svg/js/$1.js'
    })
    .match('/static/sass/(**.scss)',{
        parser: fis.plugin('node-sass'),
        rExt: '.css',
        release:'/svg/css/$1'
    })
    .match('/static/sass/(_**.scss)',{
        release:false
    })

// 发布本地开发版本
fis.media('local')
    // 启动 fis3-hook-relative 插件
    .hook('relative')
    .match('**', {
        relative:true, // 让所有文件，都使用相对路径
        deploy :fis.plugin('local-deliver',{
            to :"../local"
            // to:"../../hexo/themes/huno-master/source/demo"
        })
    })

// 发布线上开发版本：样式压缩，图片合并，png压缩
fis.media('online')
    .match('**.js', {
        domain:domainList
    })
    // 启用 fis-spriter-csssprites 插件
    /*.match('::package', {
        spriter: fis.plugin('csssprites')
    })*/
    // 对scss进行编译，压缩，图片合并
    .match('**.scss',{
        optimizer: fis.plugin('clean-css',{
            'keepBreaks': true //保持一个规则一个换行
        }),
        useSprite: true,
        domain:domainList
    })
    // 对css进行压缩，图片合并
    .match('**.css', {
        optimizer: fis.plugin('clean-css',{
            'keepBreaks': true //保持一个规则一个换行
        }),
        useSprite:true,
        domain:domainList
    })
    // 对图片进行png压缩
    .match('**.png', {
        optimizer: fis.plugin('png-compressor',{
            'type':'pngquant'
        })
    })
    .match('::image', {
        domain:domainList
    })
    .match('**',{
        deploy :fis.plugin('local-deliver',{
            to :"../online"
        })
    })
