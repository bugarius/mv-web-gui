import React from "react";
import {Card, CardBody} from "reactstrap";
import {useIngredientContext} from "./IngredientContext";
import {useTranslation} from "react-i18next";

const IngredientInfoPanelTab = () => {

    const {ingredient} = useIngredientContext();
    const {t} = useTranslation();

    return (
        <>
            {ingredient?.ingredient?.id ?
                <Card style={{marginBottom: "0px"}} className={'p-2'}>
                    <CardBody>
                        <p className='text-bold'>{ingredient?.ingredient?.name}</p>
                        <p style={{whiteSpace: 'pre-wrap'}}>{ingredient?.ingredient?.info}</p>
                    </CardBody>
                </Card>
                : <Card style={{marginBottom: "0px"}}>
                    <CardBody className={'text-center'}><p>{t('add_ingredient.NO_INGREDIENT_SELECTED')}</p></CardBody>
                </Card>
            }
            </>
    )
};

export default IngredientInfoPanelTab;