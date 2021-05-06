import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import SelectIngredientType from "./SelectIngredientType";
import {ServiceError} from "../../../../services/types/Service";
import InputElement from "../../../common/InputElement";
import {Ingredient} from "../types/Ingredient";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    updateIngredientType: () => void;
    error: ServiceError;
    ingredient: Ingredient;
    updateIngredient: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    onClickBack: () => void;
}

export const SimpleIngredientForm: FC<Props> = ({
                                                    onSubmit,
                                                    updateIngredientType,
                                                    error,
                                                    ingredient,
                                                    updateIngredient,
                                                    loading,
                                                    onClickBack
                                                }) => {

    const {t} = useTranslation();
    return (
        <PageWrapper title={"ingredients.TITLE"} subtitle={'ingredients.LIST'}
                     loading={loading} disabled={false}>
            <Card className="card-default">
                <CardHeader> {ingredient?.id ? t('sidebar.nav.element.EDIT') : t('sidebar.nav.element.ADD_NEW_HARVEST')}
                </CardHeader>
                <CardBody>
                    <InputElement label={t('ingredients.NAME')}
                                  type={'text'}
                                  name={"name"}
                                  maxSize={'100'}
                                  defaultValue={ingredient?.name}
                                  onChange={updateIngredient}
                                  error={error}
                                  disabled={ingredient?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <SelectIngredientType value={ingredient?.type}
                                          name={'type'}
                                          label={t('ingredients.TYPE')}
                                          onChange={updateIngredientType}
                                          error={error}
                                          disabled={ingredient?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <InputElement label={t('ingredients.INFO')}
                                  name={"info"}
                                  type={"textarea"}
                                  defaultValue={ingredient?.info}
                                  onChange={updateIngredient}
                                  error={error}
                                  optional
                                  disabled={ingredient?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <FormErrorMessage error={error} messageType={"details"}/>
                </CardBody>
                <CardFooter className="text-center">
                    {ingredient?.liveStatus === EntityLiveStatus.ARCHIVED ?
                        <Button color="primary" className="btn-square" onClick={onClickBack}>
                            {t("common.BACK")}
                        </Button>
                        :
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {ingredient?.id ? t("common.SAVE") : t("common.ADD")}
                        </Button>
                    }
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};