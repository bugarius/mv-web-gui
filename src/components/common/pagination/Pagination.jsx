import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import SiteNumber from "./SiteNumber";
import PageNavigation from "./PageNavigation";

class Pagination extends Component {

    setEdgePages = (page, onClick, pagination, sites, number) =>
    {
        for (let i = page - number; i < page + 6 - number; i++)
        {
            sites.push(<SiteNumber key={i} pageNumber={i + 1} currentPage={page} onClick={onClick}/>);
            if (i > pagination.totalPages)
            {
                break;
            }
        }
    };

    setLeftEdgePages = (page, onClick, pagination, sites) =>
    {
        const numbersOfLeftEdge = [1, 2, 3];
        for (let i = 0; i < numbersOfLeftEdge.length; i++)
        {
            if (page === numbersOfLeftEdge[i])
            {
                this.setEdgePages(page, onClick, pagination, sites, numbersOfLeftEdge[i]);
            }
        }
    };

    setRightEdgePages = (page, onClick, pagination, sites) =>
    {
        const numbersOfRightEdge = [3, 2, 1];
        for (let i = 0; i < numbersOfRightEdge.length; i++)
        {
            if (page === pagination.totalPages - numbersOfRightEdge[i])
            {
                this.setEdgePages(page, onClick, pagination, sites, 6 - numbersOfRightEdge[i]);
            }
        }
    };

    renderSiteNumbers = (page, pagination, onClick) =>
    {
        let sites = [];

        const isPageOnLeftEdge = page > 0 && page <= 3;
        const isPageOnRightEdge = page >= pagination.totalPages - 3;
        const isPageInMiddle = page > 3 && page < pagination.totalPages - 3;

        if ( pagination.totalPages > 6)
        {
            if (isPageOnLeftEdge)
            {
                this.setLeftEdgePages(page, onClick, pagination, sites);
            }
            else if (isPageOnRightEdge)
            {
                this.setRightEdgePages(page, onClick, pagination, sites);
            }
            else if (isPageInMiddle)
            {
                this.setEdgePages(page, onClick, pagination, sites, 3);
            }
            else
            {
                this.setEdgePages(page, onClick, pagination, sites, 0);
            }
        }
        else
        {
            for (let i = 0; i < pagination.totalPages; i++)
            {
                sites.push(<SiteNumber key={i} pageNumber={i + 1} currentPage={page} onClick={onClick}/>);
            }
        }
        return sites;
    };

    renderInfo = (pagination, page) =>
    {
        const rowsPerPage = 10;
        const firstNumber = 1 + (rowsPerPage * page);
        const lastNumber = pagination.numberOfElements + (rowsPerPage * page);

        return <div className="col-sm-12 col-md-5">
            <div className="dataTables_info" id="example_info" role="status"
                 aria-live="polite">{firstNumber} do {lastNumber} z {pagination.totalElements}
            </div>
        </div>
    };

    render()
    {
        const {page, pagination, actions: {changePage, next, prev}} = this.props;

        return(
                <div className="row">

                    {this.renderInfo(pagination, page)}

                    <div className="col-sm-12 col-md-7">
                        <div className="dataTables_paginate paging_simple_numbers"
                             id="example_paginate">
                            <ul className="pagination">
                                <PageNavigation
                                        page={page}
                                        disableAtPage={0}
                                        onClick={prev}
                                        direction={"left"}
                                        pagination={pagination}/>

                                { this.renderSiteNumbers(page, pagination, changePage) }

                                <PageNavigation
                                        page={page}
                                        disableAtPage={pagination.totalPages - 1}
                                        onClick={next}
                                        direction={"right"}
                                        pagination={pagination}/>
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(Pagination);