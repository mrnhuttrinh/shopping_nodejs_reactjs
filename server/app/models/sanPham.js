module.exports = function(sequelize, DataTypes) {
    var SanPham = sequelize.define("SanPham", {
        MaSP: DataTypes.INTEGER,
        TenSP: DataTypes.STRING,
        DonViTinh: DataTypes.STRING,
        SoLuong: DataTypes.INTEGER,
        GiaLeSP: DataTypes.DECIMAL,
        GiaSiSP: DataTypes.DECIMAL,
        MoTa: DataTypes.TEXT,
        KhuyenMai: DataTypes.INTEGER,
        XuatXu: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                SanPham.belongsTo(models.LoaiSP, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    }) 
    return SanPham;
}
