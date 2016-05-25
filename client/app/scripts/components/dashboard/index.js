import React, {Component} from 'react'
import GroupProduct from './GroupProduct';
import _ from 'lodash';
import DivLoading from '../FlatLoading';

export default class DashboardContents extends Component {
    render() {
        var props = this.props;
        var listGroupProduct = [];
        if (!_.isEmpty(props.menus) && props.menus.length) {
            var index = 0;
            listGroupProduct = _.map(props.menus, (_menu) => {
                if (_menu.level === 1) {
                    return (<GroupProduct index={++index} menu={_menu} menus={props.menus}key={"group_" + index} />);
                }
            });
        }
        if (listGroupProduct.length === 0) {
            listGroupProduct = (<DivLoading />);
        }
        return (
            <div>
                {listGroupProduct}
            </div>
        );
    }
}
