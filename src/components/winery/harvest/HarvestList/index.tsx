import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleHarvestList from "./SimpleHarvestList";
import useHarvestService from "../service/useHarvestService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Harvest} from "../types/Harvest";

const HarvestList = () => {

    const service = useHarvestService();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Harvest>(service, FromApiConverter.convertHarvestList, "harvest");

    return (
        <SimpleHarvestList harvests={entities}
                           page={currentPage}
                           pagination={pagination}
                           limit={limit}
                           loading={loading}
                           paginationActions={paginationActions}
                           entityActions={entityActions}
        />
    )
};

export default HarvestList;