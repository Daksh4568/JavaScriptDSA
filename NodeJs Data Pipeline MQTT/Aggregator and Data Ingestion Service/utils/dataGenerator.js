const crypto = require('crypto');

function generateSensorData(type){
    switch(type){
        case 'int':
            return Math.floor(Math.random() * 100);
        case 'string':
            return crypto.randomBytes(4).toString('hex');
        case 'blob':
            return crypto.randomBytes(16).toString('base64');
        default:
            return null;
    }
}

module.exports = {generateSensorData}