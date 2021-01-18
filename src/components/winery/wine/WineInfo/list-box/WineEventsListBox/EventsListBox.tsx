import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {useTranslation} from "react-i18next";
import CommonRow from "../../../../../common/table/CommonRow";
import PageWrapper from "../../../../../common/PageWrapper";
import {useWineContext} from "../../../WineContext";
import {ProductionEvent, ProductionEventType} from "../../../types/Wine";
import {CommonListBox, ListBoxActions, ListBoxElementToShow} from "../shared/CommonListBox";

interface Props
{
    events: ProductionEvent[],
    eventToShow: ListBoxElementToShow
    actions: ListBoxActions
}

const EventsListBox: React.FC<Props> = ({events, eventToShow, actions}) => {

    const {t} = useTranslation();
    const {loading, wine} = useWineContext();

    return (
        <PageWrapper loading={loading} disabled>
            <Card className="b">
                <CardHeader>
                    <h4 className="m-0">{t('wine.info.ADDED_EVENTS')}</h4>
                    <small className="text-muted">{t('common.SUMMARY')}: {events?.length}</small>
                </CardHeader>
                {events?.length ?
                    <Table className={'table table-striped table-bordered table-hover'}>
                        <tbody>
                        <CommonRow label={`${t('common.TYPE')}:`}
                                   value={[`${t('common.START')}:`, `${t('event.WASTE')}:`]}/>
                        {(events || []).map((i, key) => {
                            return <CommonListBox header={[
                                (i.type === ProductionEventType.OTHER ? i.name || "" : t(`event.type.${i.type}`)),
                                i.startingDate,
                                (i?.waste?.toString() || "-")
                            ]}
                                                  actions={actions}
                                                  elementToSHow={eventToShow}
                                                  path={`wine/${wine?.id}/event`}
                                                  elementId={i?.id}
                                                  dropdownInfo={{
                                                      paragraph: i.info,
                                                      footer: {
                                                          label: t('event.PROCESS_ENDING_DATE'),
                                                          value: i.endingDate
                                                      }
                                                  }}
                                                  key={key}
                            />
                        })}
                        </tbody>
                    </Table>
                    : <CardBody>
                        <div className={'text-center'}>{t('common.NO_DATA')}</div>
                    </CardBody>
                }
            </Card>
        </PageWrapper>
    );
};

export default EventsListBox;