import React from "react";
import SimpleTankList from "./SimpleTankList";
import {FromApiConverter} from "../../../../services/Converters";
import useTankService from "../service/useTankService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Tank} from "../types/Tank";
import {useTankContext} from "../TankContext";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

const TankList = () => {

    const service = useTankService();
    const {setError, error} = useTankContext();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Tank>(service, FromApiConverter.convertTankList, "tank", setError);

    return (
        <SimpleTankList tanks={entities}
                        page={currentPage}
                        pagination={pagination}
                        limit={limit}
                        loading={loading}
                        paginationActions={paginationActions}
                        entityActions={entityActions}
        >
            <FormErrorMessage error={error} messageType={'details'}/>
        </SimpleTankList>
    )
};

export default TankList;