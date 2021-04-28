import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleHarvestList from "./SimpleHarvestList";
import useHarvestService from "../service/useHarvestService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Harvest} from "../types/Harvest";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";
import {useHarvestContext} from "../HarvestContext";

const HarvestList = () => {

    const service = useHarvestService();
    const {setError, error} = useHarvestContext();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Harvest>(service, FromApiConverter.convertHarvestList, "harvest", setError);

    return (
        <SimpleHarvestList harvests={entities}
                           page={currentPage}
                           pagination={pagination}
                           limit={limit}
                           loading={loading}
                           paginationActions={paginationActions}
                           entityActions={entityActions}
        >
            <FormErrorMessage error={error} messageType={'details'}/>
        </SimpleHarvestList>
    )
};

export default HarvestList;