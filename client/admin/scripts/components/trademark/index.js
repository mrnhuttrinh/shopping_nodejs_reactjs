import React, {Component} from 'react'
import ListTM from './ListTM';
import AddTM from './AddTM';
import Pagination from '../Pagination';
import _ from 'lodash'

export default class TradeMarkContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewTM: false
        }
    }
    addNewTMfunc(event) {
        event.preventDefault();
        this.setState({
            addNewTM: !this.state.addNewTM
        });
    }
    cancelAddNewTM() {
        this.setState({
            addNewTM: !this.state.addNewTM
        });
    }
    searchPress(event) {
        event.preventDefault();
        var self = this;
        if (event.keyCode === 13) {
            self.setState({
                loadingData: !self.state.loadingData
            });
            var search_value = this.refs["inputSearch"].value;
            var pathName = window.location.pathname;
            if (_.isEmpty(search_value)) {
                window.location = pathName + "#/trademark";
            } else {
                window.location = pathName + "#/trademark/search/" + search_value;
            }
            return;
        }
    }
    render() {
        var page = this.props.params.page || 1;
        var paginationContent = "";
        if (page === "search") {
            var search_value = this.props.params.search;
            page = this.props.params.search_page || 1;
            paginationContent = (
                <Pagination 
                    page={page}
                    href={"/trademark/search/" + search_value}
                    totalRow={this.props.trademark.total} 
                    rows={10} />
            );
        } else {
            paginationContent = (
                <Pagination 
                    page={page}
                    href={"/trademark"}
                    totalRow={this.props.trademark.total} 
                    rows={10} />
            );
        }
        return (
            <div>
                <input onKeyUp={this.searchPress.bind(this)} ref="inputSearch" type="text" placeholder="Tìm Kiếm Nhà Cung Cấp" />
                {
                    this.state.addNewTM ? (
                        <AddTM 
                            cancelAddNewTM={this.cancelAddNewTM.bind(this)}
                            {...this.props} />
                    ) : (
                        <button onClick={this.addNewTMfunc.bind(this)} type="button" className="btn btn-success pull-right">Thêm Mới</button>
                    )
                }
                <ListTM {...this.props} page={page}/>
                {paginationContent}
            </div>
        )
    }
}