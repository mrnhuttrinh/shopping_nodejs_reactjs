import React, {Component} from 'react'
import ImageLoading from '../ImageLoading';
import _ from 'lodash';

export default class PopOver extends Component {
    render() {
        var self = this;
        var contents;
        if (this.props.popover.images) {
            if (this.props.popover.images.length) {
                var listImage = _.map(self.props.popover.images, (image)=>{
                    return (
                        <div className="pull-left">
                            <a href={image.link} className="thumbnail thumbnailFixed">
                                <img style={{"height": "150px", "width": "160px"}} src={image.image} alt={image.link} />
                            </a>
                        </div>
                    )
                });
                contents = (
                    <div className="row">
                        {listImage}
                    </div>
                )
            } else {
                contents = "Chưa có hình ảnh nào!"
            }
        } else {
            contents = (<ImageLoading />);
        }
        return (
            <div ref={this.props.name} className="popover expandPopover top panel panel-info">
                <div className="arrow"></div>
                <h3 className="popover-title">{this.props.popover.title}Ư</h3>
                <div className="popover-content">
                    {contents}
                </div>
            </div>
        )
    }
}
