import React, {Component} from 'react'
import _ from 'lodash';
import Constants from '../../Constants';

export default class Pagination extends Component {
    render() {
        var previous = (
            <li>
                <a aria-label="Previous" href="#">
                    <span aria-hidden="true">
                        «
                    </span>
                </a>
            </li>
        );
        var next = (
            <li>
                <a aria-label="Next" href="#">
                    <span aria-hidden="true">
                        »
                    </span>
                </a>
            </li>
        )

        var numberPage = Math.ceil(this.props.totalProduct/Constants.TOTAL_ROW);
        var listPage = [];
        if (numberPage > 5) {
            listPage.push(next);
        }
        for (var i = 1; i <= numberPage; i++) {
            listPage.push(
                <li>
                    <a href="#">
                        {i}
                    </a>
                </li>
            );
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
