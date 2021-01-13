import React, {FC} from "react";
import PageWrapper from "../../../common/PageWrapper";
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import InputElement from "../../../common/InputElement";
import CardFooter from "../../../common/cards/CardFooter";
import {SelectProductionEventType} from "./SelectProductionEventTypeType";
import {EventToWineProps} from "./withProductionEventToWineServiceHOC";
import {ProductionEventType} from "../../wine/types/Wine";

export const AddEventToWinePresentation: FC<EventToWineProps> = ({
                                                                     loading,
                                                                     event,
                                                                     onChange,
                                                                     updateTypeSelect,
                                                                     onSubmit,
                                                                     error,
                                                                     newKey
                                                                 }) => {

    const {t} = useTranslation();

    return (
        <PageWrapper loading={loading} disabled>
            <Card className="b" key={newKey}>
                <CardHeader>
                    <h4 className="m-0">{t('wine.info.ADD_NEW_EVENT')}</h4>
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
                    <InputElement label={t('event.STARTING_DATE')}
                                  name={'startingDate'}
                                  defaultValue={event?.startingDate}
                                  type={'date'}
                                  onChange={onChange}
                                  error={error}
                    />
                    <InputElement label={t('event.ENDING_DATE')}
                                  type={'date'}
                                  name={'endingDate'}
                                  defaultValue={event?.endingDate}
                                  onChange={onChange}
                                  error={error}
                                  optional
                    />
                    <InputElement label={t('event.INFO')}
                                  type={'textarea'}
                                  name={'info'}
                                  defaultValue={event?.info}
                                  onChange={onChange}
                                  error={error}
                                  optional
                    />
                    <InputElement label={t('event.WASTE')}
                                  type={'number'}
                                  name={'waste'}
                                  defaultValue={event?.info}
                                  onChange={onChange}
                                  error={error}
                                  optional
                    />
                </CardBody>
                <CardFooter>
                    <Button color="primary" className="btn-square" onClick={onSubmit}>
                        {event?.id ? t("common.SAVE") : t("common.ADD")}
                    </Button>
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};