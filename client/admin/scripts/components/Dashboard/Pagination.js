import React, {Component} from 'react'
import _ from 'lodash';
import Constants from '../../Constants';
import apis from '../../apis/main';
import {Link} from 'react-router'

export default class Pagination extends Component {
    render() {
        var category = this.props.category;
        var pageSelected = this.props.page;
        var numberPage = Math.ceil(this.props.totalProduct/Constants.TOTAL_ROW);
        var previous = (
            <li key="previous">
                <Link to={"/dashboard/" + category + "/1"} aria-label="Previous">
                    <span aria-hidden="true">
                        «
                    </span>
                </Link>
            </li>
        );
        var next = (
            <li key="next">
                <Link to={"/dashboard/" + category + "/" + numberPage+1} aria-label="Next">
                    <span aria-hidden="true">
                        »
                    </span>
                </Link>
            </li>
        )

        var listPage = [];
        var pageVisible = 6;
        if ( pageSelected >= pageVisible) {
            listPage.push(previous);
        }
        //select last page
        if (numberPage > pageVisible && pageSelected > (numberPage - pageVisible) ) {
            for ( i = numberPage; i > numberPage - pageVisible; i--) {
                listPage.push(
                    <li key={i}>
                        <Link to={"/dashboard/" + category + "/" + i}>
                            {i}
                        </Link>
                    </li>
                );
            }
        } else {
            // set visible 5 item
            var i = 1;
            if (pageSelected > 3) {
                i += pageSelected;
                pageVisible +=pageSelected;
            }
            for (; i <= numberPage && i < pageVisible; i++) {
                pageSelected = parseInt(pageSelected)
                var className = i === pageSelected ? "active" : ""; 
                listPage.push(
                    <li className={className} key={i}>
                        <Link to={"/dashboard/" + category + "/" + i}>
                            {i}
                        </Link>
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
