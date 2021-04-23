import React from "react";
import SimpleTankList from "./SimpleTankList";
import {FromApiConverter} from "../../../../services/Converters";
import useTankService from "../service/useTankService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {Tank} from "../types/Tank";

const TankList = () => {

    const service = useTankService();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<Tank>(service, FromApiConverter.convertTankList, "tank");

    return (
        <SimpleTankList tanks={entities}
                        page={currentPage}
                        pagination={pagination}
                        limit={limit}
                        loading={loading}
                        paginationActions={paginationActions}
                        entityActions={entityActions}
        />
    )
};

export default TankList;