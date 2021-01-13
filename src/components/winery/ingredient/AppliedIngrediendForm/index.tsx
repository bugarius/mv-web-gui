import React from "react";
import AddIngredient from "../AddIngredient";
import PageWrapper from "../../../common/PageWrapper";
import {useWineContext} from "../../wine/WineContext";

export const AppliedIngredientForm = () => {

    const {loading} = useWineContext();

    return (
        <PageWrapper title={"ingredients.TITLE"} subtitle={'ingredients.LIST'}
                     loading={loading}>
            <AddIngredient/>
        </PageWrapper>
    )
};