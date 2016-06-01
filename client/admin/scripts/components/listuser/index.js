import React, {Component} from 'react'
import _ from 'lodash';
import apis from '../../apis/main';
import AddUser from './AddUser'
import ListUser from './ListUser';
import Pagination from '../Pagination';

export default class ListUserContent extends Component {
    render() {
        var page = this.props.params.page || 1;
        var paginationContent = "";
        if (page === "search") {
            var search_value = this.props.params.search;
            page = this.props.params.search_page || 1;
            paginationContent = (
                <Pagination 
                    page={page}
                    href={"/listuser/search/" + search_value}
                    totalRow={this.props.users.total} 
                    rows={10} />
            );
        } else {
            paginationContent = (
                <Pagination 
                    page={page}
                    href={"/listuser"}
                    totalRow={this.props.users.total} 
                    rows={10} />
            );
        }
        return (
            <div>
                <AddUser {...this.props} />
                <ListUser {...this.props} page={page} />
                {paginationContent}
            </div>
        )
    }
}
