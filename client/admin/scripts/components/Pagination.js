import React, {Component} from 'react'
import _ from 'lodash';
import {Link} from 'react-router'

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSelected: 1
        }
    }
    render() {
        var self = this;
        var pageSelected = +self.props.page;
        // get total page 
        var numberPage = Math.ceil(this.props.totalRow/this.props.rows);
        // previous button
        var previous = (
            <li key="previous">
                <Link aria-label="Previous" to={this.props.href + "/1"}>
                    <span aria-hidden="true">
                        «
                    </span>
                </Link>
            </li>
        );
        // latest button
        var next = (
            <li key="next">
                <Link aria-label="Next" to={this.props.href + "/" + numberPage}>
                    <span aria-hidden="true">
                        »
                    </span>
                </Link>
            </li>
        )

        var listPage = [];
        // if pagenumber less then or equal 5 page
        if (numberPage <= 5) {
            for (var i=1; i <= numberPage; i++) {
                if (pageSelected === i) {
                    listPage.push(
                        <li className="active" key={i}>
                            <Link to={this.props.href + "/" + i}>
                                {i}
                            </Link>
                        </li>
                    );
                } else {
                    listPage.push(
                        <li key={i}>
                            <Link to={this.props.href + "/" + i}>
                                {i}
                            </Link>
                        </li>
                    );
                }
            }
        } else if (numberPage > 5) {
            // show 3 item + 2 last item + next button
            if (pageSelected <= 3) {
                for (var i = 1; i <= 5; i++) {
                    if (pageSelected === i) {
                        listPage.push(
                            <li className="active" key={i}>
                                <Link to={this.props.href + "/" + i}>
                                    {i}
                                </Link>
                            </li>
                        );
                    } else {
                        listPage.push(
                            <li key={i}>
                                <Link to={this.props.href + "/" + i}>
                                    {i}
                                </Link>
                            </li>
                        );
                    }
                }
                listPage.push(next);
            } else {
                listPage.push(previous);
                for (var i = pageSelected - 2; i <= pageSelected + 2 && i <= numberPage; i++) {
                    if (pageSelected === i) {
                        listPage.push(
                            <li className="active" key={i}>
                                <Link to={this.props.href + "/" + i}>
                                    {i}
                                </Link>
                            </li>
                        );
                    } else {
                        listPage.push(
                            <li key={i}>
                                <Link to={this.props.href + "/" + i}>
                                    {i}
                                </Link>
                            </li>
                        );
                    }
                }
                if (pageSelected + 2 < numberPage) {
                    listPage.push(next);
                }
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
