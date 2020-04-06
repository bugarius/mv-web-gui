import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import {useParams, withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../services/Converters";
import SimpleWineList from "./SimpleWineList";
import useWineService from "../service/useWineService";

const BoxList = (props) => {

    const {wineId} = useParams();
    const service = useWineService(wineId);

    return (
            <EntityListReceiver {...props}
                                entityName={'wine'}
                                service={service}
                                listConverter={FromApiConverter.convertWineList}
                                render={(entities, page, pagination, limit, loading, paginationActions, entityActions) => (
                                        <SimpleWineList
                                                {...props}
                                                wines={entities}
                                                page={page}
                                                pagination={pagination}
                                                limit={limit}
                                                loading={loading}
                                                paginationActions={paginationActions}
                                                entityActions={entityActions}/>

                                )}/>
    )
};

export default withRouter(BoxList);