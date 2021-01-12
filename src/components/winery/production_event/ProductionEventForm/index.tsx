import React from "react";
import {AddEventToWinePresentation} from "./AddEventToWinePresentation";
import {withProductionEventToWineServiceHOC} from "./withProductionEventToWineServiceHOC";

export const ProductionEventForm = () => {

    const ProductionEventFormWithEventToWineService = withProductionEventToWineServiceHOC(AddEventToWinePresentation);

    return <ProductionEventFormWithEventToWineService/>
};