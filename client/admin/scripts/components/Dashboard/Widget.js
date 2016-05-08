import React, {Component} from 'react'
import _ from 'lodash';
import apis from '../../apis/main';
import Constants from '../../constants';
import GridProduct from './GridProduct';
import DivLoading from '../DivLoading';
import {Link} from 'react-router'

export default class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadData: true,
            category: this.props.category,
            page: this.props.page
        }
    }
    shouldComponentUpdate (nextProps, nextState) {
        var nextPage = nextProps.page ? parseInt(nextProps.page) : 1;
        if (this.state.category !== nextProps.category
            || this.state.page !== nextPage) {
            var self = this;
            var page = nextProps.page;
            var type = nextProps.category;
            self.state.category = type;
            this.state.page = nextPage;
            var quantity = Constants.TOTAL_ROW;
            self.setState({
                loadData: true
            })
            apis.getListProduct(type, page, quantity, function(err, res) {
                if (err) {
                    self.props.getListProduct([]);
                    toastr.error("Tải Không Thành Công!");
                } else {
                    self.props.getListProduct(res.body.data);
                }
                self.setState({
                    loadData: false
                })
            })
            apis.getTotalProduct(type, function(err, res) {
                if (err) {
                    self.props.getTotalProduct(0);
                    toastr.error("Tải Không Thành Công!");
                } else {
                    self.props.getTotalProduct(res.body.data);
                }
            })
        }
        return true;
    }
    componentDidMount() {
        var self = this;
        var type = this.props.category;
        self.state.category = type;
        var page = this.props.page ? parseInt(this.props.page) : 1;
        self.state.page = page;
        var quantity = Constants.TOTAL_ROW;
        apis.getListProduct(type, page, quantity, function(err, res) {
            if (err) {
                self.props.getListProduct([]);
                self.setState({
                    loadData: false
                })
                toastr.error("Tải Không Thành Công!");
            } else {
                self.props.getListProduct(res.body.data);
                self.setState({
                    loadData: false
                })
            }
        })
        apis.getTotalProduct(type, function(err, res) {
            if (err) {
                self.props.getTotalProduct(0);
                toastr.error("Tải Không Thành Công!");
            } else {
                self.props.getTotalProduct(res.body.data);
            }
        })
    }
    onChooseTab(link, event) {
        event.preventDefault();
        var pathName = window.location.pathname;
        window.location = pathName + "#/dashboard/"+link;
    }
    render() {
        var self = this;
        var modalName = this.props.modalName;
        var category = this.props.category;
        var listTabHeader = _.map(this.props.menus, function(menu) {
            if (menu.level === 1) {
                var className = category === menu.link ? "active" : ""
                return (
                    <li key={menu.id} className={className}>
                        <a onClick={self.onChooseTab.bind(self,menu.link)} href={"#" + menu.link} aria-controls="dropdown2" aria-expanded="false" data-toggle="tab" id="dropdown2-tab" role="tab">
                            {menu.name}
                        </a>
                    </li>
                );
            }
        })
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li onClick={this.onChooseTab.bind(this,"home")} className={category === "home" ? "active classTabHome" : "classTabHome"} role="presentation">
                        <a href="#home" aria-controls="home" data-toggle="tab" role="tab">
                            Tất Cả
                        </a>
                    </li>
                    <li className="dropdown" role="presentation">
                        <a aria-controls="myTabDrop1-contents" aria-expanded="false" className="dropdown-toggle" data-toggle="dropdown" href="#" id="myTabDrop1">
                            Chọn Theo Loại
                            <span className="caret">
                            </span>
                        </a>
                        <ul aria-labelledby="myTabDrop1" className="dropdown-menu" id="myTabDrop1-contents">
                            {listTabHeader}
                        </ul>
                    </li>
                    <li className={category === "noactive" ? "active" : ""} role="presentation">
                        <a onClick={this.onChooseTab.bind(this, "noactive")} href="#home" aria-controls="home" data-toggle="tab" role="tab">
                            Sản Phẩm Không Buôn Bán
                        </a>
                    </li>
                    <li className="pull-right" role="presentation">
                        <button type="button" className="btn btn-success" data-target={"#" + modalName} data-toggle="modal">Thêm Mới</button>
                    </li>
                </ul>
                <div className="tab-content">
                    {
                        this.state.loadData ? (
                            <DivLoading />
                        ) : (
                            <GridProduct {...this.props} />
                        )
                    }
                </div>
            </div>
        );
    }
}