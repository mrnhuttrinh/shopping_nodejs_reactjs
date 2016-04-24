import React, {Component} from 'react'
import ListNews from './ListNews';
import AddNews from './AddNews';
import Pagination from '../Pagination';

export default class NewsContent extends Component{
    render() {
        return (
            <div>
                <AddNews />
                <ListNews />
                <Pagination 
                    totalRow={60} 
                    rows={10} />
            </div>
        )
    }
}