import React, {Component} from 'react'

export default class BannerCenter extends Component {
    render() {
        var style = {
            background: "url('../images/banner_center.png') no-repeat center",
            height: "152px"
        };
        return (
            <div className="index_middle">
                <div className="silde_banner">
                    <ul className="slide"><li style={style}></li></ul>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
