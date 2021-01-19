import React, {FC} from 'react';
import {Button, Card, CardBody} from "reactstrap";
import {useTranslation} from "react-i18next";
import CardFooter from "../../../../common/cards/CardFooter";
import {AddIngredientFormFields} from "../shared/AddIngredientFormFields";
import {IngredientFormProps} from "../shared/withIngredientServiceHOC";

const AddIngredientForm: FC<IngredientFormProps> = ({
                                          ingredient,
                                          actions: {onSubmit, updateIngredientSelect, updateTypeSelect, onChange},
                                          key,
                                          error
                                      }) => {

    const {t} = useTranslation();

    return (
        <Card style={{margin: "0px"}} key={key}>
            <CardBody style={{padding: "7px"}}>
                <AddIngredientFormFields ingredient={ingredient}
                                         actions={{updateIngredientSelect, updateTypeSelect, onChange}}
                                         error={error}
                />
            </CardBody>
            <CardFooter>
                <Button color="primary" className="btn-square" onClick={onSubmit.save}>
                    {t("common.ADD")}
                </Button>
            </CardFooter>
        </Card>
    )
};

export default AddIngredientForm;