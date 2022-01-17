const express = require('express')
const db = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class authController {
    static async login (req, res) {
        try {
            const {username, password } = req.body
            // const hashPass = await bcrypt.hash(password,10)
            // console.log(hashPass);
            // process.exit()
            const sqlGetData = db.query('SELECT * FROM login WHERE username = ?', [username], async function (err, rows) {
                const comparedPassword = await bcrypt.compare(password, rows[0].password)
                if (rows.length > 0 && comparedPassword) {
                    const getData = JSON.parse(JSON.stringify(rows[0]))
                    const {password, access_token, ...cleanData} = getData
                    const token = jwt.sign(cleanData, process.env.TOKEN_SECRET, { expiresIn: '2h' })
                    cleanData.access_token = token
                    const sqlInsertToken = db.query('update login set access_token = ? where id = ?', [token, cleanData.id], function(err, rows) {
                        if (rows) {
                            res.json({
                                statusCode: 200,
                                message: 'success login.',
                                data: cleanData
                            })
                            console.log('200 success login.');
                        } else {
                            res.json({
                                statusCode: 400,
                                message: 'failed to insert token.'
                            })
                            console.log('400 failed to insert token.');
                        }
                    })
                } else {
                    res.json({
                        statusCode: 401,
                        message: 'wrong credentials.'
                    })
                    console.log('401 wrong credentials.');
                }
            })
        } catch (error) {
            res.json({
                statusCode: 500,
                message: error
            })
            console.log('500 ' + error);
        }
    }

    static async changePassword(req, res) {
        try {
            const {userId, newPassword} = req.body
            const encryptedPassword = await bcrypt.hash(newPassword,10)

            const sqlChangePassword = db.query('update login set password = ? where id = ?', [encryptedPassword, userId], function(err, row) {
                if(err) {
                    res.json({
                        statusCode: 500,
                        message: err
                    })
                    return console.log('500 ' + err);
                } else {
                    res.json({
                        statusCode: 200,
                        message: 'success change password.',
                        data: row
                    })
                    return console.log('200 success change password.');
                }
            })
        } catch (error) {
            res.json({
                statusCode: 500,
                message: error
            })
            return console.log('500 ' + error);
        }
    }
}

module.exports = authController