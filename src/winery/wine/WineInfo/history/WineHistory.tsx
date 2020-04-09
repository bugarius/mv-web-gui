import {History} from "../../types/History";
import React from "react";
import {useTranslation} from "react-i18next";
import ContentWrapper from "../../../../components/Layout/ContentWrapper";
import TimelineSection from "../../../../common/Timeline/TimelineSection";
import TimelineElement from "../../../../common/Timeline/TimelineElement";
import PropTypes from "prop-types";

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
                            const subHeader = (item?.actionType ? t(`ingredients.TYPE.${item?.actionType}`) + ": " :"")
                                + (item?.message && item?.message);
                            return <TimelineElement historyItem={item}
                                                    inverted={index % 2 === 1}
                                                    key={index}
                                                    header={t(`history.status.${item?.status}`)}
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