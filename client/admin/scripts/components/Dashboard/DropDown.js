import React, {Component} from 'react'
import _ from 'lodash';
export default class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownCategory: false,
            chooseCategory: this.props.chooseCategory
        }
    }
    expandCategory(event) {
        var self = this;
        event.preventDefault();
        this.setState({
            dropdownCategory: !this.state.dropdownCategory
        });
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
    liChooseCategory(menu, event) {
        event.preventDefault();
        this.setState({
            dropdownCategory: !this.state.dropdownCategory,
            chooseCategory: menu.name
        });
        this.props.updateProductCategory(menu);
    }
    sortMenus(menus) {
        var self = this;
        var menuLevelThree = _.filter(menus, menu => {
            if (menu.level === 3) {
                menu.html = (
                    <li className="li-dropdown list-group-item">
                        <a onClick={self.liChooseCategory.bind(self, menu)}>{menu.name}</a>
                    </li>
                );
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
                    icon = (<span onClick={self.expandChildrenCategory.bind(self)} className="icon expand-icon glyphicon glyphicon-plus"></span>);
                    listMenuChildren = (
                        <li className="li-parent-ul list-group-item">
                            <ul className="list-group ul-children-li">
                                {html}
                            </ul>
                        </li>
                    )
                }
                menu.html = (
                    <div>
                        <li className="li-dropdown list-group-item">
                            {icon} <a onClick={self.liChooseCategory.bind(self, menu)}>{menu.name}</a>
                        </li>
                        {listMenuChildren}
                    </div>
                );
                return menu;
            }
        });

        var menuLevelOne = _.filter(menus, menu => {
            if (menu.level === 1 && menu.id !== 1 && menu.id !== 2) {
                var html = [];
                _.map(menuLevelTwo, ml2 => {
                    if (ml2.parent === menu.id) {
                        html.push(ml2.html);
                    }
                });
                var listMenuChildren = "";
                var icon = "";
                if (html.length) {
                    icon = (<span onClick={self.expandChildrenCategory.bind(self)} className="icon expand-icon glyphicon glyphicon-plus"></span>);
                    listMenuChildren = (
                        <li className="li-parent-ul list-group-item">
                            <ul className="list-group ul-children-li">
                                {html}
                            </ul>
                        </li>
                    )
                }
                menu.html = (
                    <div>
                        <li className="li-dropdown list-group-item">
                            {icon} <a onClick={self.liChooseCategory.bind(self, menu)}>{menu.name}</a>
                        </li>
                        {listMenuChildren}
                    </div>
                );
                return menu;
            }
        });
        return menuLevelOne;
    }

    render() {
        var self = this;
        var dropdownContent = this.state.dropdownCategory ? "block" : "none";
        var listChoose = this.sortMenus(this.props.menus);
        var html = _.map(listChoose, (list) => {
            return list.html;
        })
        return (
            <div id="dropdownCategory" className="dropdown">
                <button onClick={this.expandCategory.bind(this)}
                    style={{"width": "100%"}} 
                    aria-expanded="true" aria-haspopup="true" 
                    className="btn btn-default dropdown-toggle" 
                    id="dropdownMenu1" type="button">
                        {this.state.chooseCategory}
                    <span className="caret pull-right" style={{"marginTop": "10px"}}>
                    </span>
                </button>
                <ul className="list-group ul-list-dropdown" 
                    style={{"display": dropdownContent}}>
                    {html}
                </ul>
            </div>
        );
    }
}