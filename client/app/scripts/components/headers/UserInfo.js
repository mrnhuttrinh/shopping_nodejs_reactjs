import React, {Component} from 'react';
import PopUp from './PopUp';
import { Router, Link, Navigation } from 'react-router';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogPopUp: null
        };
    }
    turnOffShowOnTop() {
        this.props.logOut();
        // window.location = "/";
        this.context.router.push("/" );
    }
    logOut(event) {
        event.preventDefault();
        this.setState({
            dialogPopUp: <PopUp cancelLogOut={this.cancelLogOut.bind(this)} show={true} turnOffShowOnTop={this.turnOffShowOnTop.bind(this)}/>
        });
    }
    cancelLogOut() {
        this.setState({
            dialogPopUp: null
        });
    }
    render() {
        var userInfo = this.props.userInfo;
        return (
            <li>
                {this.state.dialogPopUp}
                <Link to="/profile">
                    {userInfo.fullname}
                    <span className="ic_cm icon-arrow-d">
                        k
                    </span>
                </Link>
                <div className="hover_menu">
                    <ul className="list_hotline">
                        <li>
                            <Link to="/profile">
                                Tài khoản của bạn
                            </Link>
                        </li>
                        <li>
                            <Link to="/myorder">
                                Đơn hàng của bạn
                            </Link>
                        </li>
                        <li>
                            <Link to="/changepassword">
                                Đổi mật khẩu
                            </Link>
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
