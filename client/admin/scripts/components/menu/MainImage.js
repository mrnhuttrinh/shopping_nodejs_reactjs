import React, {Component} from 'react'
import ShowMenuMainImage from './ShowMenuMainImage';
import apis from '../../apis/menu';
import _ from 'lodash';
import ModalMainImage from './ModalMainImage';

export default class MainImage extends Component{
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
        $('#modalMainImage').modal('show');
        this.setState({
            _selectMenu: _menu
        })
    }
    updateMenu(_menu) {
        var self = this;
        var selectedMenu = _.find(self.props.menus, (menu)=>{
            return menu.id === _menu.id;
        });
        selectedMenu.main_image = _menu.main_image;
        self.props.updateMenu(self.props.menus);
    }
    render() {
        return (
            <div>
                <ShowMenuMainImage name="showmenuMainImage" ref="showmenuMainImage" {...this.props} 
                    liChooseCategory={this.liChooseCategory.bind(this)}/>
                <ModalMainImage 
                    updateMenu={this.updateMenu.bind(this)}
                    menu={this.state._selectMenu} 
                    name="modalMainImage" />
            </div>
        )
    }
}