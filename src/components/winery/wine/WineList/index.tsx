import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleWineList from "./SimpleWineList";
import useWineService from "../service/useWineService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Wine} from "../types/Wine";

const WineList = (props) => {

    const service = useWineService();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Wine>(service, FromApiConverter.convertWineList, "wine");

    return (
        <SimpleWineList
            {...props}
            wines={entities}
            page={currentPage}
            pagination={pagination}
            limit={limit}
            loading={loading}
            paginationActions={paginationActions}
            entityActions={entityActions}
        />

    )
};

export default WineList;