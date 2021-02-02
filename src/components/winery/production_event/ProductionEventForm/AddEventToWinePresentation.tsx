import React, {FC} from "react";
import PageWrapper from "../../../common/PageWrapper";
import {EventToWineProps} from "./withProductionEventToWineServiceHOC";
import {ProductionEventFormFields} from "./ProductionEventFormFields";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

export const AddEventToWinePresentation: FC<EventToWineProps & { loading: boolean }> = ({
                                                                                            loading,
                                                                                            event,
                                                                                            actions,
                                                                                            error
                                                                                        }) => {

    const {t} = useTranslation();
    const {productionEventId} = useParams();

    return (
        <PageWrapper loading={loading} title={t('wine.info.EVENTS')} subtitle={t('common.EDIT')}
                     disabled={!productionEventId}>
            <ProductionEventFormFields event={event} actions={actions} error={error} />
        </PageWrapper>
    )
};