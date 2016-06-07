import React, {Component} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

export default class BreadCrumb extends Component {
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
    render() {
        var props = this.props;
        var style = {
            height: "152px"
        };
        var currentHash = props.params.category_link;
        var currentMenu = _.find(props.menus, (menu) => {
            return menu.link === currentHash;
        });

        var childBC = null;
        if (currentMenu) {
            var arrayBC = this.getBreadCrumb(currentMenu, [currentMenu]);
            arrayBC = arrayBC.reverse();
            childBC = _.map(arrayBC, (_arr) => {
                return <li><Link to={"/category/" + _arr.link}>{_arr.name}</Link></li>
            });
        }

        return (
            <div className="inside_banner">
                <div className="container inside_co" style={style}>
                    <ul className="breadcrumb">
                        <li><Link to="/"><span className="ic_cm icon-home">c</span></Link></li>
                        {childBC}
                    </ul>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
