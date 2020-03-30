import React, {useContext, useState} from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import CommonRow from "../../../common/table/CommonRow";
import {useTranslation} from "react-i18next";
import WineService from "../service/WineService";
import {WineContext} from "../WineContext";

const WineIngredientsListBox = ({actions: {edit}}) => {

    const {actions: {setWine}, wine} = useContext(WineContext);
    const {id, ingredients} = wine;
    const {t} = useTranslation();
    const [ingredientToShow, setIngredientToShow] = useState({id: '', isOpen: false});

    const handleClick = (id) => {
        setIngredientToShow({id: id, isOpen: ingredientToShow.id === id ? !ingredientToShow.isOpen : true});
    };

    const removeIngredient = (id, ingredientAddedId) => {
        WineService.deleteIngredient(id, ingredientAddedId)
                .then((wine) => setWine(wine))
                .catch(res => console.log(res));
    };

    return (<Card className="b">
                <CardHeader>
                    <h4 className="m-0">Składniki dodane</h4>
                    <small className="text-muted">Łącznie: {ingredients && ingredients.length}</small>
                </CardHeader>
                {ingredients && ingredients.length > 0 ?
                        <Table className={'table table-hover'}>
                            <tbody>
                            <CommonRow label={'Nazwa:'} value={['Typ:', 'Ilość:']}/>
                            {(ingredients || []).map((i, index) => {
                                return <React.Fragment key={index}>
                                    <CommonRow label={i.name}
                                               value={[t(`ingredients.TYPE.${i.type}`), i.amount + ' g/hl']}
                                               onClick={() => handleClick(i.id)}
                                               style={{cursor: "pointer"}}
                                               key={index}
                                    />
                                    {ingredientToShow.id === i.id && ingredientToShow.isOpen &&
                                    <tr>
                                        <td className={'bg-gray-lighter'} colSpan={2}>
                                            <div style={{whiteSpace: 'pre-wrap'}}>{i.notes}</div>
                                        </td>
                                        <td className={'bg-gray-lighter'}>
                                            <div className="float-right" onClick={() => removeIngredient(id, i.id)}
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
    );
};

export default WineIngredientsListBox;