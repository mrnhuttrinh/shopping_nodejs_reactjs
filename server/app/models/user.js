// // "use strict";
// module.exports = function(sequelize, DataTypes) {
//     var User = sequelize.define("User", {
//         user_id: DataTypes.UUID,
//         user_name: DataTypes.STRING,
//         user_email: DataTypes.STRING,
//         user_pass: DataTypes.STRING,
//         user_level: DataTypes.INTEGER,
//         user_info: DataTypes.STRING,
//         user_fullname: DataTypes.STRING,
//         user_address: DataTypes.STRING,
//         user_phone: DataTypes.STRING,
//         user_image: DataTypes.STRING
//     });
//     return User;
// };
// 
// "use strict";

"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    }
  });

  return User;
};