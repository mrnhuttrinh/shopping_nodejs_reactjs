import React, {Component} from 'react'
import Thumbnail from './Thumbnail';
import Detail from './Detail';
import Logo from './Logo';
import Icon from './Icon';

export default class MenuContent extends Component{
    render() {
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#home" aria-controls="home" role="tab" data-toggle="tab">
                            Thumbnail
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
                            Logo
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">
                            Icon
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">
                            Chi Tiết
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="home">
                        <Thumbnail {...this.props}/>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="profile">
                        <Logo {...this.props}/>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="messages">
                        <Icon {...this.props}/>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="settings">
                        <Detail {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}