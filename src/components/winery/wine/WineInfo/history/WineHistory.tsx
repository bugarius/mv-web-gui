import {History} from "../../types/History";
import React from "react";
import {useTranslation} from "react-i18next";
import ContentWrapper from "../../../../Layout/ContentWrapper";
import TimelineSection from "../../../../common/Timeline/TimelineSection";
import TimelineElement from "../../../../common/Timeline/TimelineElement";
import PropTypes from "prop-types";
import {Color} from "../../../../common/enums/Color";
import {FromApiConverter} from "../../../../../services/Converters";

interface Props
{
    history?: History[];
}

const WineHistory: React.FC<Props> = ({history}) => {

    const {t} = useTranslation();

    return (
        <ContentWrapper>
            {history?.length ?
                <TimelineSection>
                    {
                        history?.map((item, index) => {
                            const subHeader = (item?.actionType ? t(`history.ACTION_TYPE.${item?.actionType}`) :"")
                                + (item?.message ? `: ${item?.message}` : "");
                            return <TimelineElement historyItem={item}
                                                    inverted={item?.status === "APPLIED_INGREDIENT"}
                                                    iconBg={item?.status === "APPLIED_INGREDIENT" ? Color.Green : Color.Blue}
                                                    key={index}
                                                    header={t(`history.status.${item?.status}`)}
                                                    date={item?.status === 'CREATED' ?
                                                        FromApiConverter.convertDate(item?.createdItemDate)
                                                        : FromApiConverter.convertDateTime(item?.createdItemDate)
                                                    }
                                                    subHeader={subHeader}
                            />
                        })
                    }
                </TimelineSection>
                :
                <div className="text-center">Brak historii</div>
            }
        </ContentWrapper>
    );
}

WineHistory.propTypes = {
    history: PropTypes.array.isRequired
};

export default WineHistory;