import React, {Component} from 'react'
import ListNews from './ListNews';
import AddNews from './AddNews';
import Pagination from '../Pagination';
import _ from 'lodash'

export default class NewsContent extends Component {
    render() {
        var page = this.props.params.page || 1;
        var paginationContent = "";
        if (page === "search") {
            var search_value = this.props.params.search;
            page = this.props.params.search_page || 1;
            paginationContent = (
                <Pagination 
                    page={page}
                    href={"/news/search/" + search_value}
                    totalRow={this.props.news.total} 
                    rows={10} />
            );
        } else {
            paginationContent = (
                <Pagination 
                    page={page}
                    href={"/news"}
                    totalRow={this.props.news.total} 
                    rows={10} />
            );
        }
        return (
            <div>
                <AddNews {...this.props}/>
                <ListNews {...this.props} page={page} />
                {paginationContent}
            </div>
        )
    }
}