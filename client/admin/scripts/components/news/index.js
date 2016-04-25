import React, {Component} from 'react'
import ListNews from './ListNews';
import AddNews from './AddNews';
import Pagination from '../Pagination';

export default class NewsContent extends Component{
    render() {
        var page = this.props.params.page || 1;
        return (
            <div>
                <AddNews {...this.props}/>
                <ListNews {...this.props} page={page} />
                <Pagination 
                    totalRow={60} 
                    rows={10} />
            </div>
        )
    }
}