import React, {Component} from 'react'
import Table from '../Table';
import _ from 'lodash'

export default class ListTM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: true
        }
    }
    componentDidMount() {
        var self = this;
        if (!self.props.trademades) {
            apis.getListTradeMark(page, function(err, result) {
                if (err) {
                    toastr.error("Tải Không Thành Công")
                } else {
                    self.props.getListTradeMark(result.body.data)
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
                </div>
            )
        }
    }
}