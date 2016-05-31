import React, {Component} from 'react'
import Thumbnail from './Thumbnail';
import MainImage from './MainImage';
import Logo from './Logo';

export default class MenuContent extends Component{
    render() {
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#home" aria-controls="home" role="tab" data-toggle="tab">
                            Hình Ảnh Chính
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
                            Logo
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="home">
                        <MainImage {...this.props}/>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="profile">
                        <Logo {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}