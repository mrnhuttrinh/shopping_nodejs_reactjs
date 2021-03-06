import React, {Component} from 'react'
import _ from 'lodash';
import Modal from '../Modal';
import DropDown from './DropDown';
import checkfileimage from '../../utils/checkfileimage';
import apis from '../../apis/main';
import Select from 'react-select';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressAddButton: false,
            myDropzone: null,
            fileGallery: [],
            categoryArray: [],
            sizes: [],
            newProduct: {
                category: "",
                name: "",
                code: "",
                thumbnail_data: "",
                price_retail: 0,
                price_retail_promotion: 0,
                price_wholesale: 0,
                price_wholesale_promotion: 0,
                color: "",
                trademark_id: 0,
                description: ""
            },
            selectValue: null
        }
    }

    readImageFromDropZone() {
        var self = this;

        // read file content in dropzone
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var files = self.state.myDropzone.files;
        _.map(files, function(file) {
            var fr = new FileReader();
            fr.onload = function () {
                // fr.result is base-64
            }
            fr.readAsDataURL(file);
        });

        // remove file in dropzone if successed
        // self.state.myDropzone.removeAllFiles();
    }

    readFileImage(file, cb) {
        // read file content in dropzone
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var fr = new FileReader();
        fr.onload = function () {
            // fr.result is base-64
            cb(fr.result);
        }
        fr.readAsDataURL(file);
        // remove file in dropzone if successed
        // self.state.myDropzone.removeAllFiles();
    }

    resetState() {
        this.state.myDropzone.removeAllFiles();
        this.setState({
            pressAddButton: false,
            // myDropzone: null,
            fileGallery: [],
            categoryArray: [],
            sizes: [],
            newProduct: {
                category: "",
                name: "",
                code: "",
                thumbnail_data: "",
                price_retail: 0,
                price_retail_promotion: 0,
                price_wholesale: 0,
                price_wholesale_promotion: 0,
                color: "",
                trademark_id: 0,
                description: ""
            }
        })
    }

    modalExcute(event) {
        var modal = this.refs["modalAddProduct"]
        event.preventDefault();
        var self = this;
        var newProduct = self.state.newProduct;
        newProduct.name = self.refs["productName"].value;
        newProduct.code = self.refs["productCode"].value;
        newProduct.price_retail = self.refs["productRetailPrice"].value;
        newProduct.price_retail_promotion = self.refs["productPriceRetailPromotion"].value;
        newProduct.price_wholesale = self.refs["productWholeSalePrice"].value;
        newProduct.price_wholesale_promotion = self.refs["productPriceWholeSalePromotion"].value;
        newProduct.color = self.refs["productColor"].value;
        newProduct.trademark_id = self.state.selectValue;
        newProduct.description = self.refs["productDescription"].value;
        newProduct.category = self.state.categoryArray.join(", ");
        newProduct.sizes = self.state.sizes;
        newProduct.description_detail = $("#summernoteDetail").summernote('code');
        newProduct.tech_information = $("#summernoteInfo").summernote('code');
        if (self.formValidate(newProduct) && !self.state.pressAddButton) {
            self.setState({
                pressAddButton: true
            });
            apis.createProduct(newProduct, self.state.fileGallery, function(err, res) {
                if (err) {
                    toastr.error(err.response.body.error.message, "Tạo Sản Phẩm Lỗi");
                } else {
                    if (res.status === 200) {
                        toastr.success("Tạo Sản Phẩm Thành Công!")
                        modal.closeModal();
                        if ($(".classTabHome").hasClass("active") ) {
                            var updateTotalProduct = self.props.dashboard.totalProduct + 1;
                            self.props.getTotalProduct(updateTotalProduct);
                            if (self.props.dashboard.listProduct.length < 16) {
                                self.props.dashboard.listProduct.push(res.body.data);
                                self.props.getListProduct(self.props.dashboard.listProduct);
                            }
                        }
                        self.resetState();
                        self.resetForm();
                        $("#summernoteDetail").summernote("code", "");
                        $("#summernoteInfo").summernote("code", "");
                    } else {
                        toastr.error("Tạo Sản Phẩm Lỗi");
                    }
                }
                self.setState({
                    pressAddButton: false
                });
            })
        }
    }
    resetForm() {
        var self = this;
        self.refs["productName"].value = "";
        self.refs["productCode"].value = "";
        self.refs["productRetailPrice"].value = 0;
        self.refs["productPriceRetailPromotion"].value = 0;
        self.refs["productWholeSalePrice"].value = 0;
        self.refs["productPriceWholeSalePromotion"].value = 0;
        self.refs["productColor"].value = "";
        // self.refs["productTrademark"].value = "";
        self.refs["productDescription"].value = "";
        self.refs["productThumbnail"].value = "";
        var thumbnailImage = this.refs["thumbnailImage"];
        $(thumbnailImage).attr("src", "");

        var LiChoosen = $("li.list-group-item-success.li-dropdown");
        _.map(LiChoosen, (li) => {
            $(li).removeClass("list-group-item-success");
        });
        self.setState({
            selectValue: {}
        });
    }
    formValidate(newProduct) {
        if (_.isEmpty(newProduct.sizeS) ) {
            newProduct.sizeS = 0;
        }
        if (_.isEmpty(newProduct.sizeM) ) {
            newProduct.sizeM = 0;
        }
        if (_.isEmpty(newProduct.sizeX) ) {
            newProduct.sizeX = 0;
        }
        if (_.isEmpty(newProduct.category)) {
            toastr.warning(
                "Chọn Loại Sản Phẩm"
            );
            return false;
        }

        if (_.isEmpty(newProduct.name)) {
            toastr.warning(
                "Tên Sản Phẩm Phải Có"
            );
            return false;
        }

        if (_.isEmpty(newProduct.code)) {
            toastr.warning(
                "Mã Sản Phẩm Phải Có"
            );
            return false;
        }
        if (_.isEmpty(newProduct.thumbnail_data)) {
            toastr.warning(
                "Hình Ảnh Đại Diên Phải Có"
            );
            return false;
        }
        if (_.isEmpty(newProduct.price_retail)
            || parseFloat(newProduct.price_retail) === NaN) {
            toastr.warning(
                "Nhập Đúng Định Đạng: Dạng Số",
                "Giá Bán Lẻ Sản Phẩm Phải Có"
            );
            return false;
        }
        if (_.isEmpty(newProduct.price_wholesale)
            || parseFloat(newProduct.price_wholesale) === NaN) {
            toastr.warning(
                "Nhập Đúng Định Đạng: Dạng Số",
                "Giá Bán Sỉ Sản Phẩm Phải Có"
            );
            return false;
        }
        return true;
    }

    chooseThumbnialChange(event) {
        var self = this;
        event.preventDefault();
        var thumbnailImage = this.refs["thumbnailImage"];
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var file = $(event.currentTarget)[0].files[0];
        if (checkfileimage(file)) {
            var fr = new FileReader();
            fr.onload = function() {
                // fr.result is base-64
                // console.log(fr.result);
                $(thumbnailImage).attr("src", fr.result);
                self.state.newProduct.thumbnail_data = fr.result;
            }
            fr.readAsDataURL(file);
        } else {
            $(event.currentTarget).val("");
            $(thumbnailImage).attr("src", "");
        }
    }
    newSize(event) {
        event.preventDefault();
        var self = this;
        var lengthSize = self.state.sizes.length;
        if (lengthSize !== 0) {
            lengthSize = this.state.sizes[lengthSize-1].number;
        }
        self.state.sizes.push({
            number: ++lengthSize,
            quantity: 0,
            name: ""
        });
        self.setState({
            sizes: self.state.sizes
        })
    }
    removeSize(size, event) {
        event.preventDefault();
        var self = this;
        _.remove(self.state.sizes, (si)=> {
            return si.number === size.number;
        })
        // var indexFormat = 1;
        // _.forEach(self.state.sizes, (si)=>{
        //     si.number = indexFormat++;
        // })
        self.setState({
            sizes: self.state.sizes
        })
    }
    updateProductCategory(menu) {
        var cateIndex = this.state.categoryArray.indexOf(menu.id);
        if (cateIndex === -1) {
            this.state.categoryArray.push(menu.id);
        } else {
            this.state.categoryArray.splice(cateIndex, 1);
        }
        this.setState({
            categoryArray: this.state.categoryArray 
        })
    }
    sizeNameChange(size, event) {
        event.preventDefault();
        var self = this;
        var sizeUpdate = _.find(self.state.sizes, (si)=> {
            return si.number === size.number;
        })
        sizeUpdate.name = self.refs["size-name-"+size.number].value;
        self.setState({
            sizes: self.state.sizes
        })
    }
    sizeQuantityChange(size, event) {
        event.preventDefault();
        var self = this;
        var sizeUpdate = _.find(self.state.sizes, (si)=> {
            return si.number === size.number;
        })
        sizeUpdate.quantity = parseInt(self.refs["size-quantity-"+size.number].value);
        self.setState({
            sizes: self.state.sizes
        })
    }
    componentDidMount() {
        var self = this;
        $(function() {
            $("#summernoteDetail").summernote({
                height: 300,
                placeholder: 'Mô Tả Chi Tiết...'
            });
            $("#summernoteInfo").summernote({
                height: 300,
                placeholder: 'Thông Tin Về Sản Phẩm (Thương Hiêu, Nơi Sản Xuất)...'
            });
            // Dropzone.autoDiscover = false;
            self.state.myDropzone = new Dropzone("#mydropzone", { 
                url: "/file/post",
                addRemoveLinks : true,
                maxFilesize: 0.5,
                dictResponseError: 'Error uploading file!',
                autoProcessQueue: false
            });
            self.state.myDropzone.on("addedfile", function(file) {
                if (!checkfileimage(file)) {
                    self.state.myDropzone.removeFile(file);
                } else {
                    self.readFileImage(file, function(dataImage) {
                        self.state.fileGallery.push({
                            name: file.name,
                            data: dataImage
                        })
                    })
                }
            });

            self.state.myDropzone.on("removedfile", function(file) {
                _.remove(self.state.fileGallery, (gallery) => {
                    return gallery.name === file.name;
                })
            });
        });
    }

    priceRetailPromotionChange(event) {
        event.preventDefault();
        var self = this;
        var priceRetail = parseInt(self.refs["productRetailPrice"].value);
        var priceReatailPromotion = parseInt(self.refs["productPriceRetailPromotion"].value);
        if (priceReatailPromotion > priceRetail) {
            toastr.warning("Giá Khuyến Mãi Phải Thấp Hơn Giá Trị Thật")
        } else {
            var newProduct = self.state.newProduct;
            newProduct.price_retail = priceRetail;
            newProduct.price_retail_promotion = priceReatailPromotion;
            self.setState({
                newProduct: newProduct
            })
        }
    }

    priceWholesalePromotionChange(event) {
        event.preventDefault();
        var self = this;
        var priceWholesale = parseInt(self.refs["productWholeSalePrice"].value);
        var priceWholesalePromotion = parseInt(self.refs["productPriceWholeSalePromotion"].value);
        if (priceWholesalePromotion > priceWholesale) {
            toastr.warning("Giá Khuyến Mãi Phải Thấp Hơn Giá Trị Thật")
        } else {
            var newProduct = self.state.newProduct;
            newProduct.price_wholesale = priceWholesale;
            newProduct.price_wholesale_promotion = priceWholesalePromotion;
            self.setState({
                newProduct: newProduct
            })
        }
    }
    selectUpdateValue(newValue) {
        this.setState({
            selectValue: newValue
        });
    }
    render() {
        var self = this;
        var state = self.state;
        var modalTitle = "Thêm Sản Phẩm Mới";
        var modalExcute = this.modalExcute;
        var newProduct = state.newProduct;
        var listChooseCategory = [];
        if (state.categoryArray.length) {
            var cateChoose = _.map(state.categoryArray, (cate) => {
                var cateMenu = _.find(self.props.menus, (menu) => {
                    return menu.id === cate;
                });
                if (cateMenu) {
                    return (<li key={cate} className="list-group-item list-group-item-success">{cateMenu.name}</li>);
                }
            });
            listChooseCategory.push(cateChoose)
        } else {
            listChooseCategory.push(<li key={"empty"} className="list-group-item list-group-item-danger">Chưa chọn Loại Sản Phẩm</li>)
        }
        var productName = newProduct.name;
        var totalSize = 0;
        var sizeView = _.map(this.state.sizes, (size) => {
            totalSize += size.quantity;
            return (
                <div key={size.number} className="form-group">
                    <label className="col-sm-2 control-label">
                    </label>
                    <div className="col-sm-10">
                        <div className="form-group">
                            <label className="col-sm-1 control-label">
                            </label>
                            <label className="col-sm-2 control-label">
                                Tên Size
                            </label>
                            <div className="col-sm-3">
                                <input onChange={self.sizeNameChange.bind(self, size)} ref={"size-name-" + size.number} className="form-control" placeholder="Tên Size" type="text">
                                </input>
                            </div>
                            <label className="col-sm-2 control-label">
                                Số Lượng
                            </label>
                            <div className="col-sm-3">
                                <input onChange={self.sizeQuantityChange.bind(self, size)} className="form-control" ref={"size-quantity-" + size.number} placeholder="Số Lượng Size" type="number">
                                </input>
                            </div>
                            <div className="col-sm-1">
                                <button onClick={self.removeSize.bind(self, size)} type="button" className="btn btn-default">
                                    <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        var price_retail_sale = Math.floor(((newProduct.price_retail - newProduct.price_retail_promotion)/ newProduct.price_retail)*100);
        if (price_retail_sale.toString() === "NaN") {
            price_retail_sale = 0;
        }
        var price_wholesale_sale = Math.floor(((newProduct.price_wholesale - newProduct.price_wholesale_promotion)/ newProduct.price_wholesale)*100);
        if (price_wholesale_sale.toString() === "NaN") {
            price_wholesale_sale = 0;
        }
        return (
            <Modal ref="modalAddProduct"
                pressAddButton={this.state.pressAddButton}
                modalName={this.props.modalName}
                modalExcute={modalExcute.bind(this)}
                modalTitle={modalTitle}>
                <div className="row">
                    <div className="col-md-3">
                        <p>Hình Ảnh Sản Phẩm</p>
                        <div>
                            <form id="mydropzone" className="inline-modal dropzone dz-clickable dz-started scroll-customize" enctype="multipart/form-data">
                            </form>
                        </div> 
                        <br />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12">
                                <strong>Thông Tin Cần Thiết</strong>
                                <hr style={{"marginTop": "10px"}} />
                                <form className="scroll-customize form-horizontal inline-modal">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="dropdownCategory">
                                            Loại Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <DropDown 
                                                {...this.props} 
                                                updateProductCategory={this.updateProductCategory.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">
                                        </label>
                                        <div className="col-sm-10">
                                            <ul className="list-group">
                                                {listChooseCategory}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productName">
                                            Tên Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={productName} className="form-control" ref="productName" id="productName" placeholder="Tên Sản Phẩm" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productCode">
                                            Mã Sản Phẩm (Mã Code)
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={newProduct.code} className="form-control" ref="productCode" id="productCode" placeholder="Mã Sản Phẩm" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productThumbnail">
                                            Ảnh Đại Diện (Thumbnail)
                                        </label>
                                        <div className="col-sm-10">
                                            <img src={newProduct.thumbnail} ref="thumbnailImage" style={{"width": "200px", "height": "200px"}}>
                                            </img>
                                            <input defaultValue={newProduct.thumbnail} onChange={this.chooseThumbnialChange.bind(this)} className="form-control" ref="productThumbnail" id="productThumbnail" type="file">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px" >
                                        <label className="col-sm-2 control-label" for="productRetailPrice">
                                            Giá Bán Lẻ
                                        </label>
                                        <div className="col-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon">VNĐ</span>
                                                <input defaultValue={newProduct.price_retail} className="form-control" ref="productRetailPrice" id="productRetailPrice" placeholder="Giá Bán Lẻ" type="number">
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productPriceRetailPromotion">
                                            Giá Bán Lẻ Khuyến Mãi
                                        </label>
                                        <div className="col-sm-6">
                                            <div className="input-group">
                                                <span className="input-group-addon">VNĐ</span>
                                                <input onChange={this.priceRetailPromotionChange.bind(this)} defaultValue={newProduct.price_retail_promotion} className="form-control" ref="productPriceRetailPromotion" id="productPriceRetailPromotion" placeholder="Giá Bán Lẻ Khuyến Mãi" type="number">
                                                </input>
                                            </div>
                                        </div>
                                        <label className="col-sm-2 control-label">
                                            Giảm
                                        </label>
                                        <label className="col-sm-2 control-label">
                                            <span className="label label-info">{price_retail_sale}%</span>
                                        </label>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productWholeSalePrice">
                                            Giá Bán Sỉ
                                        </label>
                                        <div className="col-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon">VNĐ</span>
                                                <input defaultValue={newProduct.price_wholesale} className="form-control" ref="productWholeSalePrice" id="productWholeSalePrice" placeholder="Giá Bán Sỉ" type="number">
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productPriceWholeSalePromotion">
                                            Giá Bán Sỉ Khuyến Mãi
                                        </label>
                                        <div className="col-sm-6">
                                            <div className="input-group">
                                                <span className="input-group-addon">VNĐ</span>
                                                <input onChange={this.priceWholesalePromotionChange.bind(this)} defaultValue={newProduct.price_wholesale_promotion} className="form-control" ref="productPriceWholeSalePromotion" id="productPriceWholeSalePromotion" placeholder="Giá Bán Sỉ Khuyến Mãi" type="number">
                                                </input>
                                            </div>
                                        </div>
                                        <label className="col-sm-2 control-label">
                                            Giảm
                                        </label>
                                        <label className="col-sm-2 control-label">
                                            <span className="label label-info">{price_wholesale_sale}%</span>
                                        </label>
                                    </div>
                                    <div className="margin-right-20px">
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label" for="">
                                                Size
                                            </label>
                                            <div className="col-sm-10">
                                                <button onClick={this.newSize.bind(this)} type="button" className="btn btn-default">
                                                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Thêm Size
                                                </button>
                                                {" Tổng Số Sản Phẩm: "}<span className="label label-info">{totalSize}</span>
                                            </div>
                                        </div>
                                        {sizeView}
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productColor">
                                            Màu Sắc
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={newProduct.color} className="form-control" ref="productColor" id="productColor" placeholder="Màu Sắc" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productTrademarkId">
                                            Thương Hiệu Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <Select id="productTrademarkId"
                                                placeholder="Chọn Nhà Cung Cấp"
                                                value={this.state.selectValue}
                                                onChange={this.selectUpdateValue.bind(this)}
                                                options={this.props.commons.trademarks}/>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label" for="productDescription">
                                            Mô Tả Ngắn Về Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea defaultValue={newProduct.description} className="form-control" ref="productDescription" id="productDescription" placeholder="Mô Tả Ngắn Về Sản Phẩm">
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label">
                                            Mô Tả Chi Tiết Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <div id="summernoteDetail"></div>
                                        </div>
                                    </div>
                                    <div className="form-group margin-right-10px">
                                        <label className="col-sm-2 control-label">
                                            Thông Tin Chi Tiết Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <div id="summernoteInfo"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}