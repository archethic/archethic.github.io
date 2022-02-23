/**
 * Created by naijun on 2022/02/23
 * Copyright (c) naijun.
 * This code is licensed under the MIT Licensing Principles.
 */

const nodeVersion = 'v9.0.0'

Object.defineProperty(exports, 'version', {
    enumerable: true,
    get: function () {
        return nodeVersion;
    }
});

Object.defineProperty(exports, 'versions', {
    enumerable: true,
    get: function () {
        return {
            node: nodeVersion,
            java: java.lang.System.getProperty("java.specification.version")
        }
    }
});

Object.defineProperty(exports, 'arch', {
    enumerable: true,
    get: function () {
        return java.lang.System.getProperty("os.arch");
    }
});

Object.defineProperty(exports, 'platform', {
    enumerable: true,
    get: function () {
        return 'linux';
    }
});

Object.defineProperty(exports, 'release', {
    enumerable: true,
    get: function () {
        return {
            name: 'node',
            sourceUrl: 'https://arthic.dev',
            headersUrl: 'https://arthic.dev',
            libUrl: 'https://arthic.dev'
        }
    }
});

Object.defineProperty(exports, 'env', {
    enumerable: true,
    get: function () {
        return java.lang.System.getenv();
    }
});

Object.defineProperty(exports, 'title', {
    enumerable: 'title',
    get: function () {
        return 'SkyLine Project';
    }
});