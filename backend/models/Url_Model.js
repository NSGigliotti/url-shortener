const mongoose = require('../db/conn')
const { Schema } = mongoose


const UrlModel = mongoose.model('Url',
    new Schema({
        originalUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        expiresAt: {
            type: Date,
        },
        isTemporary: {
            type: Boolean,
            required: true,
        },
        isIpLimited: {
            type: Boolean,
            required: true,
        },
        ipLimitCount: {
            type: Number,
        },
    }));

module.exports = UrlModel;