module.exports = function(sequelize, DataTypes) {
    var LoaiSP = sequelize.define("LoaiSP", {
        STT: DataTypes.INTEGER,
        TenLoai: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                LoaiSP.hasMany(models.SanPham)
            }
        }
    }) 
    return LoaiSP;
}
