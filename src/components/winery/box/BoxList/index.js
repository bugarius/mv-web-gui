import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import {useParams, withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleBoxList from "./SimpleBoxList";
import useBoxService from "../service/useBoxService";

const BoxList = (props) => {

    const {harvestId} = useParams();
    const service = useBoxService(harvestId);

    return (
            <EntityListReceiver {...props}
                                entityName={'box'}
                                service={service}
                                listConverter={FromApiConverter.convertBoxList}
                                render={(entities, page, pagination, limit, loading, paginationActions, entityActions) => (
                                        <SimpleBoxList {...props}
                                                       boxes={entities}
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