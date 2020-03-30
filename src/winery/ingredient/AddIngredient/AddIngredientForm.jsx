import React from 'react';
import {Button, Card, CardBody} from "reactstrap";
import {useTranslation} from "react-i18next";
import Input from "../../../common/form-elements/InputElement";
import Select from "../../../common/form-elements/Select";
import CardFooter from "../../../common/cards/CardFooter";

const AddIngredientForm = ({
                               options: {types, ingredients}, keys: {ingredientKey, key},
                               actions: {handleChange, onSubmit, setType, setIngredient}
                           }) => {

    const {t} = useTranslation();

    return (
            <Card style={{margin: "0px"}}>
                <CardBody style={{padding: "7px"}}>
                    <Select label={t('add_ingredient.SELECT_TYPE')}
                            name={"type"}
                            onChange={setType}
                            options={types}
                            key={"type" + key}
                    />
                    <Select label={t('add_ingredient.SELECT_INGREDIENT')}
                            name={"ingredient"}
                            onChange={setIngredient}
                            options={ingredients}
                            key={"ingredient" + key + ingredientKey}
                    />
                    <Input.Number label={t('add_ingredient.AMOUNT')}
                                  name={"amount"}
                                  onChange={handleChange}
                                  key={"amount" + key}
                    />
                    <Input.Textarea label={t('add_ingredient.NOTES')}
                                    name={"notes"}
                                    onChange={handleChange}
                                    key={"notes" + key}
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

export default AddIngredientForm;