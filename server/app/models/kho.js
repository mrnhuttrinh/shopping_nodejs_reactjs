module.exports = function(sequelize, DataTypes) {
    var LoaiSP = sequelize.define("LoaiSP", {
        MaSP: DataTypes.INTEGER,
        MaLoai: DataTypes.STRING
    }) 
    return LoaiSP;
}
