import React, {Component} from 'react'
import _ from 'lodash';
import apis from '../../apis/main';
import apisTradeMark from '../../apis/trademark';
import Constants from '../../constants';
import GridProduct from './GridProduct';
import DivLoading from '../DivLoading';
import {Link} from 'react-router';
import Select from 'react-select';
import Pagination from '../Pagination';

export default class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadData: true,
            category: this.props.category,
            page: this.props.page,
            selectValue: null
        }
    }
    getData(data) {
        var self = this;
        apis.getListProduct(data, function(err, res) {
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
                });
            }
        });
        apis.getTotalProduct(data, function(err, res) {
            if (err) {
                self.props.getTotalProduct(0);
                toastr.error("Tải Không Thành Công!");
            } else {
                self.props.getTotalProduct(res.body.data);
            }
        });
    }
    shouldComponentUpdate (nextProps, nextState) {
        var self = this;
        var type = nextProps.category;
        var data = {
            quantity: Constants.TOTAL_ROW
        }
        if (type !== "trademark" && type !== "search") {
            var nextPage = nextProps.page ? parseInt(nextProps.page) : 1;
            if (self.state.category !== nextProps.category
                || self.state.page !== nextPage) {
                var page = nextProps.page;
                data.page = page;
                self.state.category = type;
                self.state.page = nextPage;
                self.setState({
                    loadData: true
                });
                data.type = self.state.category;
                self.getData(data);
            }
        } else {
            var nextPage = nextProps.params.search ? parseInt(nextProps.params.search) : 1;
            if (self.state.category !== nextProps.category
                || self.state.search !== nextProps.params.page
                || self.state.page !== nextPage) {
                var page = nextProps.params.search || 1;
                data.page = page;
                self.state.category = type;
                self.state.page = nextPage;
                self.state.search = nextProps.params.page;
                self.setState({
                    loadData: true
                });
                data.type = self.state.category;
                if (type === "trademark") {
                    var trademark_id = nextProps.page;
                    data.trademark_id = trademark_id;
                }
                if (type === "search") {
                    var search_value = nextProps.page;
                    data.search_value = search_value;
                }
                self.getData(data);
            }
        }
        return true;
    }
    componentDidMount() {
        var self = this;
        var type = this.props.category;
        var page;
        var data = {
            quantity: Constants.TOTAL_ROW,
            type: type
        };

        if (type !== "trademark" && type !== "search") {
            self.state.category = type;
            page = this.props.page ? parseInt(this.props.page) : 1;
        } else {
            if (type === "trademark") {
                var trademark_id = self.props.params.page;
                data.trademark_id = trademark_id;
                page = self.props.params.search || 1;
            }

            if (type === "search") {
                var search_value = self.props.params.page;
                data.search_value = search_value;
                page = self.props.params.search || 1;
            }
        }
        data.page = page;
        self.state.page = page;
        self.getData(data);
        apisTradeMark.getListTrademarkMini(function(err, res) {
            if (err) {
                toastr.error("Tải Không Thành Công!");
            } else {
                self.props.getListTradeMarkMini(res.body.data);
            }
        });
    }
    onChooseTab(link, event) {
        event.preventDefault();
        this.setState({
            selectValue: null
        });
        var pathName = window.location.pathname;
        window.location = pathName + "#/dashboard/"+link;
    }
    selectUpdateValue(newValue) {
        this.setState({
            selectValue: newValue
        });
        var pathName = window.location.pathname;
        if (Number.isInteger(newValue)) {
            this.props.getListProduct([]);
            this.props.getTotalProduct(0);
            window.location = pathName + "#/dashboard/trademark/" + newValue;
        } else {
            // window.location = pathName + "#/dashboard/home";
        }
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
        });
        var paginationContent;
        if (this.props.category !== "trademark" && this.props.category!== "search") {
            paginationContent = (<Pagination 
                page={this.props.page}
                href={"/dashboard/" + this.props.category}
                totalRow={this.props.dashboard.totalProduct} 
                rows={16} />);
        } else {
            var page = this.props.params.search || 1;
            paginationContent = (<Pagination 
                page={page}
                href={"/dashboard/" + this.props.category + "/" + this.props.page}
                totalRow={this.props.dashboard.totalProduct} 
                rows={16} />);
        }
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
                    <li role="presentation">
                        <form>
                            <div style={{"minWidth": "250px"}}>
                                <Select
                                    placeholder="Tìm Theo Nhà Cung Cấp"
                                    value={this.state.selectValue}
                                    onChange={this.selectUpdateValue.bind(this)}
                                    options={this.props.commons.trademarks}/>
                            </div>
                        </form>
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
                            <GridProduct {...this.props}>
                                {paginationContent}
                            </GridProduct>
                        )
                    }
                </div>
            </div>
        );
    }
}