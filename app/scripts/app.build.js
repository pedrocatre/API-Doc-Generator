// node ../r.js -o app.build.js
({
    appDir: '../',
    baseUrl: 'scripts',
    dir: '../../build',
    mainConfigFile: 'main.js',
    optimizeCss: 'standard',

    modules: [
        {
            name: 'main'
        }
    ]
})
