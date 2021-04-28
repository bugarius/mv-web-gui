import React from "react";
import SimpleParcelList from "./SimpleParcelList";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../../services/Converters";
import useParcelService from "../service/useParcelService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Parcel} from "../types/Parcel";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";
import {useParcelContext} from "../ParcelContext";

const ParcelList = () => {

    const service = useParcelService();
    const {setError, error} = useParcelContext();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions,
    } = useEntityPageReceiver<Parcel>(service, FromApiConverter.convertParcelList, "parcel", setError)

    return (
        <SimpleParcelList parcels={entities}
                          page={currentPage}
                          pagination={pagination}
                          limit={limit}
                          loading={loading}
                          paginationActions={paginationActions}
                          entityActions={entityActions}
        >
            <FormErrorMessage error={error} messageType={'details'}/>
        </SimpleParcelList>
            )
};

export default withRouter(ParcelList);