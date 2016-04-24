import React, {Component} from 'react'
import _ from 'lodash';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSelected: 1
        }
    }
    render() {
        var numberPage = Math.ceil(this.props.totalRow/this.props.rows);
        var previous = (
            <li key="previous">
                <a aria-label="Previous" href="#">
                    <span aria-hidden="true">
                        «
                    </span>
                </a>
            </li>
        );
        var next = (
            <li key="next">
                <a aria-label="Next" href="#">
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
                        <a href="#">
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
                        <a href="#">
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
