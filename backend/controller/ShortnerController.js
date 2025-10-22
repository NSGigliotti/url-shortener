const mongoose = require('mongoose');
const UrlModel = require('../models/Url_Model');
const IpLimitedModel = require('../models/Ip_Limit_Model');
require('dotenv').config();
const { nanoid } = require('nanoid');


port = process.env.PORT

module.exports = class ShotnerController {
    static async shouterURL(req, res) {
        const { url, isTemporary = false, temporaryHours = 1, ipLimitCount = 1, isIpLimited = false } = req.body

        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url
        }

        if (isTemporary == null) isTemporary = false


        const urlExists = await UrlModel.findOne({ originalUrl: url, isTemporary: isTemporary, isIpLimited: isIpLimited })

        if (urlExists) {
            return res.json({ shortUrl: `http://localhost:${port}/${urlExists.shortUrl}` })
        }
        const shortCode = nanoid(8);


        try {

            const urlShoted = await UrlModel.create({
                originalUrl: url,
                shortUrl: shortCode,
                isTemporary,
                clicks: 0,
                isIpLimited,
                createdAt: new Date(),
                ipLimitCount
            });

            if (isTemporary) {
                urlShoted.expiresAt = new Date(Date.now() + temporaryHours * 60 * 60 * 1000);
            }

            await urlShoted.save()

            return res.status(200).json({ shortUrl: `http://localhost:${port}/${urlShoted.shortUrl}` });
        } catch (error) {
            console.error('Erro ao criar e salvar a URL encurtada:', error);
            return res.status(404).json(error);
        }
    }

    static async redirect(req, res) {
        const shortCode = req.params.shortcode

        const getUrl = await UrlModel.findOne({ shortUrl: shortCode })

        if (getUrl) {

            if (getUrl.isIpLimited) {

                const checkLimited = await IpLimitedModel.find({ shortUrl: shortCode, ip: req.ip })

                if (checkLimited.length === 0) {
                    const newAccess = await IpLimitedModel.create({
                        ip: req.ip,
                        shortUrl: getUrl.shortUrl,
                        maxAccess: getUrl.ipLimitCount,
                        contAccess: 1,
                        expiresAt: getUrl.isTemporary,
                        expiresAt: getUrl.expiresAt
                    })

                    await newAccess.save()

                    res.redirect(getUrl.originalUrl)
                }

                if (checkLimited[0].contAccess < checkLimited[0].maxAccess) {
                    checkLimited[0].contAccess++
                    await checkLimited[0].save()
                    res.redirect(getUrl.originalUrl)
                } else {

                    return res.status(429).send('Excedeu o limite de acessos');
                }

            } else {

                res.redirect(getUrl.originalUrl)
            }

        } else {
            res.status(404).send('URL not found')
        }
    }
}

