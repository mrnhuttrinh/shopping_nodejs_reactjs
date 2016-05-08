import React, {Component} from 'react'
import ShowMenuLogo from './ShowMenuLogo';
import apis from '../../apis/menu';
import _ from 'lodash';
import ModalLogo from './ModalLogo';

export default class Logo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            _selectMenu: {
                char: "",
                content: "",
                level: "",
                name: "",
                title: ""
            }
        }
    }
    liChooseCategory(_menu, event) {
        $('#modalLogo').modal('show');
        this.setState({
            _selectMenu: _menu
        })
    }
    updateMenu(_menu) {
        var self = this;
        var selectedMenu = _.find(self.props.menus, (menu)=>{
            return menu.id === _menu.id;
        });
        selectedMenu.logo_image = _menu.logo_image;
        self.props.updateMenu(self.props.menus);
    }
    render() {
        return (
            <div>
                <ShowMenuLogo name="showmenuLogo" ref="showmenuLogo" {...this.props} 
                    liChooseCategory={this.liChooseCategory.bind(this)}/>
                <ModalLogo 
                    updateMenu={this.updateMenu.bind(this)}
                    menu={this.state._selectMenu} 
                    name="modalLogo" />
            </div>
        )
    }
}