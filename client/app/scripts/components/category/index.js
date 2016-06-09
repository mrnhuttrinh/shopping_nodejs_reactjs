import React, {Component} from 'react';
import _ from 'lodash';
import Title from './Title';
import ListThree from './ListThree';
import productAPIs from '../../apis/product';
import Pagination from '../Pagination';

export default class CategoryContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalProduct: 0
        };
    }
    getTotalProduct(props) {
        var currentHash = props.params.category_link;
        productAPIs.getTotalProduct({
            category: currentHash
        }, (err, res) => {
            if (err) {} else {
                this.setState({
                    totalProduct: res.body.data
                });
            }
        });
    }
    componentDidMount() {
        this.getTotalProduct(this.props);
    }
    componentWillReceiveProps(nextProps) {
        var props = this.props;
        var currentHash = props.params.category_link;
        var nextHash = nextProps.params.category_link;
        if (currentHash !== nextHash) {
            this.getTotalProduct(nextProps);
        }
    }
    render() {
        var props = this.props;
        var currentHash = props.params.category_link;
        var currentMenu = _.find(props.menus, (menu) => {
            return menu.link === currentHash;
        });
        return (
            <div>
                <div className="index_middle">
                    <div className="container1" id="cateContainer">
                        <Title {...this.props} currentMenu={currentMenu} total={this.state.totalProduct}/>
                        <ListThree {...this.props} currentMenu={currentMenu}/>
                        <Pagination 
                            page={1}
                            href={"/listuser/search/"}
                            totalRow={500} 
                            rows={15} />
                    </div>
                </div>
            </div>
        );
    }
}

