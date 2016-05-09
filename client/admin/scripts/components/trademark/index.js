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
    render() {
        var page = this.props.params.page || 1;
        return (
            <div>
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
                <Pagination 
                    page={page}
                    href={"trademark"}
                    totalRow={this.props.trademark.total} 
                    rows={10}/>
            </div>
        )
    }
}