import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {useTranslation} from "react-i18next";
import CommonRow from "../../../../../common/table/CommonRow";
import PropTypes from 'prop-types';
import PageWrapper from "../../../../../common/PageWrapper";
import {useWineContext} from "../../../WineContext";
import {ProductionEvent, ProductionEventType} from "../../../types/Wine";

interface Props
{
    events: ProductionEvent[],
    eventToShow: {
        id?: number,
        isOpen?: boolean
    },
    actions: {
        toggleShow?: (id) => void;
        removeElement?: (id) => void;
        editElement?: (entityName, id) => void;
    }
}

const EventsListBox: React.FC<Props> = ({events, eventToShow, actions: {toggleShow, removeElement, editElement}}) => {

    const {t} = useTranslation();
    const {loading} = useWineContext();

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
                        <CommonRow label={`${t('common.TYPE')}:`} value={[`${t('common.START')}:`, `${t('event.WASTE')}:`]}/>
                        {(events || []).map((i, index) => {
                            return <React.Fragment key={index}>
                                <CommonRow label={i.type === ProductionEventType.OTHER ? i.name : t(`event.type.${i.type}`)}
                                           value={[i.startingDate, i.waste || "-"]}
                                           onClick={() => toggleShow?.(i.id)}
                                           style={{cursor: "pointer"}}
                                           key={index}
                                />
                                {eventToShow.id === i.id && eventToShow.isOpen &&
                                <tr>
                                    <td className={'bg-gray-lighter'} colSpan={2}>
                                        <div style={{whiteSpace: 'pre-wrap'}}>{i.info || t('common.NO_INFO')}</div>
                                    </td>
                                    <td className={'bg-gray-lighter'}>
                                        <div className="float-right">
                                            <em className="fa-2x mr-2 far fa-trash-alt btn-sm" onClick={() => removeElement?.(i.id)}
                                                style={{cursor: 'pointer'}}/>
                                            <em className="fa-2x mr-2 far fa-edit btn-sm" onClick={() => editElement?.("event", i.id)}
                                                style={{cursor: 'pointer'}}/>
                                        </div>
                                    </td>
                                </tr>
                                }
                            </React.Fragment>
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

EventsListBox.propTypes = {
    events: PropTypes.array.isRequired,
    eventToShow: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool])).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default EventsListBox;