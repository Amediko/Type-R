module.exports = {
    entry : "./src/index.ts",

    output : {
        filename      : './index.js',
        library       : "Nested",
        libraryTarget : 'umd'
    },

    devtool : 'source-map',

    externals : [
       {
         'jquery' : {
           commonjs : 'jquery',
           commonjs2 : 'jquery',
           amd : 'jquery',
           root : '$'
         },

         'underscore' : {
           commonjs : 'underscore',
           commonjs2 : 'underscore',
           amd : 'underscore',
           root : '_'
         }
       }
    ],

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts'
            }
        ],

        preLoaders : [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};