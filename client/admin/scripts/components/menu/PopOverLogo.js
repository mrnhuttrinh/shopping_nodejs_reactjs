import React, {Component} from 'react'
import _ from 'lodash';

export default class PopOverLogo extends Component {
    render() {
        return (
            <div id={"popover-content" + this.props.name} className="popover expandPopover bottom panel panel-info">
                <div className="arrow"></div>
                <h3 className="popover-title">Hình Ảnh</h3>
                <div className="popover-content">
                    <img src={this.props.menu.logo_image}/>
                </div>
            </div>
        )
    }
}
