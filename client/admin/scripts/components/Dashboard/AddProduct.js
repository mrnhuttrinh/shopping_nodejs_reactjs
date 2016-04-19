import React, {Component} from 'react'
import _ from 'lodash';
import Modal from '../Modal';
import DropDown from './DropDown';
import checkfileimage from '../../utils/checkfileimage';
import apis from '../../apis/main';

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressAddButton: false,
            myDropzone: null,
            fileGallery: [],
            categoryArray: [],
            newProduct: {
                category: "",
                name: "",
                code: "",
                thumbnail_data: "",
                price_retail: 0,
                price_retail_promotion: 0,
                price_wholesale: 0,
                price_wholesale_promotion: 0,
                sizeS: 0,
                sizeM: 0,
                sizeX: 0,
                color: "",
                trademark: "",
                description: ""
            }
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
            newProduct: {
                category: "",
                name: "",
                code: "",
                thumbnail_data: "",
                price_retail: 0,
                price_retail_promotion: 0,
                price_wholesale: 0,
                price_wholesale_promotion: 0,
                sizeS: 0,
                sizeM: 0,
                sizeX: 0,
                color: "",
                trademark: "",
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
        newProduct.sizeS = self.refs["productSizeS"].value;
        newProduct.sizeM = self.refs["productSizeM"].value;
        newProduct.sizeX = self.refs["productSizeX"].value;
        newProduct.color = self.refs["productColor"].value;
        newProduct.trademark = self.refs["productTrademark"].value;
        newProduct.description = self.refs["productDescription"].value;
        newProduct.category = this.state.categoryArray.join(", ");
        if (this.formValidate(newProduct) && !self.state.pressAddButton) {
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
                        var updateTotalProduct = self.props.totalProduct + 1;
                        self.props.getTotalProduct(updateTotalProduct);
                        if (self.props.listProduct.length < 16) {
                            self.props.listProduct.push(res.body.data);
                            self.props.getListProduct(self.props.listProduct);
                        }
                        self.resetState();
                        self.resetForm();
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
        self.refs["productSizeS"].value = 0;
        self.refs["productSizeM"].value = 0;
        self.refs["productSizeX"].value = 0;
        self.refs["productColor"].value = "";
        self.refs["productTrademark"].value = "";
        self.refs["productDescription"].value = "";
        self.refs["productThumbnail"].value = "";
        var thumbnailImage = this.refs["thumbnailImage"];
        $(thumbnailImage).attr("src", "");

        var LiChoosen = $("li.list-group-item-success.li-dropdown");
        _.map(LiChoosen, (li) => {
            $(li).removeClass("list-group-item-success");
        })
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

    componentDidMount() {
        var self = this;
        $(function() {
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
                    return (<li className="list-group-item list-group-item-success">{cateMenu.name}</li>);
                }
            });
            listChooseCategory.push(cateChoose)
        } else {
            listChooseCategory.push(<li className="list-group-item list-group-item-danger">Chưa chọn Loại Sản Phẩm</li>)
        }
        var productName = newProduct.name;
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
                            <form style={{"overflowY": "scroll", "height": "400px"}} id="mydropzone" className="dropzone dz-clickable dz-started" enctype="multipart/form-data">
                            </form>
                        </div> 
                        <br />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12">
                                <strong>Thông Tin Cần Thiết</strong>
                                <hr style={{"marginTop": "10px"}} />
                                <form style={{"overflowY": "scroll","overflowX": "hidden", "height": "400px"}} className="form-horizontal">
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
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productName">
                                            Tên Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={productName} className="form-control" ref="productName" id="productName" placeholder="Tên Sản Phẩm" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productCode">
                                            Mã Sản Phẩm (Mã Code)
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={newProduct.code} className="form-control" ref="productCode" id="productCode" placeholder="Mã Sản Phẩm" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
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
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productRetailPrice">
                                            Giá Bán Lẻ
                                        </label>
                                        <div className="col-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon">VND</span>
                                                <input defaultValue={newProduct.price_retail} className="form-control" ref="productRetailPrice" id="productRetailPrice" placeholder="Giá Bán Lẻ" type="number">
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productPriceRetailPromotion">
                                            Giá Bán Lẻ Khuyến Mãi
                                        </label>
                                        <div className="col-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon">VND</span>
                                                <input defaultValue={newProduct.price_retail_promotion} className="form-control" ref="productPriceRetailPromotion" id="productPriceRetailPromotion" placeholder="Giá Bán Lẻ Khuyến Mãi" type="number">
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productWholeSalePrice">
                                            Giá Bán Sỉ
                                        </label>
                                        <div className="col-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon">VND</span>
                                                <input defaultValue={newProduct.price_wholesale} className="form-control" ref="productWholeSalePrice" id="productWholeSalePrice" placeholder="Giá Bán Sỉ" type="number">
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productPriceWholeSalePromotion">
                                            Giá Bán Sỉ Khuyến Mãi
                                        </label>
                                        <div className="col-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon">VND</span>
                                                <input defaultValue={newProduct.price_wholesale_promotion} className="form-control" ref="productPriceWholeSalePromotion" id="productPriceWholeSalePromotion" placeholder="Giá Bán Sỉ Khuyến Mãi" type="number">
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productSizeS">
                                            Số Lượng Size S
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={newProduct.sizeS} className="form-control" ref="productSizeS" id="productSizeS" placeholder="Size S" type="number">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productSizeM">
                                            Số Lượng Size M
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={newProduct.sizeM} className="form-control" ref="productSizeM" id="productSizeM" placeholder="Size M" type="number">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productSizeX">
                                            Số Lượng Size X
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={newProduct.sizeX} className="form-control" ref="productSizeX" id="productSizeS" placeholder="Size X" type="number">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productColor">
                                            Màu Sắc
                                        </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={newProduct.color} className="form-control" ref="productColor" id="productColor" placeholder="Màu Sắc" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productTrademark">
                                            Thương Hiệu Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea defaultValue={newProduct.trademark} className="form-control" ref="productTrademark" id="productTrademark" placeholder="Thương Hiệu Sản Phẩm">
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="productDescription">
                                            Mô Tả Chi Tiết Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <textarea defaultValue={newProduct.description} className="form-control" ref="productDescription" id="productDescription" placeholder="Mô Tả Chi Tiết Sản Phẩm">
                                            </textarea>
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