import React from "react";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleIngredientList from "./SimpleIngredientList";
import useIngredientService from "../service/useIngredientService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";

const IngredientList = () => {

    const service = useIngredientService();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<BoxWithGrapes>(service, FromApiConverter.convertIngredientList, "ingredient");

    return (
                                        <SimpleIngredientList ingredients={entities}
                                                              page={currentPage}
                                                              pagination={pagination}
                                                              limit={limit}
                                                              loading={loading}
                                                              paginationActions={paginationActions}
                                                              entityActions={entityActions}
                                        />

    )
};

export default IngredientList;