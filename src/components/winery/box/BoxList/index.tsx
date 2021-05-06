import React from "react";
import {withRouter} from "react-router-dom";
import {FromApiConverter} from "../../../../services/Converters";
import SimpleBoxList from "./SimpleBoxList";
import useBoxService from "../service/useBoxService";
import {useEntityPageReceiver} from "../../common/pagination/useEntityPageReceiver";
import {BoxWithGrapes} from "../types/BoxWithGrapes";
import {useHarvestContext} from "../../harvest/HarvestContext";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

const BoxList = (props) => {

    const service = useBoxService();
    const {setError, error} = useHarvestContext();
    const {
        entities,
        currentPage,
        pagination,
        limit,
        loading,
        paginationActions,
        entityActions
    } = useEntityPageReceiver<BoxWithGrapes>(service, FromApiConverter.convertTankList, "box", setError);

    return (
        <SimpleBoxList {...props}
                       boxes={entities}
                       page={currentPage}
                       pagination={pagination}
                       limit={limit}
                       loading={loading}
                       paginationActions={paginationActions}
                       entityActions={entityActions}
        >
            <FormErrorMessage error={error} messageType={'details'}/>
        </SimpleBoxList>

    )
};

export default withRouter(BoxList);