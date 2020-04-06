import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../services/Converters";
import SimpleIngredientList from "./SimpleIngredientList";
import useIngredientService from "../service/useIngredientService";

const IngredientList = (props) => {

    const service = useIngredientService();

    return (
            <EntityListReceiver {...props}
                                entityName={'ingredient'}
                                service={service}
                                listConverter={FromApiConverter.convertIngredientList}
                                render={(entities, page, pagination, limit, loading, paginationActions, entityActions) => (
                                        <SimpleIngredientList ingredients={entities}
                                                              page={page}
                                                              pagination={pagination}
                                                              limit={limit}
                                                              loading={loading}
                                                              paginationActions={paginationActions}
                                                              entityActions={entityActions}/>

                                )}/>
    )
};

export default withRouter(IngredientList);