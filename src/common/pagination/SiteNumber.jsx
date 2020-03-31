import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class SiteNumber extends Component {
    render()
    {
        const {pageNumber, currentPage, onClick} = this.props;
        return(
                <li className={"paginate_button page-item" + (currentPage + 1 === pageNumber ? " active" : "")}>
                    <button name={pageNumber} onClick={onClick} className="page-link" style={{minWidth: '40px'}}>{pageNumber}</button>
                </li>
        )
    }
}

export default withRouter(SiteNumber);