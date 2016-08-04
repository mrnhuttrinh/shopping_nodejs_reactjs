import React, {Component} from 'react';

export default class AddAddress extends Component {
    onCancel(event) {
        event.preventDefault();
        this.props.addAddressForm(false);
    }
    renderCreate() {
        return (
            <div className="field_btn">
                <button className="btn_primary btn_payment_form" type="submit">
                    TIẾP TỤC
                    <span className="arrow_W">
                    </span>
                </button>
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
    render() {
        return (
            <div className="info_delivery">
                <form>
                    <div className="form-group">
                        <label htmlFor="ReceiverName" className="field_L padding_bottom_5px padding_top_5px">
                            Họ và tên
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-required="Vui lòng nhập họ và tên" id="ReceiverName" maxlength="100" name="ReceiverName" type="text" defaultValue="Nguyễn Nhựt Trình" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Mobile" className="field_L padding_bottom_5px padding_top_5px">
                            Điện thoại
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-regex="Không hợp lệ, vui lòng nhập đủ số di động" data-val-regex-pattern="09\d{8}|01\d{9}|0868\d{6}|088\d{7}|089\d{7}" data-val-required="Vui lòng nhập số điện thoại" id="Mobile" name="Mobile" type="text" defaultValue="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="HouseNumber" className="field_L padding_bottom_5px padding_top_5px">
                            Số nhà
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-length="Số nhà tối đa 50 ký tự" data-val-length-max="50" data-val-required="Vui lòng nhập số nhà" id="HouseNumber" name="HouseNumber" type="text" defaultValue="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="StreetName" className="field_L padding_bottom_5px padding_top_5px">
                            Đường/ Phố
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <input className="form-control text_form_control" data-val="true" data-val-required="Vui lòng nhập đường/phố" id="StreetName" name="StreetName" type="text" defaultValue="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="BuildingName" className="field_L padding_bottom_5px padding_top_5px">
                            Tòa nhà
                            <span className="other_color">
                            </span>
                        </label>
                        <input className="form-control text_form_control" id="BuildingName" name="BuildingName" type="text" defaultValue="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="CityID" className="field_L padding_bottom_5px padding_top_5px">
                            Tỉnh/ TP
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <select className="form-control text_form_control" data-val="true" data-val-number="The field CityID must be a number." data-val-required="Vui lòng nhập chọn tỉnh/tp" id="CityID" name="CityID">
                            <option defaultValue="">
                                Chọn Tỉnh / TP
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="DistrictID" className="field_L padding_bottom_5px padding_top_5px">
                            Quận/ Huyện
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <select className="form-control text_form_control" data-val="true" data-val-number="The field DistrictID must be a number." data-val-required="Vui lòng nhập chọn quận/huyện" id="DistrictID" name="DistrictID">
                            <option defaultValue="">
                                Chọn Quận / Huyện
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="WardID" className="field_L padding_bottom_5px padding_top_5px">
                            Phường/ Xã
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <select className="form-control text_form_control" data-val="true" data-val-number="The field WardID must be a number." data-val-required="Vui lòng nhập chọn phường/xã" id="WardID" name="WardID">
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="AddressType" className="field_L padding_top_5px">
                            Loại địa chỉ
                            <span className="other_color">
                                *
                            </span>
                        </label>
                        <div className="checkbox">
                            <label>
                                <input type="radio" defaultChecked="checked" data-val="true" data-val-required="Vui lòng chọn loại địa chỉ" id="AddressType" name="AddressType" defaultValue="Home"/> Nhà Riêng
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="radio" id="AddressType" name="AddressType" defaultValue="Office" /> Nơi làm việc
                            </label>
                        </div>
                    </div>
                    {
                        this.props.formType === "create" ? this.renderCreate() : this.renderUpdate()
                    }
                </form>
            </div>
        )
    }
}