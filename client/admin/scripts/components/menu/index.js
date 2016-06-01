import React, {Component} from 'react'
import Thumbnail from './Thumbnail';
import MainImage from './MainImage';
import Logo from './Logo';

export default class MenuContent extends Component{
    render() {
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="active" role="presentation">
                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
                            Logo
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="profile">
                        <Logo {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}