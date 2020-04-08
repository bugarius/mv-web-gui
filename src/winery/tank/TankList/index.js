import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import SimpleTankList from "./SimpleTankList";
import {FromApiConverter} from "../../../services/Converters";
import useTankService from "../service/useTankService";

const TankList = (props) => {

    const service = useTankService();
    return (
            <EntityListReceiver {...props}
                                entityName={'parcel'}
                                service={service}
                                listConverter={FromApiConverter.convertTankList}
                                render={(entities, page, pagination, limit, loading, paginationActions, entityActions) => (
                                        <SimpleTankList tanks={entities}
                                                        page={page}
                                                        pagination={pagination}
                                                        limit={limit}
                                                        loading={loading}
                                                        paginationActions={paginationActions}
                                                        entityActions={entityActions}/>

                                )}/>
    )
};

export default TankList;