import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody} from "reactstrap";
import {useTranslation} from "react-i18next";
import CardFooter from "../../../common/cards/CardFooter";
import SelectIngredientType from "../IngredientForm/SelectIngredientType";
import SelectIngredient from "./SelectIngredient";
import InputElement from "../../../common/InputElement";
import {ServiceError} from "../../../../services/types/Service";
import {Ingredient} from "../types/Ingredient";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

interface Props {
    ingredient: Ingredient;
    actions: {
        onSubmit: (e: MouseEvent) => void;
        updateIngredientSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        updateTypeSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        onChange: () => void;
    };
    newKey: number;
    error: ServiceError;
}

const AddIngredientForm: FC<Props> = ({
                                          ingredient,
                                          actions: {onSubmit, updateIngredientSelect, updateTypeSelect, onChange},
                                          newKey,
                                          error
                           }) => {

    const {t} = useTranslation();

    return (
            <Card style={{margin: "0px"}} key={newKey}>
                <CardBody style={{padding: "7px"}}>
                    <SelectIngredientType value={ingredient.type}
                                          name={'type'}
                                          label={t('add_ingredient.SELECT_TYPE')}
                                          onChange={updateTypeSelect}
                                          error={error}
                                          optional
                    />
                    <SelectIngredient value={ingredient.ingredient}
                                      type={ingredient.type}
                                      name={'ingredient'}
                                      label={t('add_ingredient.SELECT_INGREDIENT')}
                                      onChange={updateIngredientSelect}
                                      error={error}
                    />
                    <InputElement label={t('add_ingredient.AMOUNT')}
                                  type={'number'}
                                  name={'amount'}
                                  onChange={onChange}
                                  defaultValue={ingredient.amount}
                                  error={error}
                    />
                    <InputElement label={t('add_ingredient.NOTES')}
                                  type={'textarea'}
                                  name={'notes'}
                                  onChange={onChange}
                                  defaultValue={ingredient.notes}
                                  error={error}
                                  optional
                    />
                    <FormErrorMessage error={error}/>
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