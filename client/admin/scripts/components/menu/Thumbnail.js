import React, {Component} from 'react';
import ShowMenu from './ShowMenu';
import PopOver from './PopOver';
import ModalMenu from './ModalMenu';

export default class Thumbnail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            popover: {
                title: "",
                content: ""
            }
        }
    }
    liChooseCategory(_menu, event) {
        console.log("select", _menu);
        $('#modalThumbnail').modal('show')
    }
    onMouseOverMenu(_menu, event) {
        this.setState({
            popover: {
                title: _menu.name,
                content: "Sample"
            }
        })
        var popElement = $((this.refs["popoverThumbnail"]).refs["popoverThumbnail"]);
        var popElementHeight = $(popElement).height();
        var popElementWidth = $(popElement).width();
        var currentTarget = event.currentTarget;
        var offset = $(currentTarget).offset();
        var outerHeight = $(currentTarget).outerHeight();
        var _top = (offset.top - outerHeight - outerHeight - popElementHeight - 10) + "px";
        var _left = (offset.left) + "px";
        
        popElement.css({
            "position": "absolute",
            "display": "block",
            "top": _top,
            "left": _left
        });
    }
    onMouseOutMenu(_menu, event) {
        var popElement = $((this.refs["popoverThumbnail"]).refs["popoverThumbnail"]);
        popElement.css({
            "position": "absolute",
            "display": "none"
        });
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
