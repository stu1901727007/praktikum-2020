let mix = require('laravel-mix');

mix.babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
});

//Frontend
mix
    .sass('resources/scss/style.scss', 'assets/css/app.css')
    .styles(['resources/vendor/jquery-ui/jquery-ui.min.css', 'resources/vendor/jquery-ui/jquery-ui.theme.min.css'], 'assets/css/vendor.css')
    .scripts([
        'node_modules/jquery/dist/jquery.js',
        'resources/vendor/jquery-ui/jquery-ui.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'node_modules/blueimp-md5/js/md5.min.js',
        'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
        'node_modules/handlebars/dist/handlebars.runtime.js',
        'node_modules/imagesloaded/imagesloaded.pkgd.js',
        'node_modules/aos/dist/aos.js',
        'node_modules/vanilla-lazyload/dist/lazyload.js',
    ], 'assets/js/vendors.js')
    .babel([
        'resources/js/modules/utils.js',
        'resources/js/modules/error.js',
        'resources/js/modules/cache.js',
        'resources/js/modules/api.js',
        'resources/js/modules/navigation.js',
        'resources/js/modules/search.js',
        'resources/js/index.js'], 'assets/js/app.js')
    .options({
        processCssUrls: false
    });
