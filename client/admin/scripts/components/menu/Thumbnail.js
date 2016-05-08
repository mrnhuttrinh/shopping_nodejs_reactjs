import React, {Component} from 'react';
import ShowMenu from './ShowMenu';
import ModalMenu from './ModalMenu';
import apis from '../../apis/menu';
import _ from 'lodash';

export default class Thumbnail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listGalleris: [],
            _selectMenu: {
                char: "",
                content: "",
                level: "",
                name: "",
                title: ""
            },
            popover: {
                title: "",
                images: ""
            },
            _setTimeOut: null
        }
    }
    liChooseCategory(_menu, event) {
        $('#modalThumbnail').modal('show');
        this.setState({
            _selectMenu: _menu
        })
    }
    componentDidMount() {
        var self = this;
        if (self.props.menus.length) {
            apis.getAllGalleriesMenu(function(err, res) {
                if (err) {
                    toastr.error("Tải Không Thành Công!");
                } else {
                    _.forEach(self.props.menus, (menu) => {
                        var images = _.filter(res.body.data, (gallery) => {
                            return gallery.category_id === menu.id;
                        });
                        menu.images = images;
                    });
                    self.props.updateMenu(self.props.menus);
                }
            })
        } else {
            apis.getAllGalleriesMenu(function(err, res) {
                if (err) {
                    toastr.error("Tải Không Thành Công!");
                } else {
                    self.setState({
                        listGalleris: res.body.data
                    })
                }
            })
        }
    }
    componentDidUpdate() {
        var self = this;
        if (self.props.menus.length) {
            if (!self.props.menus[0].images) {
                _.forEach(self.props.menus, (menu) => {
                    var images = _.filter(self.state.listGalleris, (gallery) => {
                        return gallery.category_id === menu.id;
                    });
                    menu.images = images;
                });
                self.props.updateMenu(self.props.menus);
            }
        }
    }
    deleteGallery(_menu) {
        var self = this;
        var selectedMenu = _.find(self.props.menus, (menu)=>{
            return menu.id === _menu.id;
        });
        selectedMenu.images = _menu.images;
        self.props.updateMenu(self.props.menus);
    }
    addMorePicture(_menu) {
        var self = this;
        var selectedMenu = _.find(self.props.menus, (menu)=>{
            return menu.id === _menu.id;
        });
        selectedMenu.images = _menu.images;
        self.props.updateMenu(self.props.menus);
    }
    render() {
        return (
            <div>
                <ShowMenu name="showmenuThumbnail" ref="showmenuThumbnail" {...this.props} 
                    liChooseCategory={this.liChooseCategory.bind(this)}/>
                <ModalMenu 
                    addMorePicture={this.addMorePicture.bind(this)}
                    deleteGallery={this.deleteGallery.bind(this)} 
                    menu={this.state._selectMenu} 
                    name="modalThumbnail" />
            </div>
        )
    }
}
