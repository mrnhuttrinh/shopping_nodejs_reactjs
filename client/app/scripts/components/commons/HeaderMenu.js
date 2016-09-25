import React, {Component} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

export default class HeaderMenu extends Component {
    sortMenus(menus) {
        var menuLevelThree = _.filter(menus, menu => {
            if (menu.level === 3) {
                menu.html = (
                    <li key={"menu_" + menu.id}>
                        <Link to={"/category/" + menu.link}>{menu.name}</Link>
                    </li>
                );
                return menu;
            }
        });

        var menuLevelTwo = _.filter(menus, menu => {
            if (menu.level === 2) {
                var html = [];
                html.push(
                    <li key={"menu_" + menu.id} className="bold">
                        <Link to={"/category/" + menu.link}>{menu.name}</Link>
                    </li>
                );
                _.map(menuLevelThree, ml3 => {
                    if (ml3.parent === menu.id) {
                        html.push(ml3.html);
                    }
                });
                menu.html = html;
                return menu;
            }
        });

        var menuLevelOne = _.filter(menus, menu => {
            if (menu.level === 1) {
                var html = [];
                _.map(menuLevelTwo, ml2 => {
                    if (ml2.parent === menu.id) {
                        html.push(ml2.html);
                    }
                });

                var TwoLevelHtml;
                var TwoLevelHtmlHidden;
                // if have child menu
                if (html.length) {
                    TwoLevelHtml = (
                        <div className="menu_ver_hover">
                            <ul className="menu_ver_item">
                                {html}
                            </ul>
                            {
                                menu.thumbnail ? (
                                    <a style={{
                                        position: "absolute",
                                        border: "0px",
                                        right: "0px",
                                        bottom: "0px"
                                    }} href={"#/category/" + menu.link}>
                                        <img style={{
                                                maxWidth: "450px",
                                                maxHeight: "450px",
                                                margin: "0px"
                                            }} src={"/admin/" + menu.thumbnail} />
                                    </a>
                                ) : null
                            }
                            
                        </div>
                    );
                    TwoLevelHtmlHidden = (
                        <ul className="menu_cate_hidden">
                            {html}
                        </ul>
                    );
                } else {
                    var style = {
                        WebkitFilter: "blur(1px)",
                        filter: "blur(1px)",
                        overflow: "hidden"
                    };
                    var imageString = menu.thumbnail ? "/admin/" + menu.thumbnail : "../images/background_menu.jpg";
                    TwoLevelHtml = (
                        <div style={style} className="menu_ver_hover">
                            <a href={"#/category/" + menu.link}>
                                <img src={imageString} />
                            </a>
                        </div>
                    );
                }
                menu.html = (
                    <li key={"menu_" + menu.id}>
                        <Link to={"/category/" + menu.link}>
                            <span className={"ic_cm " + menu.icon}>
                                {menu.char}
                            </span>
                            {menu.name}
                            <span className="ic_cm icon_arr">
                                K
                            </span>
                        </Link>
                        {TwoLevelHtml}
                        {TwoLevelHtmlHidden}
                    </li>
                );
                return menu;
            }
        });
        return menuLevelOne;
    }
    render() {
        var menus = this.sortMenus(this.props.menus);
        var html = _.map(menus, (menu) => {
            return menu.html;
        })
        return (
            <ul className="menu_ver"> 
                {html}
            </ul>
        );
    }
}
