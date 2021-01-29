import React, {ChangeEvent, FC} from 'react';
import {useTranslation} from "react-i18next";
import SelectIngredientType from "../../IngredientForm/SelectIngredientType";
import SelectIngredient from "./SelectIngredient";
import InputElement from "../../../../common/InputElement";
import {ServiceError} from "../../../../../services/types/Service";
import {Ingredient} from "../../types/Ingredient";
import {FormErrorMessage} from "../../../../common/notifications/FormErrorMessage";
import {InputDate} from "../../../../common/form-elements/InputDate";

interface Props
{
    ingredient: Ingredient;
    actions: {
        updateIngredientSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        updateTypeSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        onChange: () => void;
        updateDate: () => void;
    };
    error: ServiceError;
    editing?: boolean;
}

export const AddIngredientFormFields: FC<Props> = ({
                                                       ingredient,
                                                       actions: {updateIngredientSelect, updateTypeSelect, onChange, updateDate},
                                                       error,
                                                       editing
                                                   }) => {

    const {t} = useTranslation();

    return (
        <>
            <SelectIngredientType value={ingredient.type}
                                  name={'type'}
                                  label={t('add_ingredient.SELECT_TYPE')}
                                  onChange={updateTypeSelect}
                                  error={error}
                                  optional
                                  disabled={editing}
            />
            <SelectIngredient value={ingredient.ingredient}
                              type={ingredient.type}
                              name={'ingredient'}
                              label={t('add_ingredient.SELECT_INGREDIENT')}
                              onChange={updateIngredientSelect}
                              error={error}
                              disabled={editing}
            />
            <InputDate label={t('add_ingredient.APPLIED_DATE')}
                       name={'appliedDate'}
                       defaultValue={ingredient?.appliedDate}
                       onChange={updateDate}
                       error={error}
                       showTimeSelect
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
        </>
    )
};