import React, {Component} from 'react'
import Table from '../Table';
import _ from 'lodash';
import apis from '../../apis/news';

export default class ListNews extends Component{
    shouldComponentUpdate (nextProps, nextState) {
        return true;
    }
    componentDidMount() {
        var self = this;
        var page = self.props.page;
        if (_.isEmpty(self.props.listNews) || 
            _.isNull(self.props.listNew)) {
            apis.getListNews(page, function(err, result) {
                if (err) {
                    toastr.error("Tải Không Thành Công")
                } else {
                    self.props.getListNews(result.body.data)
                }
            })
        }
    }
    render() {
        var head= [
            "No.", 
            "Tiêu Đề",
            "Edit"
        ];
        var indexNo = 0;
        var rows = this.props.listNews;
        _.forEach(rows, function(row) {
            row.edit = (
                <button className="btn btn-primary btn-xs">
                    Edit
                </button>
            )
        })
        return (
                <Table 
                    head={head}
                    rows={rows}/>
        )
    }
}