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