import React, {Component} from 'react';
import LeftControl from '../LeftControl';
import CreateAddress from './CreateAddress';
import UserAPI from '../../apis/user';

export default class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: {}
        };
    }
    updateAddressForm(address) {
        this.setState({
            address: address
        });
    }
    componentDidMount() {
        var props = this.props;
        var params = props.params;
        var id = params.id;
        if (id !== "add") {
            var data = {
                user_id: this.props.user.id,
                id: id
            };
            UserAPI.getAddressById(data, (err, res) => {
                if (err) {

                } else {
                    this.setState({
                        address: res.body.data
                    });
                }
            });
        }
    }
    render() {
        var props = this.props;
        var params = props.params;
        var id = params.id;
        var address = this.state.address;
        var formType = "create";
        if (id === "add") {
            // create new address
            address.addressTypeHome = true;
        } else {
            formType = "update";
        }
        return (
            <div className="index_middle">
                <div className="container">
                    <div className="row">
                        <LeftControl menuName={"addresses"}/>
                        <CreateAddress updateAddressForm={this.updateAddressForm.bind(this)} formType={formType} {...this.props} address={address}/>
                    </div>
                </div>
            </div>
        );
    }
}
