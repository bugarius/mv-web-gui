import React from 'react';
import PropTypes from 'prop-types';
import TimelineElement from "./TimelineElement";
import TimelineSection from "./TimelineSection";
import ContentWrapper from "../../Layout/ContentWrapper";
import {History} from "../../winery/wine/types/History";
import {useTranslation} from "react-i18next";

interface Props
{
    history?: History[];
}

const Timeline: React.FC<Props> = ({history}) => {

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

Timeline.propTypes = {
  history: PropTypes.array.isRequired
};

export default Timeline;
