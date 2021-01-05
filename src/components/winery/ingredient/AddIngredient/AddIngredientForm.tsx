import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody} from "reactstrap";
import {useTranslation} from "react-i18next";
import CardFooter from "../../../common/cards/CardFooter";
import SelectIngredientType from "../IngredientForm/SelectIngredientType";
import {useIngredientContext} from "../IngredientContext";
import SelectIngredient from "./SelectIngredient";
import InputElement from "../../../common/InputElement";
import {useWineContext} from "../../wine/WineContext";

interface Props {
    actions: {
        onSubmit: (e: MouseEvent) => void;
        updateIngredientSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        updateTypeSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    };
    newKey: number;
}

const AddIngredientForm: FC<Props> = ({
                               actions: {onSubmit, updateIngredientSelect, updateTypeSelect}, newKey
                           }) => {

    const {t} = useTranslation();
    const {ingredient, updateIngredient} = useIngredientContext();
    const {wineResult} = useWineContext();

    return (
            <Card style={{margin: "0px"}} key={newKey}>
                <CardBody style={{padding: "7px"}}>
                    <SelectIngredientType value={ingredient?.type}
                                          name={'type'}
                                          label={t('add_ingredient.SELECT_TYPE')}
                                          onChange={updateTypeSelect}
                                          showErrors={wineResult?.hasError?.("type")}
                                          errorMessage={wineResult?.getErrorMessage?.("type")}
                                          optional
                    />
                    <SelectIngredient value={ingredient?.ingredient}
                                      type={ingredient?.type}
                                      name={'ingredient'}
                                      label={t('add_ingredient.SELECT_INGREDIENT')}
                                      onChange={updateIngredientSelect}
                                      showErrors={wineResult?.hasError?.("ingredient")}
                                      errorMessage={wineResult?.getErrorMessage?.("ingredient")}
                    />
                    <InputElement label={t('add_ingredient.AMOUNT')}
                                  type={'number'}
                                  name={'amount'}
                                  onChange={e => updateIngredient(e.target.name, e.target.value)}
                                  defaultValue={ingredient?.amount}
                                  showErrors={wineResult?.hasError?.("amount")}
                                  errorMessage={wineResult?.getErrorMessage?.("amount")}
                    />
                    <InputElement label={t('add_ingredient.NOTES')}
                                  type={'textarea'}
                                  name={'notes'}
                                  onChange={e => updateIngredient(e.target.name, e.target.value)}
                                  defaultValue={ingredient?.notes}
                                  showErrors={wineResult?.hasError?.("notes")}
                                  errorMessage={wineResult?.getErrorMessage?.("notes")}
                                  optional
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