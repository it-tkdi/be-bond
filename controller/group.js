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
                            statusCode: 200,
                            message: 'no data for group list.'
                        })
                        return console.log('200 no data for group list.');
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
}

module.exports = groupController