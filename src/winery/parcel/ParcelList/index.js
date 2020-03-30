import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import SimpleParcelList from "./SimpleParcelList";
import {withRouter} from "react-router";
import ParcelService from "../service/ParcelService";
import {FromApiConverter} from "../../../services/Converters";

const ParcelList = (props) => {

    return (
            <EntityListReceiver {...props}
                                entityName={'parcel'}
                                service={ParcelService}
                                listConverter={FromApiConverter.convertParcelList}
                                render={(entities, page, pagination, limit, loading, paginationActions, entityActions) => (
                                    <SimpleParcelList parcels={entities}
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