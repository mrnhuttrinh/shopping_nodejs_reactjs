import React, {Component} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

export default class BreadCrumb2 extends Component {
    getBreadCrumb(menu, ret) {
        if (menu.parent) {
            var props = this.props;
            var parentMenu = _.find(props.menus, (_menu) => {
                return _menu.id === menu.parent;
            });
            ret.push(parentMenu);
            this.getBreadCrumb(parentMenu, ret);
        }
        return ret;
    }
    getMenuInList() {
        var props = this.props;
        var categories = props.product.categories;
        categories = categories.sort((prev, next) => {
            return prev.category_id - next.category_id;
        });
        return categories[categories.length - 1];
    }
    render() {
        var props = this.props;
        var style = {
            height: "152px"
        };
        var category = this.getMenuInList();
        var currentMenu = _.find(props.menus, (menu) => {
            return menu.id === category.category_id;
        });

        var childBC = null;
        if (currentMenu) {
            var arrayBC = this.getBreadCrumb(currentMenu, [currentMenu]);
            arrayBC = arrayBC.reverse();
            childBC = _.map(arrayBC, (_arr) => {
                return <li key={"li_breadcrumb_" + _arr.id}><Link to={"/category/" + _arr.link}>{_arr.name}</Link></li>
            });
        }
        return (
            <div className="container">
                <ul className="breadcrumb_B">
                    <li key={"li_breadcrumb_index"}><Link to="/"><span className="ic_cm icon-home">c</span></Link></li>
                    {childBC}
                </ul>
            </div>
        );
    }
}
