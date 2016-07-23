import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import actions              from '../actions/main';
import MasterPage           from './MasterPage';
import Contents             from '../components/news';

export default class News extends Component {
    componentDidMount() {
        document.title = "Tin Tức";
    }
    render() {
        return (
            <MasterPage {...this.props}>
                <Contents {...this.props}/>
            </MasterPage>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    }
}

export default connect(mapStateToProps, actions)(News)