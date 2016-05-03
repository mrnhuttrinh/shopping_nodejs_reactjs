import React, {Component} from 'react'
import Table from '../Table';
import _ from 'lodash';
import apis from '../../apis/news';
import ViewNews from './ViewNews'
import DeleteNews from './DeleteNews';
import DivLoading from '../DivLoading';

export default class ListNews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            deleteNews: {},
            loadingData: true,
            openDialog: {}
        }
    }
    componentWillReceiveProps (nextProps) {
        var self = this;
        var oldPage = self.props.page;
        var page = nextProps.page;
        if (page !== oldPage) {
            self.setState({
                loadingData: !self.state.loadingData
            })
            apis.getListNews(page, function(err, result) {
                if (err) {
                    toastr.error("Tải Không Thành Công")
                } else {
                    self.props.getListNews(result.body.data, "list")
                    self.setState({
                        loadingData: !self.state.loadingData
                    })
                }
            })
        }
    }
    componentDidMount() {
        var self = this;
        var page = self.props.page;
        if (!self.props.news.listNews.length) {
            apis.getListNews(page, function(err, result) {
                if (err) {
                    toastr.error("Tải Không Thành Công")
                } else {
                    self.props.getListNews(result.body.data, "list")
                    self.setState({
                        loadingData: !self.state.loadingData
                    })
                }
            })
        } else {
            self.setState({
                loadingData: !self.state.loadingData
            })
        }
    }
    deleteNews(_news, event) {
        event.preventDefault()
        this.setState({
            deleteNews: _news
        })
    }
    onChangeShowOnTop(_news, event) {
        event.preventDefault();
        var self = this;
        var inputElement = event.currentTarget;
        var show_on_top = !_news.show_on_top;
        apis.changeStatusShowOnTop({
            id: _news.id,
            show_on_top: show_on_top
        }, function(err, res) {
            if (err) {
                toastr.error("Đổi Trạng Thái Không Thành Công!")
            } else {
                if (show_on_top) {
                    _.forEach(self.props.news.listNews, function(_ne) {
                        _ne.show_on_top = false;
                    })
                    var groupShowOnTop = $(".group_show_on_top");
                    var groupLength = groupShowOnTop.length;
                    for(var i = 0; i<groupLength; i++) {
                        groupShowOnTop[i].checked = false;
                    }
                }
                var newShowOnTop = _.find(self.props.news.listNews, function(_ne) {
                    return _ne.id === _news.id;
                })
                inputElement.checked = !inputElement.checked;
                newShowOnTop.show_on_top = show_on_top;
                self.props.getAllUser(self.props.news.listNews, "list")
                toastr.success("Đổi Trạng Thái Thành Công!")
            }
        })
    }
    openDialog(id, event) {
        event.preventDefault();
        var newState = {
            id: id
        };
        this.setState({
            openDialog: newState
        })
    }
    render() {
        if (this.state.loadingData) {
            return (
                <DivLoading />
            )
        } else {
            var self = this;
            var head= [
                {
                    name: "number",
                    text: "No."
                }, {
                    name: "title",
                    text: "Tiêu Đề"
                }, {
                    name: "show_on_top_view",
                    text: "Hiển Thị Khi Vào Trang"
                }, {
                    name: "view",
                    text: ""
                }, {
                    name: "delete_row",
                    text: ""
                }
            ];
            var indexNo = 0;
            var rows = this.props.news.listNews;
            _.forEach(rows, function(row) {
                row.number = ++indexNo;
                row.view = (
                    <button onClick={self.openDialog.bind(self, row.id)} data-target="#viewNewsModal" data-toggle="modal" className="btn btn-primary btn-xs">
                        Hiển Thị
                    </button>
                );
                row.delete_row = (
                    <button onClick={self.deleteNews.bind(self, row)} data-target="#deleteNewsModal" data-toggle="modal" className="btn btn-danger btn-xs">
                        Xóa Bài Viết
                    </button>
                );
                row.show_on_top_view = (
                    <form className="smart-form">
                        <label className="toggle">
                            <input className="group_show_on_top" ref="inputShowOnTop" onChange={self.onChangeShowOnTop.bind(self, row)} type="checkbox" name="checkbox-toggle" defaultChecked={row.show_on_top ? "checked" : "" } />
                            <i data-swchon-text="ON" data-swchoff-text="OFF"></i> {
                                row.show_on_top ? (
                                    <button className="btn btn-info btn-xs" type="button">
                                        Hiển Thị Trang Chính
                                    </button>
                                ) : ""
                            }
                        </label>
                    </form>
                )
            })
            return (
                <div>
                    <Table 
                        head={head}
                        rows={rows}/>
                    <ViewNews openDialog={this.state.openDialog} />
                    <DeleteNews {...this.props} deleteNews = {this.state.deleteNews}/>
                </div>
            )
        }
    }
}