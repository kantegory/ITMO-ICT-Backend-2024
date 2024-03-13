'use strict'

const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

const routers = []

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const router = require(path.join(__dirname, file))
        routers.push(router)
    });

module.exports = routers