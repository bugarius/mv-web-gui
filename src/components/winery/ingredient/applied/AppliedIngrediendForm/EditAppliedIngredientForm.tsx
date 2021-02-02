import React, {FC} from 'react';
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import CardFooter from "../../../../common/cards/CardFooter";
import {AddIngredientFormFields} from "../shared/AddIngredientFormFields";
import PageWrapper from "../../../../common/PageWrapper";
import {IngredientFormProps} from "../shared/withIngredientServiceHOC";

export const EditAppliedIngredientForm: FC<IngredientFormProps> = ({
                                                                       ingredient,
                                                                       actions: {
                                                                           onSubmit,
                                                                           updateIngredientSelect,
                                                                           updateTypeSelect,
                                                                           onChange,
                                                                           updateDate
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
                                             actions={{updateIngredientSelect, updateTypeSelect, onChange, updateDate}}
                                             error={error}
                                             editing={true}
                    />
                </CardBody>
                <CardFooter>
                    <Button color="primary" className="btn-square" onClick={onSubmit?.update}>
                        {t("common.SAVE")}
                    </Button>
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};