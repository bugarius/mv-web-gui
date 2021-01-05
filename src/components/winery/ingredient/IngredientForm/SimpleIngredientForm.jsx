import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import {useIngredientContext} from "../IngredientContext";
import SelectIngredientType from "./SelectIngredientType";
import PropTypes from 'prop-types';
import {StatusType} from "../../../../services/types/Service";
import InputElement from "../../../common/InputElement";

const SimpleIngredientForm = ({onSubmit}) => {

    const {ingredient, updateIngredient, ingredientResult} = useIngredientContext();

    const {t} = useTranslation();
    return (
            <PageWrapper title={"ingredients.TITLE"} subtitle={'ingredients.LIST'}
                         loading={ingredientResult.status === StatusType.loading} disabled={false}>
                <Card className="card-default">
                    <CardHeader> {ingredient?.id ? t('sidebar.nav.element.EDIT') : t('sidebar.nav.element.ADD_NEW_HARVEST')}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={t('ingredients.NAME')}
                                      type={'text'}
                                      name={"name"}
                                      maxSize={'100'}
                                      defaultValue={ingredient?.name}
                                      onChange={e => updateIngredient(e.target.name, e.target.value)}
                                      showErrors={ingredientResult?.hasError?.("name")}
                                      errorMessage={ingredientResult?.getErrorMessage?.("name")}
                        />
                        <SelectIngredientType value={ingredient?.type}
                                              name={'type'}
                                              label={t('ingredients.TYPE')}
                                              onChange={(selected) => updateIngredient('type', selected.value)}
                                              showErrors={ingredientResult?.hasError?.("type")}
                                              errorMessage={ingredientResult?.getErrorMessage?.("type")}
                        />
                        <InputElement   label={t('ingredients.INFO')}
                                        name={"info"}
                                        type={"textarea"}
                                        defaultValue={ingredient?.info}
                                        onChange={e => updateIngredient(e.target.name, e.target.value)}
                                        showErrors={ingredientResult?.hasError?.("info")}
                                        errorMessage={ingredientResult?.getErrorMessage?.("info")}
                                        optional
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