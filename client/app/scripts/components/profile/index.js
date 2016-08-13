import React, {Component} from 'react';
import LeftControl from './LeftControl';
import RightInfo from './RightInfo';
import UserAPI from '../../apis/user';
import OrderAPI from '../../apis/order';
import AccountInfo from './AccountInfo';
import ListAddress from './ListAddress';
import ListYourOrder from './ListYourOrder';
import AccountInfoEdit from './AccountInfoEdit';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            listAddress: [],
            listOrder: [],
            menuIndex: 0,
            editIndex: 0
        };
    }
    selectMenu(index) {
        this.setState({
            menuIndex: index
        });
    }
    componentDidMount() {
        var userId = this.props.user.id;
        // get user info
        UserAPI.getUserInfo({id: userId}, (err, res) => {
            if (err) {

            } else {
                this.setState({
                    user: res.body.data
                });
            }
        });
        // get list address
        UserAPI.getUserAddresses({user_id: userId}, (err, res) => {
            if (err) {

            } else {
                this.setState({
                    listAddress: res.body.data
                });
            }
        });
        // get your order
        OrderAPI.getListYourOrder({id: userId}, (err, res) => {
            if (err) {

            } else {
                this.setState({
                    listOrder: res.body.data
                });
            }
        });
    }
    renderGeneralInfo() {
        return (
            <RightInfo 
                user={this.state.user}
                listAddress={this.state.listAddress}
                listOrder={this.state.listOrder} />
        );
    }
    renderAccountInfo() {
        var content = (<AccountInfo user={this.state.user} />);
        var button = (<button onClick={this.editInfo.bind(this, 1)} type="button" className="btn btn-primary btn-sm pull-right">Edit</button>);
        if (this.state.editIndex === 1) {
            content = (<AccountInfoEdit user={this.state.user} />);
            button = (<button type="button" className="btn btn-success btn-sm pull-right">Save</button>);
        }
        return (
            <div className="col-lg-9 col-md-10">
                <table className="table table-hover">
                    <thead> 
                        <tr>
                            <th>
                                <p className="line-height-30px">
                                    Thông tin tài khoản
                                    {button}
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
            </div>
        );
    }
    renderListAddress() {
        return (
            <div className="col-lg-9 col-md-10">
                <table className="table table-hover">
                    <thead> 
                        <tr>
                            <th>
                                <p className="line-height-30px">
                                    Sổ địa chỉ
                                    <button onClick={this.editInfo.bind(this, 2)} type="button" className="btn btn-primary btn-sm pull-right">Edit</button>
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <ListAddress listAddress={this.state.listAddress}/>
                    </tbody>
                </table>
            </div>
        );
    }
    renderListOrder() {
        return (
            <div className="col-lg-9 col-md-10">
                <table className="table table-hover">
                    <thead> 
                        <tr>
                            <th>
                                <p className="line-height-30px">
                                    Đơn Hàng Của Bạn
                                    <button onClick={this.editInfo.bind(this, 4)} type="button" className="btn btn-primary btn-sm pull-right">Edit</button>
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <ListYourOrder listOrder={this.state.listOrder} />
                    </tbody>
                </table>
            </div>
        );
    }
    editInfo(index, event) {
        event.preventDefault();
        this.setState({
            editIndex: index
        });
    }
    render() {
        var content = null;
        switch (this.state.menuIndex) {
            case 1:
                content = this.renderAccountInfo();
                break;
            case 2:
                content = this.renderListAddress();
                break;
            case 3:
                content = null;
                break;
            case 4:
                content = this.renderListOrder();
                break;
            default: 
                content = this.renderGeneralInfo();
        }
        return (
            <div className="index_middle">
                <div className="container">
                    <div className="row">
                        <LeftControl 
                            menuIndex={this.state.menuIndex}
                            selectMenu={this.selectMenu.bind(this)}/>
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}
