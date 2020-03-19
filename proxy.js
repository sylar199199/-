module.exports = {
    "/api": {
        target: "http://106.13.173.60:9008/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            "^/api": "/api"
        }
    }
};
