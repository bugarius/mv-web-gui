import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../services/Converters";
import SimpleGrapevineList from "./SimpleGrapevineList";
import GrapevineService from "../service/GrapevineService";

const ParcelList = (props) => {

    return (
            <EntityListReceiver {...props}
                                entityName={'grapevine'}
                                service={GrapevineService}
                                listConverter={FromApiConverter.convertGrapevineList}
                                render={(entities, page, pagination, limit, loading, paginationActions, entityActions) => (
                                        <SimpleGrapevineList grapevines={entities}
                                                             page={page}
                                                             pagination={pagination}
                                                             limit={limit}
                                                             loading={loading}
                                                             paginationActions={paginationActions}
                                                             entityActions={entityActions}/>

                                )}/>
    )
};

export default withRouter(ParcelList);