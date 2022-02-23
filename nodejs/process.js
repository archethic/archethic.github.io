/**
 * Created by naijun on 2022/02/23
 * Copyright (c) naijun.
 * This code is licensed under the MIT Licensing Principles.
 */

 const nodeVersion = 'v9.0.0'

 module.exports = {
     version: nodeVersion, // not real version sorry :(
     versions: {
         node: nodeVersion,
         java: java.lang.System.getProperty("java.specification.version")
     },
     arch: java.lang.System.getProperty("os.arch"),
     platform: 'linux', // 안드로이드로 하면 뭔가 호환성 에러생길듯
     release: {
         name: 'node',
         sourceUrl: 'https://arthic.dev',
         headersUrl: 'https://arthic.dev',
         libUrl: 'https://arthic.dev'
     },
     env: java.lang.System.getenv(),
     title: 'SkyLine Project'
 }