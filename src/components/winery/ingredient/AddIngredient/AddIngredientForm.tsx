import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody} from "reactstrap";
import {useTranslation} from "react-i18next";
import CardFooter from "../../../common/cards/CardFooter";
import {ServiceError} from "../../../../services/types/Service";
import {Ingredient} from "../types/Ingredient";
import {AddIngredientFormFields} from "./AddIngredientFormFields";

interface Props
{
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
                <AddIngredientFormFields ingredient={ingredient}
                                         actions={{updateIngredientSelect, updateTypeSelect, onChange}}
                                         error={error}
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