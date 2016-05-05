import React, {Component} from 'react';
import ShowMenu from './ShowMenu';
import PopOver from './PopOver';
import ModalMenu from './ModalMenu';
import apis from '../../apis/menu';

export default class Thumbnail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            popover: {
                title: "",
                images: ""
            },
            _setTimeOut: null
        }
    }
    liChooseCategory(_menu, event) {
        $('#modalThumbnail').modal('show')
    }
    onMouseOverMenu(_menu, event) {
        var self = this;
        var currentTarget = event.currentTarget;
        var popElement = $((self.refs["popoverThumbnail"]).refs["popoverThumbnail"]);
        var popElementHeight = $(popElement).height();
        var popElementWidth = $(popElement).width();
        currentTarget = event.currentTarget;
        var offset = $(currentTarget).offset();
        var outerHeight = $(currentTarget).outerHeight();
        var _top = (offset.top - outerHeight - outerHeight - popElementHeight - 10) + "px";
        var _left = (offset.left) + "px";
        clearTimeout(self.state._setTimeOut);
        self.state._setTimeOut = setTimeout(function() {
            apis.getGalleryByMenuId(_menu.id, function(err, res) {
                if (err) {
                    toastr.error("Tải Hình Ảnh Của Menu Không Thành Công!")
                } else {
                    self.setState({
                        popover: {
                            title: _menu.name,
                            images: res.body.data
                        }
                    })
                }
            })

            popElement.css({
                "position": "absolute",
                "top": _top,
                "left": _left
            });
            popElement.slideDown("slow")
            popElement.css({
                "position": "absolute"
            });
            self.setState({
                popover: {
                    title: _menu.name,
                    images: null
                }
            })
        }, 1000)
    }
    onMouseOutMenu(_menu, event) {
        var self = this;
        clearTimeout(self.state._setTimeOut);
        var popElement = $((this.refs["popoverThumbnail"]).refs["popoverThumbnail"]);
        popElement.slideUp("slow");
    }
    render() {
        return (
            <div>
                <ShowMenu name="showmenuThumbnail" ref="showmenuThumbnail" {...this.props} 
                    onMouseOutMenu={this.onMouseOutMenu.bind(this)}
                    onMouseOverMenu={this.onMouseOverMenu.bind(this)}
                    liChooseCategory={this.liChooseCategory}/>
                <PopOver name="popoverThumbnail" ref="popoverThumbnail" popover={this.state.popover}/>
                <ModalMenu name="modalThumbnail" />
            </div>
        )
    }
}
