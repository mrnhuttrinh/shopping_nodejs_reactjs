import React, {Component} from 'react'
import _ from 'lodash'
import apis from '../../apis/main';
import checkfileimage from '../../utils/checkfileimage';
import DeleteProduct from './DeleteProduct';
import Category from './Category';
import Sizes from './Sizes';
import Gallery from './Gallery';
import Loading from '../ButtonLoading';

export default class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameEdit: false,
            codeEdit: false,
            colorEdit: false,
            trademarkEdit: false,
            descriptionEdit: false,
            priceRetailEdit: false,
            priceRetailPromotionEdit: false,
            priceWholesaleEdit: false,
            priceWholesalePromotionEdit: false,
            nameEditStatus: false,
            codeEditStatus: false,
            colorEditStatus: false,
            trademarkEditStatus: false,
            descriptionEditStatus: false,
            priceRetailEditStatus: false,
            priceRetailPromotionEditStatus: false,
            priceWholesaleEditStatus: false,
            priceWholesalePromotionEditStatus: false
        };
    }
    changePhoto(event) {
        event.preventDefault();
        var self = this;
        var inputPhoto = self.refs["exampleInputFile"];
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var file = $(inputPhoto)[0].files[0];
        if (checkfileimage(file)) {
            var fr = new FileReader();
            fr.onload = function() {
                // fr.result is base-64
                apis.updateProduct(
                    self.props.product.id, 
                    "thumbnail", 
                    {
                        path: self.props.product.thumbnail,
                        dataimage: fr.result
                    }, 
                    function(err, res) {
                    if (err) {
                        toastr.error("Cập Nhật Hình Không Thành Công")
                    } else {
                        self.props.product.thumbnail = fr.result;
                        user.image = fr.result;
                        toastr.success("Cập Nhật Thành Công")
                        self.forceUpdate();
                    }
                })
            }
            fr.readAsDataURL(file);
        } else {
            $(inputPhoto).val("");
        }
    }
    componentDidMount() {
        var self = this;
        var id = this.props.params.id;
        apis.getProduct(id, function(err, res) {
            if (err) {
                toastr.warning("Sản Phẩm Không Tồn Tại");
                window.location = "/admin/#/dashboard";
            } else {
                self.props.getProduct(res.body.data);
            }
        })
    }
    componentDidUpdate() {
        $(function() {
            $('.bxslider').bxSlider({
                controls: true
            });
        })
    }
    updateField(type) {
        var self = this;
        switch(type) {
            case "name":
                self.setState({
                    nameEdit: !self.state.nameEdit
                })
                break;
            case "code":
                self.setState({
                    codeEdit: !self.state.codeEdit
                })
                break;
            case "color":
                self.setState({
                    colorEdit: !self.state.colorEdit
                })
                break;
            case "trademark":
                self.setState({
                    trademarkEdit: !self.state.trademarkEdit
                })
                break;
            case "description":
                self.setState({
                    descriptionEdit: !self.state.descriptionEdit
                })
                break;
            case "price_retail":
                self.setState({
                    priceRetailEdit: !self.state.priceRetailEdit
                })
                break;
            case "price_retail_promotion":
                self.setState({
                    priceRetailPromotionEdit: !self.state.priceRetailPromotionEdit
                })
                break;
            case "price_wholesale":
                self.setState({
                    priceWholesaleEdit: !self.state.priceWholesaleEdit
                })
                break;
            case "price_wholesale_promotion":
                self.setState({
                    priceWholesalePromotionEdit: !self.state.priceWholesalePromotionEdit
                })
                break;
        }
    }
    updateFieldSaveStatus(type) {
        var self = this;
        switch(type) {
            case "name":
                self.setState({
                    nameEditStatus: !self.state.nameEditStatus
                })
                break;
            case "code":
                self.setState({
                    codeEditStatus: !self.state.codeEditStatus
                })
                break;
            case "color":
                self.setState({
                    colorEditStatus: !self.state.colorEditStatus
                })
                break;
            case "trademark":
                self.setState({
                    trademarkEditStatus: !self.state.trademarkEditStatus
                })
                break;
            case "description":
                self.setState({
                    descriptionEditStatus: !self.state.descriptionEditStatus
                })
                break;
            case "price_retail":
                self.setState({
                    priceRetailEditStatus: !self.state.priceRetailEditStatus
                })
                break;
            case "price_retail_promotion":
                self.setState({
                    priceRetailPromotionEditStatus: !self.state.priceRetailPromotionEditStatus
                })
                break;
            case "price_wholesale":
                self.setState({
                    priceWholesaleEditStatus: !self.state.priceWholesaleEditStatus
                })
                break;
            case "price_wholesale_promotion":
                self.setState({
                    priceWholesalePromotionEditStatus: !self.state.priceWholesalePromotionEditStatus
                })
                break;
        }
    }
    updateValueField(data, type, product) {
        switch(type) {
            case "name":
                product.name = data;
                break;
            case "code":
                product.code = data;
                break;
            case "color":
                product.color = data;
                break;
            case "trademark":
                product.trademark = data;
                break;
            case "description":
                product.description = data;
                break;
            case "price_retail":
                product.price_retail = data;
                break;
            case "price_retail_promotion":
                product.price_retail_promotion = data;
                break;
            case "price_wholesale":
                product.price_wholesale = data;
                break;
            case "price_wholesale_promotion":
                product.price_wholesale_promotion = data;
                break;
        }
    }
    openTextBox(type, event) {
        event.preventDefault();
        var self = this;
        self.updateField(type);
    }
    onSaveUpdateField(type, event) {
        event.preventDefault();
        var self = this;
        var data;
        switch(type) {
            case "name":
                data = self.refs["productName"].value;
                if (_.isEmpty(data)) {
                    return toastr.warning("Không Được Để Trống")
                }
                break;
            case "code":
                data = self.refs["productCode"].value;
                if (_.isEmpty(data)) {
                    return toastr.warning("Không Được Để Trống")
                }
                break;
            case "color":
                data = self.refs["productColor"].value;
                break;
            case "trademark":
                data = self.refs["productTrademark"].value;
                break;
            case "description":
                data = self.refs["productDescription"].value;
                break;
            case "price_retail":
                data = self.refs["productPriceRetail"].value;
                if (_.isEmpty(data)) {
                    data = 0;
                }
                break;
            case "price_retail_promotion":
                data = self.refs["productPriceRetailPromotion"].value;
                if (_.isEmpty(data)) {
                    data = 0;
                }
                break;
            case "price_wholesale":
                data = self.refs["productPriceWholesale"].value;
                if (_.isEmpty(data)) {
                    data = 0;
                }
                break;
            case "price_wholesale_promotion":
                data = self.refs["productPriceWholesalePromotion"].value;
                if (_.isEmpty(data)) {
                    data = 0;
                }
                break;
        }
        self.updateFieldSaveStatus(type)
        apis.updateProduct(self.props.product.id, type, data, function(err, res) {
            if (err) {
                if (err.status === 400) {
                    toastr.error("Cập Nhật Không Thành Công!")
                } else if (err.status === 300) {
                    toastr.warning(err.response.body.error.message)
                }
            } else {
                toastr.success("Cập Nhật Thành Công!")
                self.updateField(type);
                // update product
                self.updateValueField(data, type, self.props.product);
                self.props.getProduct(self.props.product);
                // update list product
                var rowUpdate = _.find(self.props.listProduct, (pro) => {
                    return pro.id === self.props.product.id;
                })
                if (rowUpdate) {
                    self.updateValueField(data, type, rowUpdate);
                    self.props.getListProduct(self.props.listProduct);
                }
            }
            self.updateFieldSaveStatus(type)
        })
    }
    onCancelUpdateField(type, event) {
        event.preventDefault();
        var self = this;
        self.updateField(type);
    }
    updateParentView() {
        this.forceUpdate();
    }
    render() {
        var self = this;
        var product = this.props.product;
        var totalCategory = 0;
        var viewCategories = "";
        var viewSizes = "";
        
        var viewGallery = "";
        var listImage = "";
        if (!_.isEmpty(product)) {
            var listChooseCategory = [];
            if (product.categories.length) {
                var cateChoose = _.map(product.categories, (cate) => {
                    totalCategory++;
                    var cateMenu = _.find(self.props.menus, (menu) => {
                        return menu.id === cate.category;
                    });
                    if (cateMenu) {
                        return (
                            <li className="list-category-group list-group-item list-group-item-success">
                                {cateMenu.name}
                            </li>
                        );
                    }
                });
                listChooseCategory.push(cateChoose)
            } else {
                listChooseCategory.push(<li className="list-category-group list-group-item list-group-item-danger">Chưa chọn Loại Sản Phẩm</li>)
            }
            viewCategories = (
                <tr>
                    <td>
                    </td>
                    <td>
                        <ul className="list-group">
                            {listChooseCategory}
                        </ul>
                    </td>
                </tr>
            );

            var listSizes = _.map(product.sizes, (size)=> {
                return (
                    <li className="list-size-group list-group-item list-group-item-success">
                        Size {size.name + "   "}
                        <span className="label label-info">{size.quantity}</span>
                    </li>
                )
            });
            if (listSizes.length) {
                viewSizes = (
                    <tr>
                        <td>
                        </td>
                        <td>
                            <ul className="list-group">
                                {listSizes}
                            </ul>
                        </td>
                    </tr>
                )
            }

            var indexSlide = 0;
            var listGallery = _.map(product.galleries, (gallery)=> {
                return (
                    <li><img src={gallery.image} /></li>
                )
            });
            if (listGallery.length) {
                viewGallery = (
                    <tr>
                        <td colSpan="2">
                            <ul className="bxslider">
                                {listGallery}
                            </ul>
                        </td>
                    </tr>
                );
            }
        }
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="carousel profile-carousel" id="myCarousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <img style={{"width": "100%"}} alt="demo user" src="img/clothes.jpg">
                                </img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-4 profile-pic">
                            <div className="col-sm-3 profile-pic" style={{"width": "100%"}}>
                                <img src={product.thumbnail} alt="Ảnh Đại Diện" style={{"maxWidth": "100%","width": "250px", "height": "250px", "top": "-100px"}}/>
                                <div style={{"marginTop": "-60px", "marginLeft": "70px"}} className="padding-10">
                                    <input type="file" onChange={this.changePhoto.bind(this)} id="exampleInputFile" ref="exampleInputFile" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <h1>
                                Thông Tin Sản Phẩm
                                <DeleteProduct {...this.props}/>
                            </h1>
                            <table className="table table-bordered table-striped" id="user">
                                <tbody>
                                    <tr>
                                        <td style={{"width": "40%"}}>
                                            Loại Sản Phẩm
                                        </td>
                                        <td style={{"width": "60%"}}>
                                            <span className="label label-info">{totalCategory}</span>
                                            <Category {...this.props}/>
                                        </td>
                                    </tr>
                                    {viewCategories}
                                    <tr>
                                        <td>
                                            Tên
                                        </td>
                                        {
                                            this.state.nameEdit ? (
                                                <td>
                                                    <input defaultValue={product.name} className="form-control" ref="productName" id="productName" placeholder="Tên Sản Phẩm" type="text">
                                                    </input>
                                                    <p>
                                                        {
                                                            this.state.nameEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "name")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "name")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.name}
                                                    <button onClick={this.openTextBox.bind(this, "name")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>
                                            Mã (code)
                                        </td>
                                        {
                                            this.state.codeEdit ? (
                                                <td>
                                                    <input defaultValue={product.code} className="form-control" ref="productCode" id="productCode" placeholder="Mã Sản Phẩm" type="text">
                                                    </input>
                                                    <p>
                                                        {
                                                            this.state.codeEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "code")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "code")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.code}
                                                    <button onClick={this.openTextBox.bind(this, "code")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Lẻ
                                        </td>
                                        {
                                            this.state.priceRetailEdit ? (
                                                <td>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">VNĐ</span>
                                                        <input defaultValue={product.price_retail} className="form-control" ref="productPriceRetail" id="productPriceRetail" placeholder="Giá Bán Lẻ" type="number">
                                                        </input>
                                                    </div>
                                                    <p>
                                                        {
                                                            this.state.priceRetailEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "price_retail")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "price_retail")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.price_retail} VNĐ
                                                    <button onClick={this.openTextBox.bind(this, "price_retail")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Lẻ Khuyến Mãi
                                        </td>
                                        {
                                            this.state.priceRetailPromotionEdit ? (
                                                <td>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">VNĐ</span>
                                                        <input defaultValue={product.price_retail_promotion} className="form-control" ref="productPriceRetailPromotion" id="productPriceRetailPromotion" placeholder="Giá Bán Lẻ Khuyến Mãi" type="number">
                                                        </input>
                                                    </div>
                                                    <p>
                                                        {
                                                            this.state.priceRetailPromotionEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "price_retail_promotion")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "price_retail_promotion")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                {product.price_retail_promotion} VNĐ
                                                <button onClick={this.openTextBox.bind(this, "price_retail_promotion")} type="button" className="btn btn-default btn-xs pull-right">
                                                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                </button>
                                            </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Sỉ
                                        </td>
                                        {
                                            this.state.priceWholesaleEdit ? (
                                                <td>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">VNĐ</span>
                                                        <input defaultValue={product.price_wholesale} className="form-control" ref="productPriceWholesale" id="productPriceWholesale" placeholder="Giá Bán Sỉ" type="number">
                                                        </input>
                                                    </div>
                                                    <p>
                                                        {
                                                            this.state.priceWholesaleEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "price_wholesale")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "price_wholesale")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.price_wholesale} VNĐ
                                                    <button onClick={this.openTextBox.bind(this, "price_wholesale")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Sỉ Khuyến Mãi
                                        </td>
                                        {
                                            this.state.priceWholesalePromotionEdit ? (
                                                <td>
                                                    <div className="input-group">
                                                        <span className="input-group-addon">VNĐ</span>
                                                        <input defaultValue={product.price_wholesale_promotion} className="form-control" ref="productPriceWholesalePromotion" id="productPriceWholesalePromotion" placeholder="Giá Bán Sỉ Khuyến Mãi" type="number">
                                                        </input>
                                                    </div>
                                                    <p>
                                                        {
                                                            this.state.priceWholesalePromotionEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "price_wholesale_promotion")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "price_wholesale_promotion")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.price_wholesale_promotion} VNĐ
                                                    <button onClick={this.openTextBox.bind(this, "price_wholesale_promotion")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <Sizes {...this.props} />
                                    {viewSizes}
                                    <tr>
                                        <td>
                                            Màu Sắc
                                        </td>
                                        {
                                            this.state.colorEdit ? (
                                                <td>
                                                    <input defaultValue={product.color} className="form-control" ref="productColor" id="productColor" placeholder="Màu Sắc" type="text">
                                                    </input>
                                                    <p>
                                                        {
                                                            this.state.colorEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "color")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "color")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.color}
                                                    <button onClick={this.openTextBox.bind(this, "color")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            Thương Hiệu
                                        </td>
                                        {
                                            this.state.trademarkEdit ? (
                                                <td>
                                                    <input defaultValue={product.trademark} className="form-control" ref="productTrademark" id="productTradeMark" placeholder="Tên Thương Hiệu" type="text">
                                                    </input>
                                                    <p>
                                                        {
                                                            this.state.trademarkEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "trademark")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "trademark")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.trademark}
                                                    <button onClick={this.openTextBox.bind(this, "trademark")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            Mô Tả Chi Tiết
                                        </td>
                                        {
                                            this.state.descriptionEdit ? (
                                                <td>
                                                    <input defaultValue={product.description} className="form-control" ref="productDescription" id="productDescription" placeholder="Mô Tả Chi Tiết" type="text">
                                                    </input>
                                                    <p>
                                                        {
                                                            this.state.descriptionEditStatus ? (
                                                                <Loading classCSS={"btn-sm"}/>
                                                            ) : (
                                                                <button type="button" onClick={this.onSaveUpdateField.bind(this, "description")} className="btn btn-primary btn-sm">Lưu</button>
                                                            )
                                                        }
                                                        <button type="button" onClick={this.onCancelUpdateField.bind(this, "description")} className="btn btn-warning btn-sm">Hủy</button>
                                                    </p>
                                                </td>
                                            ) : (
                                                <td>
                                                    {product.description}
                                                    <button onClick={this.openTextBox.bind(this, "description")} type="button" className="btn btn-default btn-xs pull-right">
                                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <Gallery updateParentView={this.updateParentView.bind(this)} {...this.props} />
                                    {viewGallery}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
