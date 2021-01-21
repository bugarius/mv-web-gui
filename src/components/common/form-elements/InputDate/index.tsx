import React, {FC} from "react";
import {InputElementSection} from "../InputElement/InputElementSection";
import {InputDateProps, InputElementDateItem} from "./InputElementDateItem";

export const InputDate: FC<InputDateProps & {label: string, optional?: boolean}> = (props) => {
      return (
          <InputElementSection label={{text: props?.label, optional: props?.optional}}>
              <InputElementDateItem {...props} />
          </InputElementSection>
      )
};