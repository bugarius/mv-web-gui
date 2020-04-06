import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {useTranslation} from "react-i18next";
import CommonRow from "../../../../common/table/CommonRow";
import PropTypes from 'prop-types';
import {Ingredient} from "../../../ingredient/types/Ingredient";
import PageWrapper from "../../../../common/PageWrapper";
import {useWineContext} from "../../WineContext";

interface Props
{
    ingredients: Ingredient[],
    ingredientToShow: {
        id?: number,
        isOpen?: boolean
    },
    actions: {
        handleClick?: (id) => void;
        removeIngredient?: (id) => void
    }
}

const IngredientsListBox: React.FC<Props> = ({ingredients, ingredientToShow, actions: {handleClick, removeIngredient}}) => {

    const {t} = useTranslation();
    const {loading} = useWineContext();

    return (
        <PageWrapper loading={loading} disabled>
            <Card className="b">
                <CardHeader>
                    <h4 className="m-0">Składniki dodane</h4>
                    <small className="text-muted">Łącznie: {ingredients?.length}</small>
                </CardHeader>
                {ingredients?.length ?
                    <Table className={'table table-hover'}>
                        <tbody>
                        <CommonRow label={'Nazwa:'} value={['Typ:', 'Ilość:']}/>
                        {(ingredients || []).map((i, index) => {
                            return <React.Fragment key={index}>
                                <CommonRow label={i.name}
                                           value={[t(`ingredients.TYPE.${i.type}`), i.amount + ' g/hl']}
                                           onClick={() => handleClick?.(i.id)}
                                           style={{cursor: "pointer"}}
                                           key={index}
                                />
                                {ingredientToShow.id === i.id && ingredientToShow.isOpen &&
                                <tr>
                                    <td className={'bg-gray-lighter'} colSpan={2}>
                                        <div style={{whiteSpace: 'pre-wrap'}}>{i.notes}</div>
                                    </td>
                                    <td className={'bg-gray-lighter'}>
                                        <div className="float-right" onClick={() => removeIngredient?.(i.id)}
                                             style={{cursor: 'pointer'}}>
                                            <em className="fa-2x mr-2 far fa-trash-alt btn-md"/>
                                        </div>
                                    </td>
                                </tr>
                                }
                            </React.Fragment>
                        })}
                        </tbody>
                    </Table>
                    : <CardBody>
                        <div className={'text-center'}>Nie dodano</div>
                    </CardBody>
                }
            </Card>
        </PageWrapper>
    );
};

IngredientsListBox.propTypes = {
    ingredients: PropTypes.array.isRequired,
    ingredientToShow: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool])).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default IngredientsListBox;