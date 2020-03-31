import React, {useContext} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import Input from "../../../common/form-elements/InputElement";
import {IngredientContext} from "../IngredientContext";
import Select from "../../../common/form-elements/Select";

const SimpleIngredientForm = ({ingredient, loading, onSubmit}) => {

    const {id, name, info, type} = ingredient;
    const {actions: {updateIngredient}} = useContext(IngredientContext);
    const {t} = useTranslation();
    const options = [
        {value: 'YEAST', label: 'Drożdże'},
        {value: 'NUTRIENT', label: 'Pożywka'},
        {value: 'ENZYME', label: 'Enzym'},
        {value: 'TANNIN', label: 'Tanina'},
        {value: 'BACTERIA', label: 'Bakteria'},
        {value: 'DEACIDIFICATION', label: 'Odkwaszanie'},
        {value: 'CLARIFICATION', label: 'Klarowanie'},
        {value: 'SUGARING', label: 'Słodzenie'},
        {value: 'ALCOHOL_INCREASING', label: 'Wzmacnianie'},
        {value: 'OTHER', label: 'Inne'}
    ];

    console.log("IngredientForm::render", ingredient);
    return (
            <PageWrapper title={"ingredients.TITLE"} subtitle={'ingredients.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader> {id ? t('sidebar.nav.element.EDIT') : t('sidebar.nav.element.ADD_NEW_HARVEST')}
                    </CardHeader>
                    <CardBody>
                        <Input.Text label={t('ingredients.NAME')}
                                    name={"name"}
                                    defaultValue={name}
                                    onChange={updateIngredient}
                        />
                        <Select label={t('ingredients.TYPE')}
                                name={"type"}
                                value={type ? {value: type, label: t(`ingredients.TYPE.${type}`)} : null}
                                onChange={(selected) => updateIngredient('type', selected.value)}
                                options={options}
                        />
                        <Input.Textarea label={t('ingredients.INFO')}
                                        name={"info"}
                                        defaultValue={info}
                                        onChange={updateIngredient}
                        />
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {id ? t("common.SAVE") : t("common.ADD")}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

export default SimpleIngredientForm;