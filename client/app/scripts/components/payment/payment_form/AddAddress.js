import React, {Component} from 'react';

export default class AddAddress extends Component {
    render() {
        return (
            <div>
                <form novalidate="novalidate">
                    <div className="form form_pay">
                        <div className="field">
                            <label className="field_L">
                                Họ và tên
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input data-val="true" data-val-required="Vui lòng nhập họ và tên" id="ReceiverName" maxlength="100" name="ReceiverName" type="text" defaultValue="Nguyễn Nhựt Trình" />
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="ReceiverName" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Điện thoại
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input data-val="true" data-val-regex="Không hợp lệ, vui lòng nhập đủ số di động" data-val-regex-pattern="09\d{8}|01\d{9}|0868\d{6}|088\d{7}|089\d{7}" data-val-required="Vui lòng nhập số điện thoại" id="Mobile" name="Mobile" type="text" defaultValue="" />
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="Mobile" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Số nhà
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input data-val="true" data-val-length="Số nhà tối đa 50 ký tự" data-val-length-max="50" data-val-required="Vui lòng nhập số nhà" id="HouseNumber" name="HouseNumber" type="text" defaultValue="" />
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="HouseNumber" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Đường/ Phố
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <input data-val="true" data-val-required="Vui lòng nhập đường/phố" id="StreetName" name="StreetName" type="text" defaultValue="" />
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="StreetName" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Tòa nhà
                                <span className="other_color">
                                </span>
                            </label>
                            <input id="BuildingName" name="BuildingName" type="text" defaultValue="" />
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Tỉnh/ TP
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <select data-val="true" data-val-number="The field CityID must be a number." data-val-required="Vui lòng nhập chọn tỉnh/tp" id="CityID" name="CityID">
                                <option defaultValue="">
                                    Chọn Tỉnh / TP
                                </option>
                            </select>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="CityID" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Quận/ Huyện
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <select data-val="true" data-val-number="The field DistrictID must be a number." data-val-required="Vui lòng nhập chọn quận/huyện" id="DistrictID" name="DistrictID">
                                <option defaultValue="">
                                    Chọn Quận / Huyện
                                </option>
                            </select>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="DistrictID" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Phường/ Xã
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <select data-val="true" data-val-number="The field WardID must be a number." data-val-required="Vui lòng nhập chọn phường/xã" id="WardID" name="WardID">
                            </select>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="WardID" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field">
                            <label className="field_L">
                                Loại địa chỉ
                                <span className="other_color">
                                    *
                                </span>
                            </label>
                            <label className="field_R">
                            </label>
                            <label className="field_R">
                            </label>
                        </div>
                        <div className="err">
                            <span className="field-validation-valid" data-valmsg-for="AddressType" data-valmsg-replace="true">
                            </span>
                        </div>
                        <div className="field_btn">
                            <button className="btn_primary" id="btnCreateNewAddress" type="submit">
                                TIẾP TỤC
                                <span className="arrow_W">
                                </span>
                            </button>
                            <button className="btn_primary" id="btnSaveAddress" type="submit">
                                LƯU CHỈNH SỬA
                                <span className="arrow_W">
                                </span>
                            </button>
                            <a className="link_register" href="javascript:;" id="linkBackListAdddresses">
                                Chọn lại địa chỉ cũ
                            </a>
                            <a className="link_register" href="javascript:;" id="linkComeBack">
                                Quay lại
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}