import React, {Component} from 'react'
import _ from 'lodash';

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
        self.setState({
            pageSelected: pageNumber
        });
        self.props.pageSelected(pageNumber);
    }
    render() {
        var numberPage = Math.ceil(this.props.totalRow/this.props.rows);
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
