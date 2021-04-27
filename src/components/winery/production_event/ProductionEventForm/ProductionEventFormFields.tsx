import React, {FC} from "react";
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import InputElement from "../../../common/InputElement";
import CardFooter from "../../../common/cards/CardFooter";
import {SelectProductionEventType} from "./SelectProductionEventTypeType";
import {EventToWineProps} from "./withProductionEventToWineServiceHOC";
import {ProductionEventType} from "../../wine/types/Wine";
import {InputDate} from "../../../common/form-elements/InputDate";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

export const ProductionEventFormFields: FC<EventToWineProps> = ({
                                                                    event,
                                                                    actions: {
                                                                        onChange,
                                                                        updateTypeSelect,
                                                                        updateDate,
                                                                        onSubmit,
                                                                        key
                                                                    },
                                                                    error
                                                                }) => {

    const {t} = useTranslation();
    return (
        <Card className="b" key={key}>
            <CardHeader>
                <h4 className="m-0">{t(event?.id ? 'wine.info.EDIT_EVENT' : 'wine.info.ADD_NEW_EVENT')}</h4>
            </CardHeader>
            <CardBody style={{padding: "7px"}}>
                <SelectProductionEventType value={event?.type}
                                           name={'type'}
                                           label={t('add_ingredient.SELECT_TYPE')}
                                           onChange={updateTypeSelect}
                                           error={error}
                />
                {event?.type === ProductionEventType.OTHER &&
                <InputElement label={t('event.NAME')}
                              name={'name'}
                              defaultValue={event?.name}
                              onChange={onChange}
                              error={error}
                              optional
                />
                }
                <InputDate label={t('event.STARTING_DATE')}
                           name={'startingDate'}
                           defaultValue={event?.startingDate}
                           onChange={updateDate}
                           error={error}
                           showTimeSelect
                />
                <InputDate label={t('event.ENDING_DATE')}
                           name={'endingDate'}
                           defaultValue={event?.endingDate}
                           onChange={updateDate}
                           error={error}
                           optional
                           showTimeSelect
                />
                <InputElement label={t('event.INFO')}
                              type={'textarea'}
                              name={'info'}
                              defaultValue={event?.info}
                              onChange={onChange}
                              error={error}
                              maxSize={'1000'}
                              optional
                />
                <InputElement label={t('event.WASTE')}
                              type={'number'}
                              name={'waste'}
                              defaultValue={event?.waste}
                              onChange={onChange}
                              error={error}
                              optional
                />
                <FormErrorMessage error={error}/>
            </CardBody>
            <CardFooter>
                <Button color="primary" className="btn-square" onClick={event?.id ? onSubmit?.update : onSubmit?.save}>
                    {event?.id ? t("common.SAVE") : t("common.ADD")}
                </Button>
            </CardFooter>
        </Card>
    )
};