import React from "react";
import {WineEventsListBoxContainer} from "./WineEventsListBoxContainer";
import EventsListBox from "./EventsListBox";

export const WineEventsListBox = () => {

    return (
        <WineEventsListBoxContainer render={(events, eventToShow, actions) => (
            <EventsListBox events={events} eventToShow={eventToShow} actions={actions}/>
        )}/>
    )
};