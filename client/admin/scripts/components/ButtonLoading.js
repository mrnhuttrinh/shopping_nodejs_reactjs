import React, {Component} from 'react'
export default class ButtonLoading extends Component {
    render() {
        var className = "btn btn-warning " + this.props.classCSS;
        return (
            <button className={className}><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...</button>
        );
    }
}