const mongoose = require('mongoose')
require('dotenv').config();

const uri = 'mongodb://host.docker.internal:27018/urlshortener';

async function main() {
    try {
        await mongoose.connect(uri);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}

main().catch((err) => console.log(err))

module.exports = mongoose