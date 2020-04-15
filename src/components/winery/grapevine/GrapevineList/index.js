import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleGrapevineList from "./SimpleGrapevineList";
import useGrapevineService from "../service/useGrapevineService";

const ParcelList = (props) => {

    const service = useGrapevineService();

    return (
            <EntityListReceiver {...props}
                                entityName={'grapevine'}
                                service={service}
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