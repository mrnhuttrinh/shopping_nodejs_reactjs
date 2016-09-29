import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import actions              from '../actions/main';
import MasterPage           from './MasterPage';
import CategoryContents     from '../components/category';
import ProductContents      from '../components/product';
import _                    from 'lodash';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: null,
            keyComponent: ""
        };
    }
    componentDidMount() {
        document.title = "Áo Thun Phong Cách";
    }
    // componentDidUpdate() {
    //     document.title = "Áo Thun Phong Cách";
    // }
    componentWillReceiveProps(nextProps) {
        var menus = nextProps.menus;
        var category_link = nextProps.params["category_link"];
        if (!_.isEmpty(menus)) {
            var menuSelect = _.find(menus, (menu) => {
                return menu.link === category_link;
            });
            if (menuSelect) {
                this.setState({
                    Content: CategoryContents,
                    keyComponent: "Category"
                });
            } else {
                this.setState({
                    Content: ProductContents,
                    keyComponent: "Product"
                });
            }
        }
    }
    render() {
        var Content = this.state.Content;
        return (
            <MasterPage {...this.props}>
                {
                    Content ? (<Content ref={this.state.keyComponent} {...this.props}/>) : null
                }
            </MasterPage>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    }
}

export default connect(mapStateToProps, actions)(Category)