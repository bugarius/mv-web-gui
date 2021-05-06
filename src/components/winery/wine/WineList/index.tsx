import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleWineList from "./SimpleWineList";
import useWineService from "../service/useWineService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Wine} from "../types/Wine";
import {useWineContext} from "../WineContext";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

const WineList = (props) => {

    const service = useWineService();
    const {setError, error} = useWineContext();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Wine>(service, FromApiConverter.convertWineList, "wine", setError);

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
        >
            <FormErrorMessage error={error} messageType={'details'}/>
        </SimpleWineList>

    )
};

export default WineList;