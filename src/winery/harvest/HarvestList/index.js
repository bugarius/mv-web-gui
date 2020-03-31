import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../services/Converters";
import HarvestService from "../service/HarvestService";
import SimpleHarvestList from "./SimpleHarvestList";

const HarvestList = (props) => {

    return (
            <EntityListReceiver {...props}
                                entityName={'harvest'}
                                service={HarvestService}
                                listConverter={FromApiConverter.convertHarvestList}
                                render={(entities, page, pagination, limit, loading, paginationActions, entityActions) => (
                                        <SimpleHarvestList harvests={entities}
                                                           page={page}
                                                           pagination={pagination}
                                                           limit={limit}
                                                           loading={loading}
                                                           paginationActions={paginationActions}
                                                           entityActions={entityActions}/>

                                )}/>
    )
};

export default withRouter(HarvestList);