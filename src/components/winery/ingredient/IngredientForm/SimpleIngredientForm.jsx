import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import Input from "../../../common/form-elements/InputElement";
import {useIngredientContext} from "../IngredientContext";
import SelectIngredientType from "./SelectIngredientType";
import PropTypes from 'prop-types';

const SimpleIngredientForm = ({onSubmit}) => {

    const {ingredient, updateIngredient, loading} = useIngredientContext();

    const {t} = useTranslation();
    return (
            <PageWrapper title={"ingredients.TITLE"} subtitle={'ingredients.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader> {ingredient?.id ? t('sidebar.nav.element.EDIT') : t('sidebar.nav.element.ADD_NEW_HARVEST')}
                    </CardHeader>
                    <CardBody>
                        <Input.Text label={t('ingredients.NAME')}
                                    name={"name"}
                                    defaultValue={ingredient?.name}
                                    onChange={updateIngredient}
                        />
                        <SelectIngredientType value={ingredient?.type}
                                              name={'type'}
                                              label={'Typ'}
                                              onChange={(selected) => updateIngredient('type', selected.value)}
                        />
                        <Input.Textarea label={t('ingredients.INFO')}
                                        name={"info"}
                                        defaultValue={ingredient?.info}
                                        onChange={updateIngredient}
                        />
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {ingredient?.id ? t("common.SAVE") : t("common.ADD")}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

SimpleIngredientForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SimpleIngredientForm;