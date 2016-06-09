import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Title extends Component {
    render() {
        var props = this.props;
        var currentMenu = props.currentMenu || {};
        var sort = props.params.sort || "hottest";
        return (
            <div className="title_deal">
                <div className="title_deal_text">
                    {currentMenu.name}
                    <span className="ic_cm">
                        T
                    </span>
                    <span className="colortext">
                        {props.total}
                    </span>
                    Sản Phẩm
                </div>
                <ul className="title_menu">
                    <li>
                        <Link className={sort === "newest" ? "actived" : ""} to={"/category/" + currentMenu.link + "/newest"} id="newest">
                            <span className="ic_cm ic_check">
                                r
                            </span>
                            MỚI NHẤT
                        </Link>
                    </li>
                    <li>
                        <Link className={sort === "hottest" ? "actived" : ""} to={"/category/" + currentMenu.link + "/hottest"} id="best_seller">
                            <span className="ic_cm ic_check">
                                r
                            </span>
                            ĐANG HOT
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

