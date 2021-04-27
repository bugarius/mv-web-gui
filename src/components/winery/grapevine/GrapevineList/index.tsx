import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleGrapevineList from "./SimpleGrapevineList";
import useGrapevineService from "../service/useGrapevineService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Grapevine} from "../types/Grapevine";

const GrapevineList = () => {

    const service = useGrapevineService();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Grapevine>(service, FromApiConverter.convertGrapevineList, "grapevine");

    return (
        <SimpleGrapevineList grapevines={entities}
                             page={currentPage}
                             pagination={pagination}
                             limit={limit}
                             loading={loading}
                             paginationActions={paginationActions}
                             entityActions={entityActions}
        />
    )
};

export default GrapevineList;