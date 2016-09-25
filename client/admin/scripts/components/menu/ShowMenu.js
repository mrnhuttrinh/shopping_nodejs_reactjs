import React, {Component} from 'react'
import _ from 'lodash';

export default class ShowMenu extends Component {
    liChooseCategory(_menu, event) {
        event.preventDefault();
        this.props.liChooseCategory(_menu, event);
    }
    sortMenus(menus) {
        var self = this;
        var menuLevelOne = _.filter(menus, menu => {
            if (menu.level === 1) {
                var a_id = "popoverData_" + menu.id;
                menu.html = (
                    <div>
                        <li key={"menu_level1_" + menu.id} onClick={self.liChooseCategory.bind(self, menu)}
                            className=" li-dropdown list-group-item">
                            <a id={"link_show_thumbnail_" + a_id}>{menu.name}</a>
                        </li>
                    </div>
                );
                var p = $('#link_show_thumbnail_' + a_id).popover({
                    content: "<img style='height:387px; width: 745px' src='" + menu.thumbnail + "'/>", 
                    html: true, 
                    placement: "bottom",
                    trigger : 'hover'
                });
                p.on("show.bs.popover", function(e){
                    p.data("bs.popover").tip().css({"max-width": "800px"});
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
