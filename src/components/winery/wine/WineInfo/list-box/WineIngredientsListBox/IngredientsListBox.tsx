import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {useTranslation} from "react-i18next";
import CommonRow from "../../../../../common/table/CommonRow";
import {Ingredient} from "../../../../ingredient/types/Ingredient";
import PageWrapper from "../../../../../common/PageWrapper";
import {useWineContext} from "../../../WineContext";
import {CommonListBox, ListBoxActions, ListBoxElementToShow} from "../shared/CommonListBox";

interface Props
{
    ingredients: Ingredient[],
    ingredientToShow: ListBoxElementToShow
    actions: ListBoxActions
}

const IngredientsListBox: React.FC<Props> = ({
                                                 ingredients,
                                                 ingredientToShow,
                                                 actions
                                             }) => {

    const {t} = useTranslation();
    const {loading, wine} = useWineContext();

    return (
        <PageWrapper loading={loading} disabled>
            <Card className="b">
                <CardHeader>
                    <h4 className="m-0">{t('wine.info.ADDED_INGREDIENTS')}</h4>
                    <small className="text-muted">{t('common.SUMMARY')}: {ingredients?.length}</small>
                </CardHeader>
                {ingredients?.length ?
                    <Table className={'table table-striped table-bordered table-hover'}>
                        <tbody>
                        <CommonRow label={`${t('common.NAME')}:`}
                                   value={[`${t('common.TYPE')}:`, `${t('common.QUANTITY')}:`]}/>
                        {(ingredients || []).map((i, key) => {
                            return <CommonListBox header={[
                                i.name || "",
                                t(`ingredients.TYPE.${i.type}`),
                                i.amount + ' g/hl'
                            ]}
                                                  actions={actions}
                                                  elementToSHow={ingredientToShow}
                                                  path={`wine/ingredient/${wine?.id}`}
                                                  elementId={i?.id}
                                                  dropdownInfo={{
                                                      paragraph: i.notes || t('ingredients.INFO.no_data')
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

export default IngredientsListBox;