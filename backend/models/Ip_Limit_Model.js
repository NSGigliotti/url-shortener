const mongoose = require('../db/conn')
const { Schema } = mongoose

const IpLimitedModel = mongoose.model('IpLimited',
    new Schema({
        ip: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
        },
        maxAccess: {
            type: Number,
            required: true,
        },
        contAccess: {
            type: Number,
            required: true,
        },
        expiresAt: {
            type: Date,
        },
        isTemporary: {
            type: Boolean,
        },
    }));

module.exports = IpLimitedModel;