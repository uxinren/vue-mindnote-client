const fs = require('fs');
const path = require('path');
const {config} = require("shelljs");

// const mockBaseURL= 'https://localhost:8080'
const mockBaseURL= 'https://note-server.hunger-valley.com'
const realBaseURL= 'https://note-server.hunger-valley.com'

exports.config = function ({isDev=true}={isDev:true}) {
    let fileText = `
    module.exports = {
        baseURL:'${isDev?mockBaseURL:realBaseURL}'
    }`
    fs.writeFileSync(path.join(__dirname,'../src/helpers/config-baseURL.js'),fileText)
}