import React, {Component} from 'react'
import _ from 'lodash';
import Constants from '../../Constants';
import apis from '../../apis/main';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSelected: 1
        }
    }
    onClickPagination(pageNumber, event) {
        event.preventDefault();
        var self = this;
        var menu = _.find(self.props.menus, function(menu) {
            return menu.link === self.props.tabChoose;
        });

        var type = "";
        if (menu) {
            type = menu.id;
        }

        var quantity = Constants.TOTAL_ROW;
        apis.getListProduct(type, pageNumber, quantity, function(err, res) {
            if (err) {

            } else {
                self.props.getListProduct(res.body.data, pageNumber);
            }
        })
        self.setState({
            pageSelected: pageNumber
        })
    }
    render() {
        var numberPage = Math.ceil(this.props.totalProduct/Constants.TOTAL_ROW);
        var previous = (
            <li key="previous">
                <a onClick={this.onClickPagination.bind(this, 1)} aria-label="Previous" href="#">
                    <span aria-hidden="true">
                        «
                    </span>
                </a>
            </li>
        );
        var next = (
            <li key="next">
                <a onClick={this.onClickPagination.bind(this, numberPage)} aria-label="Next" href="#">
                    <span aria-hidden="true">
                        »
                    </span>
                </a>
            </li>
        )

        var listPage = [];
        var pageVisible = 6;
        if ( this.state.pageSelected >= pageVisible) {
            listPage.push(previous);
        }
        //select last page
        if (numberPage > pageVisible && this.state.pageSelected > (numberPage - pageVisible) ) {
            for ( i = numberPage; i > numberPage - pageVisible; i--) {
                listPage.push(
                    <li key={i}>
                        <a href="#" onClick={this.onClickPagination.bind(this, i)}>
                            {i}
                        </a>
                    </li>
                );
            }
        } else {
            // set visible 5 item
            var i = 1;
            if (this.state.pageSelected > 3) {
                i += this.state.pageSelected;
                pageVisible +=this.state.pageSelected;
            }
            for (; i <= numberPage && i < pageVisible; i++) {
                listPage.push(
                    <li key={i}>
                        <a href="#" onClick={this.onClickPagination.bind(this, i)}>
                            {i}
                        </a>
                    </li>
                );
            }

            if (numberPage > 5) {
                listPage.push(next);
            }
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <nav>
                        <ul className="pagination pagination-center">
                            {listPage}
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
