import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleGrapevineList from "./SimpleGrapevineList";
import useGrapevineService from "../service/useGrapevineService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Grapevine} from "../types/Grapevine";
import {useGrapevineContext} from "../GrapevineContext";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

const GrapevineList = () => {

    const service = useGrapevineService();
    const {setError, error} = useGrapevineContext();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Grapevine>(service, FromApiConverter.convertGrapevineList, "grapevine", setError);

    return (
        <SimpleGrapevineList grapevines={entities}
                             page={currentPage}
                             pagination={pagination}
                             limit={limit}
                             loading={loading}
                             paginationActions={paginationActions}
                             entityActions={entityActions}
        >
            <FormErrorMessage error={error} messageType={'details'}/>
        </SimpleGrapevineList>
    )
};

export default GrapevineList;