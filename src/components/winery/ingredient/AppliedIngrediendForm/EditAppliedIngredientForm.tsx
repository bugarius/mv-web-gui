import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import CardFooter from "../../../common/cards/CardFooter";
import {ServiceError} from "../../../../services/types/Service";
import {Ingredient} from "../types/Ingredient";
import {AddIngredientFormFields} from "../AddIngredient/AddIngredientFormFields";
import PageWrapper from "../../../common/PageWrapper";

interface Props
{
    ingredient: Ingredient;
    actions: {
        onSubmit: (e: MouseEvent) => void;
        updateIngredientSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        updateTypeSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        onChange: () => void;
    };
    error: ServiceError;
    loading: boolean;
}

export const EditAppliedIngredientForm: FC<Props> = ({
                                                         ingredient,
                                                         actions: {
                                                             onSubmit,
                                                             updateIngredientSelect,
                                                             updateTypeSelect,
                                                             onChange
                                                         },
                                                         error,
                                                         loading
                                                     }) => {

    const {t} = useTranslation();

    return (
        <PageWrapper title={"ingredients.TITLE"} subtitle={'ingredients.LIST'}
                     loading={loading}>
            <Card className="card-default">
                <CardHeader> {t("sidebar.nav.element.EDIT")}</CardHeader>
                <CardBody>
                    <AddIngredientFormFields ingredient={ingredient}
                                             actions={{updateIngredientSelect, updateTypeSelect, onChange}}
                                             error={error}
                                             editing={true}
                    />
                </CardBody>
                <CardFooter>
                    <Button color="primary" className="btn-square" onClick={onSubmit}>
                        {t("common.SAVE")}
                    </Button>
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};