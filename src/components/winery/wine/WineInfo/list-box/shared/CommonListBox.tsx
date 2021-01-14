import React, {FC} from "react";
import CommonRow from "../../../../../common/table/CommonRow";
import {BoxListActionsButtons} from "../../../../../common/buttons/BoxListActionButtons";
import {useTranslation} from "react-i18next";

interface Props
{
    header: string[]
    actions: ListBoxActions;
    elementToSHow: ListBoxElementToShow;
    entityName: "event" | "ingredient/applied";
    elementId?: number | null;
    dropdownInfo: { paragraph?: string, footer?: { label: string, value?: string } };
}

export interface ListBoxActions
{
    toggleShow?: (id) => void;
    removeElement?: (id) => void;
    editElement?: (entityName, id) => void;
}

export interface ListBoxElementToShow
{
    id?: number,
    isOpen?: boolean
}

export const CommonListBox: FC<Props> = ({
                                             header,
                                             actions: {toggleShow, editElement, removeElement},
                                             elementToSHow,
                                             entityName,
                                             elementId,
                                             dropdownInfo
                                         }) => {

    const {t} = useTranslation();

    return (
        <>
            <CommonRow
                label={header?.[0]}
                value={header?.slice(1)}
                onClick={() => toggleShow?.(elementId)}
                style={{cursor: "pointer"}}
                className={elementToSHow.id === elementId && elementToSHow.isOpen ? 'border-primary bg-primary' : ""}
            />
            {elementToSHow.id === elementId && elementToSHow.isOpen &&
            <tr>
                <td className='bg-light border-primary' colSpan={3}>
                    <div className='float-left pb-2' style={{whiteSpace: 'pre-wrap'}}>
                        <p>{dropdownInfo?.paragraph || t('common.NO_INFO')}</p>
                        {dropdownInfo?.footer?.value &&
                        <p className='m-0'>{`${dropdownInfo?.footer?.label}: ${dropdownInfo?.footer?.value}`}</p>}
                    </div>
                    <BoxListActionsButtons actions={{
                        editElement: () => editElement?.(entityName, elementId),
                        removeElement: () => removeElement?.(elementId)
                    }}
                    />
                </td>
            </tr>
            }
        </>
    )
};