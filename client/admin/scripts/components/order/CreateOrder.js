import React, {Component} from 'react';
import _ from 'lodash';
import AddProduct from './AddProduct';
import orderAPI from '../../apis/order';
import DatePicker from 'react-datepicker';

class LabelAdd extends Component {
    render() {
        return (
            <div className="row">
                <section className="col col-12">
                    <div className="inline-group">
                        <label className="label">
                            Chưa Có Sản Phẩm Nào
                        </label>
                    </div>
                </section>
            </div>
        );
    }
}

export default class CreateOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            selectCity: 0,
            birthDate: null
        };
    }
    _onCreateOrder(event) {
        event.preventDefault();
        this.props.createOrderFrom(false);
    }
    addProduct(event) {
        event.preventDefault();
        var listProduct = this.state.listProduct;
        var productIndex = (new Date()).getTime();
        listProduct.push({
            id: productIndex
        });
        this.setState({
            listProduct: listProduct
        });
    }
    subtractProduct(id) {
        var listProduct = this.state.listProduct;
        _.remove(listProduct, (item) => {
            return item.id === id;
        });
        this.setState({
            listProduct: listProduct
        });
    }
    _onSave(event) {
        event.preventDefault();
        if (this.state.listProduct.length === 0) {
            toastr.warning("Chọn Sản Phẩm");
            return
        }
        var self = this;
        var checkProduct = _.filter(this.state.listProduct, (component) => {
            return self.refs["AddProduct_" + component.id].checkPrePost() === false;
        });
        if (checkProduct.length) {
            toastr.warning("Sản Phẩm Chưa Đúng Thông Tin");
            return;
        }
        // save
        var CustomerName = this.refs["CustomerName"].value;
        var Gender = this.refs["GenderMale"].checked ? true : false;
        var BirthDate = this.state.birthDate;
        
        var Mobile = this.refs["Mobile"].value;
        var Email = this.refs["Email"].value;

        var BuildingName = this.refs["BuildingName"].value;
        var WardID = this.refs["WardID"].value;
        var StreetName = this.refs["StreetName"].value;
        var HouseNumber = this.refs["HouseNumber"].value;

        var city = this.props.locations[this.refs["CityID"].value];
        var CityID = city.name;
        var district = city.districts[this.refs["DistrictID"].value];
        var DistrictID = district;

        var saveProducts = _.map(this.state.listProduct, (component) => {
            return self.refs["AddProduct_" + component.id].getProperties();
        });

        var data = {
            address: {
                gender: Gender,
                birthdate: BirthDate,
                fullname: CustomerName,
                phone: Mobile,
                homeno: HouseNumber,
                street: StreetName,
                building: BuildingName,
                ward: WardID,
                district: DistrictID,
                province: CityID,
                type: 'Extract'
            },
            products: saveProducts
        };
        orderAPI.createNewOrder(data, (err, res) => {
            if (err) {
                toastr.error("Tạo Đơn Đặt Hàng Lỗi!");
            } else {
                this.props.createOrderFrom(false);
                toastr.success("Tạo Đơn Đặt Hàng Thành Công!");
            }
        });
    }
    handleChangeBirthDate(date) {
        this.setState({
            birthDate: date
        });
    }
    renderCity() {
        var locations = this.props.locations;
        var options = [];
        _.forIn(locations, (location, index) => {
            options.push(
                <option value={index} key={"location_" + index}>
                    {location.name}
                </option>
            );
        });
        return (
            <div className="row">
                <section className="col col-2">
                    <div className="inline-group">
                        <label className="label">
                            Tỉnh/ TP
                        </label>
                    </div>
                </section>
                <section className="col col-10">
                    <label className="select">
                        <select ref="CityID" onChange={this.onSelectCity.bind(this)}>
                            <option value="0">
                                Chọn Tỉnh / TP
                            </option>
                            {options}
                        </select>
                        <i></i>
                    </label>
                </section>
            </div>
        );
    }
    onSelectCity(event) {
        event.preventDefault();
        var cityID = parseInt(event.currentTarget.value);
        this.setState({
            selectCity: cityID
        });
    }
    renderDistrict(address) {
        var selectCity = this.state.selectCity;
        var locations = this.props.locations;
        var options = [];
        if (selectCity===0) {
            // TODO 
        } else {
            var city = locations[selectCity];
            _.forIn(city.districts, (district, key) => {
                options.push(
                    <option value={key} key={"district_" + key}>
                        {district}
                    </option>
                );
            });
        }
        return (
            <div className="row">
                <section className="col col-2">
                    <div className="inline-group">
                        <label className="label">
                            Quận/ Huyện
                        </label>
                    </div>
                </section>
                <section className="col col-10">
                    <label className="select">
                        <select defaultValue="0" id="DistrictID" name="DistrictID" ref="DistrictID">
                            <option value="0">
                                Chọn Quận / Huyện
                            </option>
                            {options}
                        </select>
                        <i></i>
                    </label>
                </section>
            </div>
        );
    }
    renderFormCreate() {
        var productContent = (<LabelAdd />);
        if (this.state.listProduct.length) {
            productContent = _.map(this.state.listProduct, (item) => {
                return (<AddProduct ref={"AddProduct_" + item.id} key={item.id} subtractProduct={this.subtractProduct.bind(this)} productIndex={item.id}/>);
            });
        } 
        return (
            <div className="jarviswidget" id="wid-id-3" data-widget-editbutton="false" data-widget-custombutton="false">
                <header>
                    <span className="widget-icon"> 
                        <i className="fa fa-edit"></i> 
                    </span>
                    <h2>Tạo Đơn Đặt Hàng</h2>
                    <a onClick={this._onCreateOrder.bind(this)} className="pull-right btn btn-success btn-sm">Quay Lại Tìm Kiếm</a>
                </header>
                <div>
                    <div className="widget-body no-padding">
                        <form id="order-form" className="smart-form" noValidate="novalidate">
                            <header>
                                Thông Tin Khách Hàng
                            </header>
                            <fieldset>
                                <div className="row">
                                    <section className="col col-2">
                                        <div className="inline-group">
                                            <label className="label">
                                                Tên Khách Hàng
                                            </label>
                                        </div>
                                    </section>
                                    <section className="col col-10">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-lock"></i>
                                            <input type="text" ref="CustomerName" name="CustomerName" placeholder="Tên Khách Hàng" />
                                        </label>
                                    </section>
                                </div>
                                <div className="row">
                                    <section className="col col-2">
                                        <div className="inline-group">
                                            <label className="label">
                                                Giới Tính
                                            </label>
                                        </div>
                                    </section>
                                    <section className="col col-10">
                                        <div className="inline-group">
                                            <label className="radio">
                                                <input ref="GenderMale" type="radio" name="radio-inline" defaultChecked="checked" />
                                                <i></i>Nam
                                            </label>
                                            <label className="radio">
                                                <input ref="GenderFemale" type="radio" name="radio-inline" />
                                                <i></i>Nữ
                                            </label>
                                        </div>
                                    </section>
                                </div>
                                <div className="row">
                                    <section className="col col-2">
                                        <div className="inline-group">
                                            <label className="label">
                                                Ngày Sinh
                                            </label>
                                        </div>
                                    </section>
                                    <section className="col col-10">
                                        <DatePicker
                                                showYearDropdown 
                                                dateFormatCalendar="MMMM" 
                                                dateFormat="DD/MM/YYYY"
                                                className="form-control"
                                                placeholderText="Ngày Sinh"
                                                selected={this.state.birthDate}
                                                onChange={this.handleChangeBirthDate.bind(this)} />
                                    </section>
                                </div>
                                <div className="row">
                                    <section className="col col-2">
                                        <div className="inline-group">
                                            <label className="label">
                                                Số Điện Thoại
                                            </label>
                                        </div>
                                    </section>
                                    <section className="col col-10">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-lock"></i>
                                            <input type="text" ref="Mobile" name="Mobile" placeholder="Số Điện Thoại" />
                                        </label>
                                    </section>
                                </div>
                                <div className="row">
                                    <section className="col col-2">
                                        <div className="inline-group">
                                            <label className="label">
                                                Email
                                            </label>
                                        </div>
                                    </section>
                                    <section className="col col-10">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-lock"></i>
                                            <input type="text" ref="Email" name="Email" placeholder="Email" />
                                        </label>
                                    </section>
                                </div>
                                <div className="row">
                                    <section className="col col-2">
                                        <div className="inline-group">
                                            <label className="label">
                                                Địa Chỉ
                                            </label>
                                        </div>
                                    </section>
                                    <section className="col col-10">
                                        <div className="row">
                                            <fieldset>
                                                <div className="row">
                                                    <section className="col col-2">
                                                        <div className="inline-group">
                                                            <label className="label">
                                                                Số nhà
                                                            </label>
                                                        </div>
                                                    </section>
                                                    <section className="col col-10">
                                                        <label className="input"> 
                                                            <i className="icon-append fa fa-lock"></i>
                                                            <input type="text" ref="HouseNumber" name="HouseNumber" placeholder="Số Nhà" />
                                                        </label>
                                                    </section>
                                                </div>
                                                <div className="row">
                                                    <section className="col col-2">
                                                        <div className="inline-group">
                                                            <label className="label">
                                                                Đường/ Phố
                                                            </label>
                                                        </div>
                                                    </section>
                                                    <section className="col col-10">
                                                        <label className="input"> 
                                                            <i className="icon-append fa fa-lock"></i>
                                                            <input type="text" ref="StreetName" name="StreetName" placeholder="Đường/ Phố" />
                                                        </label>
                                                    </section>
                                                </div>
                                                <div className="row">
                                                    <section className="col col-2">
                                                        <div className="inline-group">
                                                            <label className="label">
                                                                Tòa nhà
                                                            </label>
                                                        </div>
                                                    </section>
                                                    <section className="col col-10">
                                                        <label className="input"> 
                                                            <i className="icon-append fa fa-lock"></i>
                                                            <input type="text" ref="BuildingName" name="BuildingName" placeholder="Tòa nhà" />
                                                        </label>
                                                    </section>
                                                </div>
                                                {this.renderCity()}
                                                {this.renderDistrict()}
                                                <div className="row">
                                                    <section className="col col-2">
                                                        <div className="inline-group">
                                                            <label className="label">
                                                                Phường/Xã
                                                            </label>
                                                        </div>
                                                    </section>
                                                    <section className="col col-10">
                                                        <label className="input"> 
                                                            <i className="icon-append fa fa-lock"></i>
                                                            <input type="text" ref="WardID" name="WardID" placeholder="Phường/Xã" />
                                                        </label>
                                                    </section>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </section>
                                </div>
                            </fieldset>
                            <header>
                                Thông Tin Sản Phẩm <a onClick={this.addProduct.bind(this)} className="pull-right btn btn-success btn-sm">{"+"}</a>
                            </header>
                            <fieldset>
                                {productContent}
                            </fieldset>
                            <fieldset>
                                <a onClick={this._onSave.bind(this)} className="pull-right btn btn-primary btn-sm">Lưu</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return this.renderFormCreate()
    }
}
