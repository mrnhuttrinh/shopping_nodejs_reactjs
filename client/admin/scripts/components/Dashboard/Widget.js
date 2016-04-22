import React, {Component} from 'react'
import _ from 'lodash';
import apis from '../../apis/main';
import Constants from '../../Constants';
import GridProduct from './GridProduct';
import DivLoading from '../DivLoading';

export default class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabChoose: "home",
            loadData: true
        }
    }

    chooseTab(tab, event) {
        event.preventDefault();
        var self = this;
        self.setState({
            loadData: true
        })
        var menu = _.find(self.props.menus, function(menu) {
            return menu.link === tab;
        });

        var type = "";
        if (menu) {
            type = menu.id;
        } else {
            if (tab === "home") {
                type = 0
            } else if (tab === "notactive") {
                type = -1
            }
        }

        var page = 1;
        var quantity = Constants.TOTAL_ROW;
        apis.getListProduct(type, page, quantity, function(err, res) {
            if (err) {

            } else {
                self.props.getListProduct(res.body.data, page);
                self.setState({
                    tabChoose: tab,
                    loadData: false
                });

            }
        })
        apis.getTotalProduct(type, function(err, res) {
            if (err) {

            } else {
                self.props.getTotalProduct(res.body.data);
            }
        })
    }
    componentDidMount() {
        var self = this;
        var type = 0;
        var page = this.props.page;
        var quantity = Constants.TOTAL_ROW;
        if (_.isNull(self.props.listProduct)  ||
            _.isEmpty(self.props.listProduct)) {
            apis.getListProduct(type, page, quantity, function(err, res) {
                if (err) {

                } else {
                    self.props.getListProduct(res.body.data, page);
                    self.setState({
                        loadData: false
                    })
                }
            })
            apis.getTotalProduct(type, function(err, res) {
                if (err) {

                } else {
                    self.props.getTotalProduct(res.body.data);
                }
            })
        } else {
            self.setState({
                loadData: false
            })
        }
    }

    render() {
        var self = this;
        var modalName = this.props.modalName;
        var listTabHeader = _.map(this.props.menus, function(menu) {
            if (menu.level === 1) {
                return (
                    <li key={menu.id} className="">
                        <a onClick={self.chooseTab.bind(self, menu.link)} aria-controls="dropdown2" aria-expanded="false" data-toggle="tab" href={"#" + menu.link} id="dropdown2-tab" role="tab">
                            {menu.name}
                        </a>
                    </li>
                );
            }
        })
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="active classTabHome" role="presentation">
                        <a onClick={this.chooseTab.bind(this, "home")} aria-controls="home" data-toggle="tab" href="#home" role="tab">
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
                    <li role="presentation">
                        <a onClick={this.chooseTab.bind(this, "notactive")} aria-controls="home" data-toggle="tab" href="#home" role="tab">
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
                            <GridProduct {...this.props} tabChoose={this.state.tabChoose} />
                        )
                    }
                </div>
            </div>
        );
    }
}