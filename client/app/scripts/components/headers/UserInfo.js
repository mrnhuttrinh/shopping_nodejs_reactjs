import React, {Component} from 'react';
import localItem from '../../utils/localItem';
import PopUp from './PopUp';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogPopUp: null
        };
    }
    turnOffShowOnTop() {
        localItem.removeItem("user");
        this.props.logOut();
    }
    logOut(event) {
        event.preventDefault();
        this.setState({
            dialogPopUp: <PopUp show={true} turnOffShowOnTop={this.turnOffShowOnTop.bind(this)}/>
        });
    }
    render() {
        var userInfo = this.props.userInfo;
        return (
            <li>
                {this.state.dialogPopUp}
                <a href="/thong-tin-tai-khoan">
                    {userInfo.fullname}
                    <span className="ic_cm icon-arrow-d">
                        k
                    </span>
                </a>
                <div className="hover_menu">
                    <ul className="list_hotline">
                        <li>
                            <a href="/thong-tin-tai-khoan">
                                Tài khoản của bạn
                            </a>
                        </li>
                        <li>
                            <a href="/don-hang">
                                Đơn hàng của bạn
                            </a>
                        </li>
                        <li>
                            <a href="/tien-thuong">
                                Tiền trong tài khoản
                            </a>
                        </li>
                        <li>
                            <a href="/doi-mat-khau">
                                Đổi mật khẩu
                            </a>
                        </li>
                        <li>
                            <a href="/thong-tin-diem-thuong">
                                Tài khoản thẻ Premium
                            </a>
                        </li>
                        <li>
                            <a href="/voucher-dien-tu">
                                Quản lý voucher điện tử
                            </a>
                        </li>
                        <li className="btn full_width">
                            <button className="btn_brand1" onClick={this.logOut.bind(this)}>
                                ĐĂNG XUẤT
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
        );
    }
}