import React from 'react';
import ContentWrapper from "../../../components/Layout/ContentWrapper";
import TimelineSection from "../../../common/timeline/TimelineSection";
import TimelineElement from "../../../common/timeline/TimelineElement";
import {useWineContext} from "../WineContext";

const Timeline = () => {

    const {wine} = useWineContext();

    return (
            <ContentWrapper>
                {wine?.history?.length ?
                        <TimelineSection>
                            {
                                wine?.history?.map((item, index) => {
                                    return <TimelineElement historyItem={item}
                                                            inverted={index % 2 === 1}
                                                            key={item?.date}
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

export default Timeline;
