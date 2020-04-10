import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import SimpleParcelList from "./SimpleParcelList";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../services/Converters";
import useParcelService from "../service/useParcelService";

const ParcelList = (props) => {

    const service = useParcelService();
    return (
            <EntityListReceiver {...props}
                                entityName={'parcel'}
                                service={service}
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