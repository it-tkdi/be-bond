const e = require('express');
const db = require('../config/db')

class groupController {
    static async addGroup(req, res) {
        const { groupName } = req.body

        if(!groupName) {
            res.json({
                statusCode: 400,
                message: 'please fill in the form.'
            })
            return console.log('400 please fill in the form.');
        }

        try {
            const checkGroupName = db.query('select * from tb_group where group_name = ?', [groupName], function(err, rows) {
                if(err) {
                    res.json({
                        statusCode: 500,
                        message: err
                    })
                    return console.log('500 ' + err);
                } else {
                    if(rows.length > 0) {
                        res.json({
                            statusCode: 400,
                            message: 'data already exist.'
                        })
                        return console.log('400 data already exist.');
                    } else {
                        const sqlInsertGroupName = db.query('insert into tb_group (group_name) values (?)', [groupName], function(err, row) {
                            if(err) {
                                res.json({
                                    statusCode: 500,
                                    message: err
                                })
                                return console.log('500 ' + err);
                            } else {
                                res.json({
                                    statusCode: 200,
                                    message: 'success add group name.'
                                })
                                return console.log('200 success add group name.');
                            }
                        })
                    }
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

    static async groupList(req, res) {
        try {
            const sqlGetGroupList = db.query('select * from tb_group', function(err, rows) {
                if(err) {
                    res.json({
                        statusCode: 500,
                        message: err
                    })
                    return console.log('500 ' + err);
                } else {
                    if(rows.length > 0) {
                        res.json({
                            statusCode: 200,
                            message: 'success retrieve group list.',
                            dataCounts: rows.length,
                            data: rows
                        })
                        return console.log('200 success retrieve group list.');
                    } else {
                        res.json({
                            statusCode: 404,
                            message: 'no data for group list.'
                        })
                        return console.log('404 no data for group list.');
                    }
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

    static async getGroup(req, res) {
        try {
            const {id} = req.params

            const sqlGetGroup = db.query('select * from tb_group where id = ?', [id], function(err, row) {
                if(err) {
                    res.json({
                        statusCode: 500,
                        message: err
                    })
                    return console.log('500 ' + err);
                } else {
                    res.json({
                        statusCode: 200,
                        message: 'success retrieve group data.',
                        data: row[0]
                    })
                    return console.log('200 success retrieve group data.');
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

    static async editGroup(req, res) {
        const {groupName} = req.body
        const {id} = req.params

        if(!groupName || !id) {
            res.json({
                statusCode: 400,
                message: 'please fill in the form.'
            })
            return console.log('400 please fill in the form.');
        }

        try {
            const sqlEditGroup = db.query('update tb_group set group_name = ? where id = ?', [groupName, id], function(err, row) {
                if(err) {
                    res.json({
                        statusCode: 500,
                        message: err
                    })
                    return console.log('500 ' + err);
                } else {
                    res.json({
                        statusCode: 200,
                        message: 'success edit group name.'
                    })
                    return console.log('200 success edit group name.');
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

module.exports = groupController