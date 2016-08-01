import React, {Component} from 'react';

export default class AddAddress extends Component {
    chooseOlderAddress(event) {
        event.preventDefault();
        this.props.addAddressForm(false);
    }
    render() {
        return (
            <div>
                <form novalidate="novalidate" id="form_add_address">
                    <div className="form form_pay">
                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Họ và tên
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <input data-val="true" data-val-required="Vui lòng nhập họ và tên" id="ReceiverName" maxlength="100" name="ReceiverName" type="text" defaultValue="Nguyễn Nhựt Trình" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Điện thoại
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <input data-val="true" data-val-regex="Không hợp lệ, vui lòng nhập đủ số di động" data-val-regex-pattern="09\d{8}|01\d{9}|0868\d{6}|088\d{7}|089\d{7}" data-val-required="Vui lòng nhập số điện thoại" id="Mobile" name="Mobile" type="text" defaultValue="" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Số nhà
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <input data-val="true" data-val-length="Số nhà tối đa 50 ký tự" data-val-length-max="50" data-val-required="Vui lòng nhập số nhà" id="HouseNumber" name="HouseNumber" type="text" defaultValue="" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Đường/ Phố
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <input data-val="true" data-val-required="Vui lòng nhập đường/phố" id="StreetName" name="StreetName" type="text" defaultValue="" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Tòa nhà
                                    <span className="other_color">
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <input id="BuildingName" name="BuildingName" type="text" defaultValue="" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Tỉnh/ TP
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <select data-val="true" data-val-number="The field CityID must be a number." data-val-required="Vui lòng nhập chọn tỉnh/tp" id="CityID" name="CityID">
                                    <option defaultValue="">
                                        Chọn Tỉnh / TP
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Quận/ Huyện
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <select data-val="true" data-val-number="The field DistrictID must be a number." data-val-required="Vui lòng nhập chọn quận/huyện" id="DistrictID" name="DistrictID">
                                    <option defaultValue="">
                                        Chọn Quận / Huyện
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Phường/ Xã
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <select data-val="true" data-val-number="The field WardID must be a number." data-val-required="Vui lòng nhập chọn phường/xã" id="WardID" name="WardID">
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <label>
                                    Loại địa chỉ
                                    <span className="other_color">
                                        *
                                    </span>
                                </label>
                            </div>
                            <div className="col-md-9">
                                <label className="field_R">
                                </label>
                                <label className="field_R">
                                </label>
                            </div>
                        </div>

                        <div className="field_btn">
                            <button className="btn_primary" id="btnSaveAddress" type="submit">
                                LƯU CHỈNH SỬA
                                <span className="arrow_W">
                                </span>
                            </button>
                            <a className="link_register" onClick={this.chooseOlderAddress.bind(this)} id="linkBackListAdddresses">
                                Chọn lại địa chỉ cũ
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}