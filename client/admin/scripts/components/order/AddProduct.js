
import React, {Component} from 'react';
import _ from 'lodash';
import mainAPI from '../../apis/main';
import Select from 'react-select';

var searchTimeOut;

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            listProductOptions: [],
            listSizeOptions: [],
            resultSearchProduct: "",
            selectValueProduct: null,
            selectValueSize: null
        };
    }
    subtractProduct(event) {
        event.preventDefault();
        this.props.subtractProduct(this.props.productIndex);
    }
    searchProduct(event) {
        event.preventDefault();
        var textProduct = this.refs["ProductName"]._optionsFilterString;
        if (_.isEmpty(textProduct)) return;
        this.setState({
            emptyProduct: false,
            resultSearchProduct: ""
        });
        var data = {
            value: textProduct
        };
        mainAPI.searchProduct(data, (err, res) => {
            if (err) {
                toastr.error("Tìm Kiếm Lỗi!");
                this.state.resultSearchProduct = "Sản Phẩm Không Tồn Tại.";
                this.setState({
                    resultSearchProduct: this.state.resultSearchProduct
                });
            } else {
                var count = 0;
                var options = _.map(res.body.data, (product) => {
                    count ++;
                    return {
                        value: product.id,
                        label: product.name
                    };
                });
                this.state.resultSearchProduct = "Có " + count + " Sản Phẩm.";
                this.setState({
                    listProduct: res.body.data,
                    listProductOptions: options,
                    resultSearchProduct: this.state.resultSearchProduct
                });
                this.refs["ProductName"].setState({
                    isOpen: true
                });
            }
        });
    }
    selectChange(val) {
        var productId = val;
        var product = _.find(this.state.listProduct, (product) => {
            return product.id === productId;
        });
        var options = _.map(product.sizes, (size) => {
            return {
                value: size.id,
                label: size.name
            };
        });
        this.setState({
            listSizeOptions: options,
            selectValueProduct: val
        });
    }
    selectChangeSize(val) {
        this.setState({
            selectValueSize: val
        });
    }
    checkPrePost() {
        if (this.state.selectValueSize === null) return false;
        if (this.state.selectValueProduct === null) return false;
        if (_.isEmpty(this.refs["Quantity"].value)) return false;
        return true;
    }
    getProperties() {
        var product = _.find(this.state.listProduct, (product) => {
            return product.id === this.state.selectValueProduct;
        });
        return {
            id: this.state.selectValueSize,
            size: this.state.selectValueProduct,
            quantity: this.refs["Quantity"].value,
            price_wholesale: product.price_wholesale,
            price_wholesale_promotion: product.price_wholesale_promotion
        };
    }
    render() {
        return (
            <div className="row">
                <section className="col col-10">
                    <div className="row">
                        <section className="col col-2">
                            <div className="inline-group">
                                <label className="label">
                                    Tên/Mã Sản Phẩm
                                </label>
                            </div>
                        </section>
                        <section className="col col-8">
                            <Select
                                onChange={this.selectChange.bind(this)}
                                autofocus
                                simpleValue
                                value={this.state.selectValueProduct}
                                ref="ProductName" 
                                name="ProductName" 
                                placeholder="Tên Sản Phẩm/Mã Sản Phẩm"
                                options={this.state.listProductOptions}/>
                            <div className="note note-error">{this.state.resultSearchProduct}</div>
                            <span className="help-block"><i className="fa fa-warning"></i> Please correct the error</span>
                        </section>
                        <section className="col col-2">
                            <a onClick={this.searchProduct.bind(this)} className="pull-right btn btn-primary btn-sm">Tìm Kiếm</a>
                        </section>
                    </div>
                    <div className="row">
                        <section className="col col-2">
                            <div className="inline-group">
                                <label className="label">
                                    Size
                                </label>
                            </div>
                        </section>
                        <section className="col col-10">
                            <Select
                                onChange={this.selectChangeSize.bind(this)}
                                value={this.state.selectValueSize}
                                autofocus
                                simpleValue
                                ref="ProductSize" 
                                name="ProductSize" 
                                placeholder="Size"
                                options={this.state.listSizeOptions}/>
                        </section>
                    </div>
                    <div className="row">
                        <section className="col col-2">
                            <div className="inline-group">
                                <label className="label">
                                    Số Lượng
                                </label>
                            </div>
                        </section>
                        <section className="col col-10">
                            <label className="input"> 
                                <i className="icon-append fa fa-lock"></i>
                                <input type="text" ref="Quantity" name="Quantity" placeholder="Số Lượng" />
                            </label>
                        </section>
                    </div>
                    <header></header>
                </section>
                <section className="col col-2">
                    <a onClick={this.subtractProduct.bind(this)} className="pull-right btn btn-danger btn-sm">{"-"}</a>
                </section>
            </div>
        );
    }
}
