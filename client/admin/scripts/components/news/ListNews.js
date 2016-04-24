import React, {Component} from 'react'
import Table from '../Table';

export default class ListNews extends Component{
    render() {
        var head= [
            "No.", 
            "Tiêu Đề",
            "Edit"
        ];
        var indexNo = 0;
        var rows = this.props.listNews;
        return (
                <Table 
                    head={head}
                    rows={rows}/>
        )
    }
}