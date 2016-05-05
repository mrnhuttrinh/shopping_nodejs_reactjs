import React, {Component} from 'react'
import ImageLoading from '../ImageLoading';

export default class PopOver extends Component {
    componentDidUpdate() {
        $(function() {
            $('.bxslider-menu').bxSlider({
                controls: false
            });
        })
    }
    render() {
        var contents;
        if (this.props.popover.images) {
            if (this.props.popover.images.length) {
                contents = (
                    <div className="row">
                        <div className="col-xs-6 col-md-3">
                            <a href="#" className="thumbnail thumbnailFixed">
                                <img src="http://localhost:8000/admin/img/data/products/thumbnail_344790CC-9ADC-4697-B792-663C383ECCC0.gif" alt="..." />
                            </a>
                        </div>
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
