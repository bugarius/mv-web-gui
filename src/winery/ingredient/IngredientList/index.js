import React from "react";
import EntityListReceiver from "../../common/EntityListReceiver";
import {withRouter} from "react-router";
import {FromApiConverter} from "../../../services/Converters";
import SimpleIngredientList from "./SimpleIngredientList";
import IngredientService from "../service/IngredientService";

const IngredientList = (props) => {

    return (
            <EntityListReceiver {...props}
                                entityName={'ingredient'}
                                service={IngredientService}
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