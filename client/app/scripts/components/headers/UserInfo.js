import React, {Component} from 'react';
import PopUp from './PopUp';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogPopUp: null
        };
    }
    turnOffShowOnTop() {
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
                <a href="/#/profile">
                    {userInfo.fullname}
                    <span className="ic_cm icon-arrow-d">
                        k
                    </span>
                </a>
                <div className="hover_menu">
                    <ul className="list_hotline">
                        <li>
                            <a href="/#/profile">
                                Tài khoản của bạn
                            </a>
                        </li>
                        <li>
                            <a href="/#/myorder">
                                Đơn hàng của bạn
                            </a>
                        </li>
                        <li>
                            <a href="/#/changepassword">
                                Đổi mật khẩu
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