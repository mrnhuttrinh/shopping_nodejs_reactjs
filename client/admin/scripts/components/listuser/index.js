import React, {Component} from 'react'
import _ from 'lodash';
import apis from '../../apis/main';
import AddUser from './AddUser'
import ListUser from './ListUser';
import Pagination from '../Pagination';

export default class ListUserContent extends Component{
    componentDidMount() {
        var self = this;
        if (_.isEmpty(self.props.users.listUser) || 
            _.isNull(self.props.users.listUser)) {
            apis.getTotalUsers(function(err, result) {
                if (err) {
                    toastr.error("Tải Không Thành Công!")
                } else {
                    self.props.getAllUser(result.body.data.total, "total")
                }
            })
        }
    }

    render() {
        var page = this.props.params.page || 1;
        return (
            <div>
                <AddUser {...this.props} />
                <ListUser {...this.props} page={page} />
                <Pagination 
                    page={page}
                    href={"/listuser"}
                    totalRow={this.props.users.total} 
                    rows={10} />
            </div>
        )
    }
}
