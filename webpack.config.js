var config = {};
process.traceDeprecation = true
//删除旧的编译文件
cleanFolder = function (config) {
    var exec = require('child_process').exec,
        clear = config.clearBeforeBuild;
    clear && exec('rm -rf ' + config.output.path, function (err, out) {
        console.log(out);
        err && console.error(err);
    });
};
if (process.env.NODE_ENV != 'production' && process.env.NODE_ENV != undefined) {
    config = require("./webpack.dev.config.js");
} else {
    config = require("./webpack.prod.config.js");
}

cleanFolder(config);


module.exports = config;
