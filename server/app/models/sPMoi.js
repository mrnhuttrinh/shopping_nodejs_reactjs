module.exports = function(sequelize, DataTypes) {
    var LoaiSP = sequelize.define("LoaiSP", {
        MaSP: DataTypes.INTEGER,
        MaLloai: DataTypes.STRING
    }) 
    return LoaiSP;
}
