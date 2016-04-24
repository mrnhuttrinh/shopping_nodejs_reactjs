import React, {Component} from 'react'
import _ from 'lodash';
import apis from '../../apis/main'
import Loading from '../ButtonLoading';

export default class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSelected: [],
            saveUpdate: false,
            product: _.cloneDeep(this.props.product),
            menus: _.cloneDeep(this.props.menus)
        }
    }
    liChooseCategory(menu, event) {
        event.preventDefault();
        var self = this;
        var liParent = $(event.currentTarget).parent("li");
        if (liParent.hasClass("list-group-item-success")) {
            liParent.removeClass("list-group-item-success");
            _.remove(self.state.listSelected, (selected) => {
                return selected === menu.id;
            })
        } else {
            liParent.addClass("list-group-item-success");
            self.state.listSelected.push(menu.id);
        }
    }
    checkSelect(categoriesSelected, id) {
        var hasSelected = _.find(categoriesSelected, (cate) => {
            return cate.category_id === id;
        })
        var classSuccess = "";
        if (hasSelected) {
            classSuccess = "list-group-item-success default-check"
        }
        return classSuccess;
    }
    saveChooseCategory(event) {
        event.preventDefault();
        var self = this;
        if (self.state.listSelected.length) {
            self.setState({
                saveUpdate: true
            })
            apis.updateProduct(
                self.props.product.id,
                "category",
                self.state.listSelected,
                function(err, res) {
                    if (err) {
                        toastr.error("Cập Nhật Không Thành Công")
                    } else {
                        //self.props.getProduct({});
                        apis.getProduct(self.props.product.id, function(err, res) {
                            if (err) {
                            } else {
                                self.props.getProduct(res.body.data);
                            }
                        })
                        toastr.success("Cập Nhật Thành Công")
                        $(self.refs["cancelUpdateCategory"]).click();
                        self.setState({
                            product: _.cloneDeep(self.props.product),
                            menus: _.cloneDeep(self.props.menus),
                            listSelected: [],
                            saveUpdate: false
                        })
                    }
                    self.setState({
                        saveUpdate: false
                    })
                }
            )
        } else {
            toastr.error("Chưa Chọn Loại Sản Phẩm")
        }
        
    }
    sortMenus(menus, categoriesSelected) {
        var self = this;
        var menuLevelThree = _.filter(menus, menu => {
            if (menu.level === 3) {
                var classSuccess = self.checkSelect(categoriesSelected, menu.id);
                menu.html = (
                    <li className={classSuccess + " li-dropdown list-group-item"}>
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
                    icon = (<span className="icon expand-icon glyphicon glyphicon-minus"></span>);
                    listMenuChildren = (
                        <li className="li-parent-ul list-group-item">
                            <ul className="list-group ul-children-li-category">
                                {html}
                            </ul>
                        </li>
                    )
                }

                var classSuccess = self.checkSelect(categoriesSelected, menu.id);
                menu.html = (
                    <div>
                        <li className={classSuccess + " li-dropdown list-group-item"}>
                            {icon} <a onClick={self.liChooseCategory.bind(self, menu)}>{menu.name}</a>
                        </li>
                        {listMenuChildren}
                    </div>
                );
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
                    icon = (<span className="icon expand-icon glyphicon glyphicon-minus"></span>);
                    listMenuChildren = (
                        <li className="li-parent-ul list-group-item">
                            <ul className="list-group ul-children-li" style={{"display": "block"}}>
                                {html}
                            </ul>
                        </li>
                    )
                }
                var classSuccess = self.checkSelect(categoriesSelected, menu.id);
                menu.html = (
                    <div>
                        <li className={classSuccess + " li-dropdown list-group-item"}>
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
    componentWillReceiveProps (nextProps) {
        this.setState({
            product: _.cloneDeep(nextProps.product),
            menus: _.cloneDeep(nextProps.menus)
        })
    }
    cancelUpdateSize(event) {
        event.preventDefault();
        this.setState({
            product: _.cloneDeep(this.props.product),
            menus: _.cloneDeep(this.props.menus),
            listSelected: []
        })
        $(".li-dropdown.list-group-item-success").removeClass("list-group-item-success");
        $(".default-check").addClass("list-group-item-success");
    }
    render() {
        var self = this;
        var categoriesSelected = this.state.product.categories;
        self.state.listSelected = _.map(categoriesSelected, (cate) => {
            return cate.category_id
        });
        var listChoose = this.sortMenus(this.state.menus, categoriesSelected);
        var html = _.map(listChoose, (list) => {
            return list.html;
        })
        return (
            <div className="pull-right">
                <button type="button" data-target="#categoryModal" data-toggle="modal" className="btn btn-default btn-xs pull-right">
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                </button>
                <div className="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                    <span aria-hidden="true">
                                        ×
                                    </span>
                                </button>
                                <h4 className="modal-title">
                                    Thay Đổi Loại Sản Phẩm
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div id="dropdownCategory" className="inline-modal dropdown scroll-customize">
                                    <ul className="list-group ul-list-dropdown-category">
                                        {html}
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.cancelUpdateSize.bind(this)} ref="cancelUpdateCategory" className="btn btn-default" data-dismiss="modal" type="button">
                                    Hủy
                                </button>
                                {
                                    this.state.saveUpdate ? (
                                        <Loading />
                                    ) : (
                                        <button onClick={this.saveChooseCategory.bind(this)} className="btn btn-primary" type="button">
                                            Lưu
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}