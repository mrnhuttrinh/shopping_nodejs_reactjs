import React, {Component} from 'react';
import apis from '../../apis/product';
import ListFour from './ListFour';
import DivLoading from '../FlatLoading';
import TitleHome from './TitleHome';
import HightLightDeal from './HightLightDeal';
import _ from 'lodash';
import FlatLoading from '../FlatLoading';

export default class GroupProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            loading: true
        }
    }
    componentDidMount() {
        var self = this;
        var props = this.props;
        var type = props.menu.link;
        apis.getListProduct({
            type: type,
            quantity: 8,
            page: 1
        }, (err, res) => {
            if (err) {

            } else {
                self.setState({
                    listProduct: res.body.data
                });
            }
            self.setState({
                loading: !self.state.loading
            });
        });
    }
    render() {
        var props = this.props;
        var index = props.index;
        var listFour;
        if (this.state.loading) {
            listFour = <FlatLoading />;
        } else {
            listFour = <ListFour products={this.state.listProduct} menu={this.props.menu} />;
        }
        return (
            <div className="index_middle" data-floor={"T" + index}>
                <div className="container1" data-cat-id="105">
                    <TitleHome index={index} menu={this.props.menu} menus={this.props.menus} />
                    <HightLightDeal menu={this.props.menu} />
                    {listFour}
                </div>
            </div>
        );
    }
}
