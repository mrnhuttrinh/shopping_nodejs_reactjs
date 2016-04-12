module.exports = function(sequelize, DataTypes) {
    var LoaiSP = sequelize.define("LoaiSP", {
        STT: DataTypes.INTEGER,
        TENLOAI: DataTypes.STRING
    }) 
    return LoaiSP;
}
