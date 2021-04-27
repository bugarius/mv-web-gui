import React from "react";
import SimpleParcelList from "./SimpleParcelList";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../../services/Converters";
import useParcelService from "../service/useParcelService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Parcel} from "../types/Parcel";

const ParcelList = () => {

    const service = useParcelService();
    const {entities, currentPage, pagination, limit, loading, paginationActions, entityActions} = useEntityPageReceiver<Parcel>(service, FromApiConverter.convertParcelList, "parcel")

    return (
        <SimpleParcelList parcels={entities}
                          page={currentPage}
                          pagination={pagination}
                          limit={limit}
                          loading={loading}
                          paginationActions={paginationActions}
                          entityActions={entityActions}
        />

    )
};

export default withRouter(ParcelList);