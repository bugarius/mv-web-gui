import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class PageNavigation extends Component {
    render()
    {
        const {page, disableAtPage, onClick, direction, pagination} = this.props;
        return(
                <li className={"paginate_button page-item " + (direction === "left" ? "previous " : "next ") +
                ((page === disableAtPage || pagination.totalPages < 2) ? " disabled" : "")}>
                    <button onClick={onClick} className="page-link"><em className={"fa fa-caret-" + direction}/></button>
                </li>
        )
    }
}

export default withRouter(PageNavigation);