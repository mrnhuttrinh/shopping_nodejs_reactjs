import React, {Component} from 'react'

export default class Facebook extends Component {
    render() {
        return (
            <div className="fb-like" 
                data-href={window.location.href}
                data-layout="button" 
                data-action="like" 
                data-size="small" 
                data-show-faces="false" 
                data-share="true">
            </div>
        );
    }
}
