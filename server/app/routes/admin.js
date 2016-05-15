var jwt = require("jsonwebtoken");
var md5 = require('md5');
var uuid = require("../utils/uuid");
var config = require("../config");
var toImage = require("../utils/toImage");
var logger = require("../logger");
var models = require("../models");
var _ = require("lodash");

module.exports = {
    uploadEmployerPhoto: function(req, res) {
        var empl = req.userToken.employer;
        var image = req.body.image;
        var dataImage = image.split(";");
        var imageType = (dataImage[0]).split("/")[1];
        var imageFilePath = config.adminImage + empl.id + "." + imageType;
        toImage(dataImage[1], imageFilePath, config.adminPath)
        models.Employer.update({
            image: imageFilePath
        }, {
            where: {
                id: empl.id
            }
        }).then(function(suc) {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    create: function(req, res) {
        var newuser = req.body.newuser;
        if (!newuser.username) {
            return res.status(400).send({
                error: {
                    message: "Username required!"
                }
            });
        }
        if (!newuser.password) {
            return res.status(400).send({
                error: {
                    message: "Password required!"
                }
            });
        }
        models.Employer.find({
            where: {username: newuser.username}
        }).then(function(employers) {
            if (employers) {
                return res.status(400).send({
                    error: {
                        message: "Username has exist!"
                    }
                });
            } else {
                password = md5(newuser.password);
                var hiredate = !_.isEmpty(newuser.hiredate) ? new Date(newuser.hiredate) : new Date(); 
                var birthdate = !_.isEmpty(newuser.birthdate) ? new Date(newuser.birthdate) : null; 
                models.Employer.create({
                    id: uuid(),
                    username: newuser.username,
                    password: newuser.password,
                    fullname: newuser.fullname,
                    email: newuser.email,
                    phone: newuser.phone,
                    address: newuser.address,
                    level: +newuser.role,
                    hiredate: hiredate,
                    birthdate: birthdate
                }).then(function(employer) {
                    return res.status(200).send({
                        data: employer
                    });
                }).catch(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
                    });
                });
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    signin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var checked = req.body.checked;
        if (!username) {
            return res.status(400).send({
                error: {
                    message: "Username required!"
                }
            });
        }
        models.Employer.find({
            where: {
                username: username,
                password: md5(password),
                status: 1
            },
            attributes: [
                "id",
                "username",
                "email",
                "level",
                "info",
                "fullname",
                "address",
                "phone",
                "image",
            ]
        }).then(function(employer) {
            if (!employer) {
                return res.status(400).send({
                    error: {
                        message: "Username not exist!"
                    }
                });
            }

            if (checked) {
                res.status(200).send({
                    data: {
                        token: jwt.sign({
                            "employer": employer
                        }, config.secret)
                    }
                })
            } else {
                res.status(200).send({
                    data: {
                        token: jwt.sign({
                            "employer": employer
                        }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        })
                    }
                })
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    me: function(req, res) {
        var empl = req.userToken.employer;
        models.Employer.find({
            where: {
                id: empl.id
            },
            attributes: [
                "id",
                "username",
                "email",
                "level",
                "info",
                "fullname",
                "address",
                "phone",
                "image",
            ]
        }).then(function(employer) {
            return res.status(200).send({
                data: employer
            })
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    updateUser: function(req, res) {
        models.Employer.find({
            where: {
                id: req.body.id
            }
        }).then(function(employer) {
            return res.status(200).send({
                data: employer
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getUser: function(req, res) {
        models.Employer.find({
            where: {
                id: req.param("id")
            }
        }).then(function(employer) {
            return res.status(200).send({
                data: employer
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    getTotalUsers: function(req, res) {
        var empl = req.userToken.employer;
        var condition = ""
        if (empl.level === 1) {
            condition = "WHERE level != 1 AND id != '" + empl.id + "' ";
        } else if (empl.level === 2) {
            condition = "WHERE level = 3 AND id != '" + empl.id + "' ";
        } else {
            condition = "WHERE level = 4 AND id != '" + empl.id + "' ";
        }
        var search = req.param("search");
        var query = "";
        if (search) {
            var conditionExtend = " AND (username like '%" + search + "%' OR fullname like '%" + search + "%') ";
            query = "SELECT count(id) as total FROM employers " + condition + conditionExtend;
        } else {
            query = "SELECT count(id) as total FROM employers " + condition;
        }
        models.sequelize.query(query)
        .spread(function(result) {
            return res.status(200).send({
                data: result[0]
            })
        })
        .catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        })
    },
    getAllUser: function(req, res) {
        var empl = req.userToken.employer;
        var condition = "";
        if (empl.level === 1) {
            condition = "WHERE level != 1 AND id != '" + empl.id + "' ";
        } else if (empl.level === 2) {
            condition = "WHERE level = 3 AND id != '" + empl.id + "' ";
        } else {
            condition = "WHERE level = 4 AND id != '" + empl.id + "' ";
        }
        var page = req.param("page");
        var search = req.param("search");

        var numberRow = 10;
        var startRow = (page - 1) * 10
        var query = "";
        if (search) {
            var conditionExtend = " AND (username like '%" + search + "%' OR fullname like '%" + search + "%') ";
            query = "SELECT * FROM employers " + condition + conditionExtend + " LIMIT " + startRow + ", " + numberRow;;
        } else {
            query = "SELECT * FROM employers " + condition + " LIMIT " + startRow + ", " + numberRow;
        }
        models.sequelize.query(query)
        .then(function(listUsers) {
            return res.status(200).send({
                data: listUsers[0]
            });
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    resetPassword: function(req, res) {
        var id = req.body.id;
        var password = md5(req.body.password);
        var query = "UPDATE employers SET password = '" + password + "' WHERE id = '" + id + "'";
        models.sequelize.query(query)
        .then(function() {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    changeStatusEmployer: function(req, res) {
        var id = req.body.id;
        var status = req.body.status;
        var query = "UPDATE employers SET status = " + status + " WHERE id = '" + id + "'";
        models.sequelize.query(query)
        .then(function() {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    updateEmployerInfo: function(req, res) {
        var empl = req.userToken.employer;
        var data = req.body.data;
        var query = "UPDATE employers SET "
            + "fullname = '" + data.fullname 
            + "', email = '" + data.email 
            + "', phone = '" + data.phone
            + "', address = '" + data.address 
            + "' WHERE id = '" + empl.id + "'";
        models.sequelize.query(query)
        .then(function() {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    updatePasswordEmployers: function(req, res) {
        var empl = req.userToken.employer;
        var data = req.body.data;
        models.Employer.find({
            where: {
                id: empl.id
            }
        }).then(function(result) {
            if (result.password === md5(data.currentPassword)) {
                var query = "UPDATE employers SET  password = '" + md5(data.newPassword) +"' WHERE id = '" + empl.id + "'";
                models.sequelize.query(query)
                .then(function() {
                    return res.status(200).send();
                }).catch(function(err) {
                    logger("ERROR", err);
                    return res.status(400).send({
                        error: err
                    });
                });
            } else {
                return res.status(300).send({
                    error: {
                        message: "Mật Khẩu Hiện Tại Không Đúng"
                    }
                });
            }
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    },
    updateRoleEmployer: function(req, res) {
        var data = req.body.data;
        var query = "UPDATE employers SET level = " + data.level +" WHERE id = '" + data.id + "'";
        models.sequelize.query(query)
        .then(function() {
            return res.status(200).send();
        }).catch(function(err) {
            logger("ERROR", err);
            return res.status(400).send({
                error: err
            });
        });
    }
};
