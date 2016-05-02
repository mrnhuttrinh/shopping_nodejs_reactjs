import React, {Component} from 'react'
import ListNews from './ListNews';
import AddNews from './AddNews';
import Pagination from '../Pagination';
import _ from 'lodash'
import apis from '../../apis/news';

export default class NewsContent extends Component {
    componentDidMount() {
        var self = this;
        if (_.isEmpty(self.props.news.listNews) || 
            _.isNull(self.props.news.listNew)) {
            apis.getTotalNews(function(err, result) {
                if (err) {
                    toastr.error("Tải Không Thành Công!")
                } else {
                    self.props.getListNews(result.body.data, "total")
                }
            })
        }
    }
    render() {
        var page = this.props.params.page || 1;
        return (
            <div>
                <AddNews {...this.props}/>
                <ListNews {...this.props} page={page} />
                <Pagination 
                    page={page}
                    href={"/news"}
                    totalRow={this.props.news.total} 
                    rows={10} />
            </div>
        )
    }
}