import React from 'react';
import {Button, Card, CardBody} from "reactstrap";
import {useTranslation} from "react-i18next";
import CardFooter from "../../../common/cards/CardFooter";
import SelectIngredientType from "../IngredientForm/SelectIngredientType";
import {useIngredientContext} from "../IngredientContext";
import SelectIngredient from "./SelectIngredient";
import InputElement from "../../../common/InputElement";
import PropTypes from 'prop-types';

const AddIngredientForm = ({
                               actions: {onSubmit, updateIngredientSelect, updateTypeSelect}, newKey
                           }) => {

    const {t} = useTranslation();
    const {ingredient, updateIngredient} = useIngredientContext();

    return (
            <Card style={{margin: "0px"}} key={newKey}>
                <CardBody style={{padding: "7px"}}>
                    <SelectIngredientType value={ingredient?.type}
                                          name={'type'}
                                          label={t('add_ingredient.SELECT_TYPE')}
                                          onChange={updateTypeSelect}
                    />
                    <SelectIngredient value={ingredient?.ingredient}
                                      type={ingredient?.type}
                                      name={'ingredient'}
                                      label={t('add_ingredient.SELECT_INGREDIENT')}
                                      onChange={updateIngredientSelect}
                    />
                    <InputElement label={t('add_ingredient.AMOUNT')}
                                  type={'number'}
                                  name={'amount'}
                                  onChange={e => updateIngredient(e.target.name, e.target.value)}
                                  defaultValue={ingredient?.amount}
                    />
                    <InputElement label={t('add_ingredient.NOTES')}
                                  type={'textarea'}
                                  name={'notes'}
                                  onChange={e => updateIngredient(e.target.name, e.target.value)}
                                  defaultValue={ingredient?.notes}
                    />
                </CardBody>
                <CardFooter>
                    <Button color="primary" className="btn-square" onClick={onSubmit}>
                        {t("common.ADD")}
                    </Button>
                </CardFooter>
            </Card>
    )
};

AddIngredientForm.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    newKey: PropTypes.any.isRequired
};

export default AddIngredientForm;