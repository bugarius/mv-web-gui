import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleIngredientList from "./SimpleIngredientList";
import useIngredientService from "../service/useIngredientService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";
import {useIngredientContext} from "../IngredientContext";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

const IngredientList = () => {

    const service = useIngredientService();
    const {setError, error} = useIngredientContext();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<BoxWithGrapes>(service, FromApiConverter.convertIngredientList, "ingredient", setError);

    return (
        <SimpleIngredientList ingredients={entities}
                              page={currentPage}
                              pagination={pagination}
                              limit={limit}
                              loading={loading}
                              paginationActions={paginationActions}
                              entityActions={entityActions}
        >
            <FormErrorMessage error={error} messageType={'details'}/>
        </SimpleIngredientList>

    )
};

export default IngredientList;