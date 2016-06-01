import React, {Component} from 'react'
import _ from 'lodash';

export default class ShowMenu extends Component {
    liChooseCategory(_menu, event) {
        event.preventDefault();
        this.props.liChooseCategory(_menu, event);
    }
    expandChildrenCategory(event) {
        var self = this;
        event.preventDefault();
        var className = event.currentTarget.className;
        var ulNext = $(event.currentTarget).parent("li").next("li").children();
        if (className.indexOf("glyphicon-plus") !== -1) {
            event.currentTarget.className = "icon expand-icon glyphicon glyphicon-minus";
            ulNext.css({"display": "block"});
        } else {
            event.currentTarget.className = "icon expand-icon glyphicon glyphicon-plus";
            ulNext.css({"display": "none"});
        }
    }
    sortMenus(menus) {
        var self = this;
        var menuLevelThree = _.filter(menus, menu => {
            if (menu.level === 3) {
                var a_id = "popoverData_" + menu.id;
                menu.html = (
                    <li onClick={self.liChooseCategory.bind(self, menu)}
                        className=" li-dropdown list-group-item">
                        <a id={"link" + a_id} >{menu.name}</a>
                    </li>
                );
                var p = $('#link' + a_id).popover({
                    content: "<img style='height:295px; width: 1000px' src='" + menu.logo_image + "'/>", 
                    html: true, 
                    placement: "bottom",
                    trigger : 'hover'
                });
                p.on("show.bs.popover", function(e){
                    p.data("bs.popover").tip().css({"max-width": "1050px"});
                });
                return menu;
            }
        });

        var menuLevelTwo = _.filter(menus, menu => {
            if (menu.level === 2) {
                var html = [];
                _.map(menuLevelThree, ml3 => {
                    if (ml3.parent === menu.id) {
                        html.push(ml3.html);
                    }
                });
                var listMenuChildren = "";
                var icon = "";
                if (html.length) {
                    icon = (<span onClick={self.expandChildrenCategory.bind(self)} className="icon expand-icon glyphicon glyphicon-minus"></span>);
                    listMenuChildren = (
                        <li className="li-parent-ul list-group-item">
                            <ul key={"ul_menu_level2_" + menu.id} className="list-group ul-children-li-category">
                                {html}
                            </ul>
                        </li>
                    )
                }
                var a_id = "popoverData_" + menu.id;
                menu.html = (
                    <div>
                        <li onClick={self.liChooseCategory.bind(self, menu)}
                            className=" li-dropdown list-group-item">
                            {icon} <a id={"link" + a_id}>{menu.name}</a>
                        </li>
                        {listMenuChildren}
                    </div>
                );
                var p = $('#link' + a_id).popover({
                    content: "<img style='height:295px; width: 1000px' src='" + menu.logo_image + "'/>", 
                    html: true, 
                    placement: "bottom",
                    trigger : 'hover'
                });
                p.on("show.bs.popover", function(e){
                    p.data("bs.popover").tip().css({"max-width": "1050px"});
                });
                return menu;
            }
        });

        var menuLevelOne = _.filter(menus, menu => {
            if (menu.level === 1 && menu.id !== 1) {
                var html = [];
                _.map(menuLevelTwo, ml2 => {
                    if (ml2.parent === menu.id) {
                        html.push(ml2.html);
                    }
                });
                var listMenuChildren = "";
                var icon = "";
                if (html.length) {
                    icon = (<span onClick={self.expandChildrenCategory.bind(self)} className="icon expand-icon glyphicon glyphicon-minus"></span>);
                    listMenuChildren = (
                        <li className="li-parent-ul list-group-item">
                            <ul className="list-group ul-children-li" style={{"display": "block"}}>
                                {html}
                            </ul>
                        </li>
                    )
                }
                var a_id = "popoverData_" + menu.id;
                menu.html = (
                    <div>
                        <li onClick={self.liChooseCategory.bind(self, menu)}
                            className=" li-dropdown list-group-item">
                            {icon} <a id={"link" + a_id}>{menu.name}</a>
                        </li>
                        {listMenuChildren}
                    </div>
                );
                var p = $('#link' + a_id).popover({
                    content: "<img style='height:295px; width: 1000px' src='" + menu.logo_image + "'/>", 
                    html: true, 
                    placement: "bottom",
                    trigger : 'hover'
                });
                p.on("show.bs.popover", function(e){
                    p.data("bs.popover").tip().css({"max-width": "1050px"});
                });
                return menu;
            }
        });
        return menuLevelOne;
    }
    render() {
        var listChoose = this.sortMenus(this.props.menus);
        var html = _.map(listChoose, (list) => {
            return list.html;
        })
        return (
            <ul ref={this.props.name} className="list-group ul-list-dropdown-category">
                {html}
            </ul>
        )
    }
}
