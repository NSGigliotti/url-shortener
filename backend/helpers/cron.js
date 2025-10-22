const cron = require('node-cron');
const mongoose = require('mongoose');
const UrlModel = require('../models/Url_Model');
const IpLimitedModel = require('../models/Ip_Limit_Model');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Conectado ao MongoDB para tarefa cron')).catch(err => console.error('Erro ao conectar ao MongoDB para tarefa cron:', err));

cron.schedule('*/5 * * * *', async () => {
    const dateNow = new Date();
    try {
        await UrlModel.deleteMany({
            isTemporary: true,
            expiresAt: { $lt: dateNow }
        })
    } catch (error) {
        console.error('Erro ao executar a tarefa cron:', error);
    }
})
cron.schedule('*/5 * * * *', async () => {
    const dateNow = new Date();
    try {
        await IpLimitedModel.deleteMany({
            isTemporary: true,
            expiresAt: { $lt: dateNow }
        })
    } catch (error) {
        console.error('Erro ao executar a tarefa cron:', error);
    }
})