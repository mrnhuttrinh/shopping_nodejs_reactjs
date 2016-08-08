import React, {Component} from 'react';
import _ from 'lodash';
import Validate from '../../commons/Validate';
import UserAPI from '../../../apis/user';

export default class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = this.initStateValidate();
        this.state.selectCity = 0;
        this.state.saveLoading = false;
    }

    initStateValidate() {
        return {
            validateReceiverName: {
                tagError: null
            },
            validateMobile: {
                tagError: null
            },
            validateHouseNumber: {
                tagError: null
            },
            validateStreetName: {
                tagError: null
            },
            validateBuildingName: {
                tagError: null
            },
            validateCityID: {
                tagError: null
            },
            validateDistrictID: {
                tagError: null
            },
            validateWardID: {
                tagError: null
            },
            dialogPopup: null
        };
    }
    onCancel(event) {
        event.preventDefault();
        this.props.addAddressForm(false);
    }
    handlerSubmitForm(event) {
        event.preventDefault();
        this.validateForm();
        var data = {
            address: this.getData()
        };
        this.setState({
            saveLoading: true
        });
        if (this.props.formType === "create") {
            UserAPI.addNewAddress(data, (err, res) => {
                if (err) {
                    // TODO
                } else {
                    this.props.updateListAddress(res.body.data, "create");
                    this.props.addAddressForm(false);
                }
                this.setState({
                    saveLoading: false
                });
            });
        } else {
            var chooseAddress = this.props.chooseAddress;
            var address = this.props.listAddress[chooseAddress];
            data.address.id = address.id;
            UserAPI.updateAddress(data, (err, res) => {
                if (err) {
                    // TODO
                } else {
                    _.merge(address, data.address);
                    this.props.updateListAddress(address, "update")
                    this.props.addAddressForm(false);
                }
                this.setState({
                    saveLoading: false
                });
            });
        }

    }
    getData() {
        var ReceiverName = this.refs["ReceiverName"];
        var Mobile = this.refs["Mobile"];
        var HouseNumber = this.refs["HouseNumber"];
        var StreetName = this.refs["StreetName"];
        var BuildingName = this.refs["BuildingName"];
        var CityID = this.refs["CityID"];
        var DistrictID = this.refs["DistrictID"];
        var WardID = this.refs["WardID"];
        var AddressType_Home = this.refs["AddressType_Home"];
        var AddressType_Office = this.refs["AddressType_Office"];

        var province = this.props.locations[CityID.value];
        var district = province.districts[DistrictID.value];

        var type = "Home";
        if (AddressType_Office.checked) 
            type = "Office";
        var user_id = this.props.user.id;
        return {
            fullname: ReceiverName.value,
            phone: Mobile.value,
            homeno: HouseNumber.value,
            street: StreetName.value,
            building: BuildingName.value,
            province: province.name,
            district: district,
            ward: WardID.value,
            type: type,
            user_id: user_id
        };
    }
    validateForm() {
        this.setState(this.initStateValidate());
        var ReceiverName = this.refs["ReceiverName"];
        var Mobile = this.refs["Mobile"];
        var HouseNumber = this.refs["HouseNumber"];
        var StreetName = this.refs["StreetName"];
        var BuildingName = this.refs["BuildingName"];
        var CityID = this.refs["CityID"];
        var DistrictID = this.refs["DistrictID"];
        var WardID = this.refs["WardID"];
        var AddressType_Home = this.refs["AddressType_Home"];
        var AddressType_Office = this.refs["AddressType_Office"];

        if (_.isEmpty(ReceiverName.value)) {
            this.setState({
                validateReceiverName: {
                    tagError: <Validate classCss="payment-validate-error" textError={ReceiverName.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        if (_.isEmpty(Mobile.value)) {
            this.setState({
                validateMobile: {
                    tagError: <Validate classCss="payment-validate-error" textError={Mobile.getAttribute("data-val-required")} />
                }
            });
            return;
        }
        var re = new RegExp(Mobile.getAttribute("data-val-regex-pattern"));
        var myArray = Mobile.value.match(re);
        if (_.isNull(myArray)) {
            this.setState({
                validateMobile: {
                    tagError: <Validate classCss="payment-validate-error" textError={Mobile.getAttribute("data-val-regex")} />
                }
            });
            return;
        }

        if (_.isEmpty(HouseNumber.value)) {
            this.setState({
                validateHouseNumber: {
                    tagError: <Validate classCss="payment-validate-error" textError={HouseNumber.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        if (_.isEmpty(StreetName.value)) {
            this.setState({
                validateStreetName: {
                    tagError: <Validate classCss="payment-validate-error" textError={StreetName.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        if (parseInt(CityID.value) ===0) {
            this.setState({
                validateCityID: {
                    tagError: <Validate classCss="payment-validate-error" textError={CityID.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        if (parseInt(DistrictID.value) ===0) {
            this.setState({
                validateDistrictID: {
                    tagError: <Validate classCss="payment-validate-error" textError={DistrictID.getAttribute("data-val-required")} />
                }
            });
            return;
        }

        if (_.isEmpty(WardID.value)) {
            this.setState({
                validateWardID: {
                    tagError: <Validate classCss="payment-validate-error" textError={WardID.getAttribute("data-val-required")} />
                }
            });
            return;
        }
    }
    renderCreate() {
        return (
            <div className="field_btn">
                {
                    this.state.saveLoading ? (
                            <button className="btn_primary btn_payment_form" type="button">
                                Loading...
                                <span className="arrow_W">
                                </span>
                            </button>
                        ) : (
                        <button className="btn_primary btn_payment_form" type="submit">
                            TIẾP TỤC
                            <span className="arrow_W">
                            </span>
                        </button>
                    )
                }
                <a className="link_register" onClick={this.onCancel.bind(this)}>
                    Quay lại
                </a>
            </div>
        );
    }
    renderUpdate() {
        return (
            <div className="field_btn">
                <button className="btn_primary btn_payment_form" type="submit">
                    LƯU CHỈNH SỬA
                    <span className="arrow_W">
                    </span>
                </button>
                <a className="link_register" onClick={this.onCancel.bind(this)}>
                    Chọn lại địa chỉ cũ
                </a>
            </div>
        );
    }
    renderCity(address) {
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
            <div className="form-group">
                <label htmlFor="CityID" className="field_L padding_bottom_5px padding_top_5px">
                    Tỉnh/ TP
                    <span className="other_color">
                        *
                    </span>
                </label>
                <select defaultValue={address.provinceID} onChange={this.onSelectCity.bind(this)} className="form-control text_form_control" data-val="true" data-val-number="The field CityID must be a number." data-val-required="Vui lòng nhập chọn tỉnh/tp" id="CityID" name="CityID" ref="CityID">
                    <option value="0">
                        Chọn Tỉnh / TP
                    </option>
                    {options}
                </select>
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
        var defaultValue = address.districtID;
        var selectCity = this.state.selectCity;
        var locations = this.props.locations;
        var options = [];
        if (selectCity===0) {
            // TODO 
        } else {
            if (selectCity !== address.provinceID) {
                defaultValue = 0;
            }
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
            <div className="form-group">
                <label htmlFor="DistrictID" className="field_L padding_bottom_5px padding_top_5px">
                    Quận/ Huyện
                    <span className="other_color">
                        *
                    </span>
                </label>
                <select defaultValue={defaultValue} className="form-control text_form_control" data-val="true" data-val-number="The field DistrictID must be a number." data-val-required="Vui lòng nhập chọn quận/huyện" id="DistrictID" name="DistrictID" ref="DistrictID">
                    <option value="0">
                        Chọn Quận / Huyện
                    </option>
                    {options}
                </select>
            </div>
        );
    }
    renderPage(address) {
        return (
            <div className="info_delivery">
                <form className="form" onSubmit={this.handlerSubmitForm.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="ReceiverName" className="field_L padding_bottom_5px padding_top_5px">
                            Họ và tên
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-required="Vui lòng nhập họ và tên" ref="ReceiverName" id="ReceiverName" maxlength="100" name="ReceiverName" type="text" defaultValue={address.fullname} />
                    </div>
                    {this.state.validateReceiverName.tagError}
                    <div className="form-group">
                        <label htmlFor="Mobile" className="field_L padding_bottom_5px padding_top_5px">
                            Điện thoại
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-regex="Không hợp lệ, vui lòng nhập đủ số di động" data-val-regex-pattern="09\d{8}|01\d{9}|0868\d{6}|088\d{7}|089\d{7}" data-val-required="Vui lòng nhập số điện thoại" ref="Mobile" id="Mobile" name="Mobile" type="text" defaultValue={address.phone} />
                    </div>
                    {this.state.validateMobile.tagError}
                    <div className="form-group">
                        <label htmlFor="HouseNumber" className="field_L padding_bottom_5px padding_top_5px">
                            Số nhà
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-length="Số nhà tối đa 50 ký tự" data-val-length-max="50" data-val-required="Vui lòng nhập số nhà" ref="HouseNumber" id="HouseNumber" name="HouseNumber" type="text" defaultValue={address.homeno} />
                    </div>
                    {this.state.validateHouseNumber.tagError}
                    <div className="form-group">
                        <label htmlFor="StreetName" className="field_L padding_bottom_5px padding_top_5px">
                            Đường/ Phố
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-required="Vui lòng nhập đường/phố" id="StreetName" ref="StreetName" name="StreetName" type="text" defaultValue={address.street} />
                    </div>
                    {this.state.validateStreetName.tagError}
                    <div className="form-group">
                        <label htmlFor="BuildingName" className="field_L padding_bottom_5px padding_top_5px">
                            Tòa nhà
                            <span className="other_color">
                            </span>
                        </label>
                        <input className="form-control text_form_control" id="BuildingName" ref="BuildingName" name="BuildingName" type="text" defaultValue={address.building} />
                    </div>
                    {this.state.validateBuildingName.tagError}
                    {this.renderCity(address)}
                    {this.state.validateCityID.tagError}
                    {this.renderDistrict(address)}
                    {this.state.validateDistrictID.tagError}
                    <div className="form-group">
                        <label htmlFor="WardID" className="field_L padding_bottom_5px padding_top_5px">
                            Phường/ Xã
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input data-val-required="Vui lòng nhập phường/xã" className="form-control text_form_control" id="WardID" ref="WardID" name="WardID" type="text" defaultValue={address.ward} />
                    </div>
                    {this.state.validateWardID.tagError}
                    <div className="form-group">
                        <label htmlFor="AddressType" className="field_L padding_top_5px">
                            Loại địa chỉ
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <div className="checkbox">
                            <label>
                                <input type="radio" defaultChecked={address.addressTypeHome} data-val="true" data-val-required="Vui lòng chọn loại địa chỉ" id="AddressType" name="AddressType" ref="AddressType_Home" defaultValue="Home"/> Nhà Riêng
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="radio" defaultChecked={address.addressTypeOffice} id="AddressType" name="AddressType" ref="AddressType_Office" defaultValue="Office" /> Nơi làm việc
                            </label>
                        </div>
                    </div>
                    {
                        this.props.formType === "create" ? this.renderCreate() : this.renderUpdate()
                    }
                </form>
            </div>
        );
    }
    render() {
        var formType = this.props.formType;
        var address = {};
        if (formType === "create") {
            address.provinceID = 0;
            address.districtID = 0;
            address.addressTypeHome = true;
            address.addressTypeOffice = false;
        } else {
            var chooseAddress = this.props.chooseAddress;
            address = this.props.listAddress[chooseAddress];

            var locations = this.props.locations;

            var province = _.findKey(locations, location => {
                return location.name === address.province;
            });
            if (province) {
                if (this.state.selectCity === 0) {
                    this.state.selectCity = parseInt(province);
                }
                address.provinceID = parseInt(province);
                var district = _.findKey(locations[province].districts, _district => {
                    return _district === address.district;
                });
                address.districtID = parseInt(district);
            } else {
                address.provinceID = 0;
                address.districtID = 0;
            }

            if (address.type === "Home") {
                address.addressTypeHome = true;
                address.addressTypeOffice = false;
            } else {
                address.addressTypeHome = false;
                address.addressTypeOffice = true;
            }
        }
        return this.renderPage(address);
    }
}