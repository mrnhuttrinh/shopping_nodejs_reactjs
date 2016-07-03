import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Agent extends Component {
    render() {
        return (
            <div>
                <nav className="mainmenu">
                    <h4>Áo Thun Phong Cách<span className="ic_cm icon-menu">A</span></h4>
                    <ul>
                        <li>
                            <a className="link_premium" href="/#">
                                Trang Chủ
                                <span className="ic_cm icon-card">c</span>
                            </a>
                        </li>
                        <li>
                            <a className="link_premium" href="/#">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a className="link_premium" href="/#">
                                Tuyển Đại Lý
                            </a>
                        </li>
                        <li>
                            <a className="link_premium" href="/#">
                                Hướng Dẫn Đặt Hàng
                            </a>
                        </li>
                        <li>
                            <a className="link_premium" href="/#">
                                Bảng Giá Sỉ
                            </a>
                        </li>
                        <li>
                            <a className="link_premium" href="/#">
                                Liên Hệ
                            </a>
                        </li>
                        <li>
                            <Link className="link_premium" to="/news">
                                Tin Tức
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
