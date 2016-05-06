import React, {Component} from 'react'
import {Link} from 'react-router'

export default class LeftMenu extends Component{
    render() {
        var pathName = this.props.pathName;
        var user = this.props.user || {};
        return (
            <aside id="left-panel">
                <div className="login-info">
                    <Link to="/myprofile">
                        <img src={user.image} alt="me" className="online" />
                        <span>
                            {user.fullname || user.username}
                        </span>
                    </Link>
                </div>
                <nav>
                    <ul>

                        <li>
                          <Link to="/"><i className="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">Dashboard</span></Link>
                            <ul>
                                <li>
                                    <Link to="/">Normal Tables</Link>
                                </li>
                                <li>
                                    <Link to="/">Data Tables <span class="badge inbox-badge bg-color-greenLight">v1.10</span></Link>
                                </li>
                                <li>
                                    <Link to="/">Jquery Grid</Link>
                                </li>
                            </ul>
                        </li>
                         {
                            this.props.user.level === 1 || this.props.user.level === 2 ? (
                                <li className={pathName == "/listuser" ? "active" : ""}>
                                    <Link to="/listuser"><i className="fa fa-lg fa-fw fa-home"></i> <span className="menu-item-parent">Nhân Viên</span></Link>
                                </li>
                            ) : ("")
                        }
                        <li >
                            <Link to="/"><i className="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">Báo Cáo</span></Link>
                            <ul>
                                <li>
                                    <Link to="/"> Báo cáo bán hàng </Link>
                                    <ul>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Bán chạy nhất</Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Doanh số bán theo giờ</Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Doanh số bán theo ngày</Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Doanh số bán theo tháng</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/">Báo cáo công nợ</Link>
                                    <ul>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Tổng quan công nợ </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Theo dõi công nợ </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Công nợ nhà cung cấp </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Công nợ khách hàng </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/">Báo cáo danh số</Link>
                                    <ul>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Doanh số cửa hàng </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Doanh số theo nhân viên </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Doanh số theo khách hàng </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/">Báo cáo thu chi</Link>
                                    <ul>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Báo cáo thu </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Báo cáo chi </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Phương thức thanh toán </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/">Báo cáo kho</Link>
                                    <ul>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Báo cáo tồn kho </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Báo cáo giá trị hàng tồn </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Báo cáo xuất nhập hàng tồn </Link>
                                        </li>
                                        <li>
                                            <Link to="/"> <i className="fa fa-lg fa-fw fa-table"></i> Cảnh báo hàng tồn </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className={pathName == "/myprofile" ? "active" : ""}>
                            <Link to="/myprofile"><i className="fa fa-lg fa-fw fa-desktop"></i> <span className="menu-item-parent">My Profile</span></Link>
                        </li>
                        <li className={pathName == "/menu" ? "active" : ""}>
                            <Link to="/menu"><i className="fa fa-lg fa-fw fa-desktop"></i> <span className="menu-item-parent">Quản Lý Menu</span></Link>
                        </li>
                        <li className={pathName == "/news" ? "active" : ""}>
                            <Link to="/news"><i className="fa fa-lg fa-fw fa-inbox"></i> <span className="menu-item-parent">Tin Tức</span></Link>
                        </li>
                        <li className={pathName == "/trademark" ? "active" : ""}>
                            <Link to="/trademark"><i className="fa fa-lg fa-fw fa-inbox"></i> <span className="menu-item-parent">Thương Hiệu</span></Link>
                        </li>

                    </ul>
                </nav>
                <span className="minifyme" data-action="minifyMenu">
                    <i className="fa fa-arrow-circle-left hit"></i>
                </span>
            </aside>
        );
    }
}

