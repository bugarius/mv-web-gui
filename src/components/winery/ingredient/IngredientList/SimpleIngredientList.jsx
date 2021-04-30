import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import PageWrapper from "../../../common/PageWrapper";
import {Trans, useTranslation} from "react-i18next";
import ListActions from "../../../common/ListActions";
import Pagination from "../../../common/pagination/Pagination";
import {useParams} from "react-router-dom";

const SimpleIngredientList = ({
                                  ingredients,
                                  page,
                                  pagination,
                                  limit,
                                  loading,
                                  paginationActions: {changePage, onPrev, onNext},
                                  entityActions: {remove, proceed, archive, revertArchive},
                                  children
                              }) => {

    const {t} = useTranslation();
    const {status} = useParams();

    const addTHead = function (label, hide) {
        !hide && this.push(<th className="text-center" key={this.length}>{label}</th>);
    };

    const addField = function (label, hide) {
        !hide && this.push(<td className="text-center text-muted" key={this.length}>{label}</td>);
    };

    const prepareTHead = () => {
        const thead = [];
        thead.add = addTHead;

        thead.add('#');
        thead.add('Nazwa');
        thead.add('Rodzaj');
        thead.add('Informacje');
        thead.add('Akcje');
        return thead;
    };

    const createTHead = () => {
        const thead = prepareTHead();
        return <thead>
        <tr>
            {thead.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
        </thead>;
    };

    const buildRow = (ingredient, index) => {
        const {id, name, info: information, type} = ingredient;
        const fields = [];
        fields.add = addField;

        fields.add(id);
        fields.add(name);
        fields.add(t(`ingredients.TYPE.${type}`));
        fields.add(information && information.split(".")[0] + "...");
        fields.add(<ListActions entity={ingredient}
                                actions={{remove: remove, proceed: proceed, archive: archive, revertArchive: revertArchive}}
                                status={status}
        />);
        return <tr key={index}>{fields.filter((t, index) => index < limit || index === fields.length - 1)}</tr>;
    };

    return (
            <PageWrapper title={"ingredients.TITLE"} subtitle={'ingredients.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader><Trans i18nKey="sidebar.nav.element.INGREDIENTS_LIST"/></CardHeader>
                    <CardBody>
                        <Table hover>
                            {
                                createTHead()
                            }
                            <tbody>
                            {(ingredients || []).map((ingredient, index) => (buildRow(ingredient, index)))}
                            {
                                ingredients && ingredients.length === 0 &&
                                <tr>
                                    <td style={{textAlign: 'center'}} colSpan={'100%'}>
                                        Brak danych
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </Table>
                        {children}
                        {
                            (pagination.totalPages > 1) && <Pagination
                                    page={page}
                                    pagination={pagination}
                                    actions={{
                                        changePage: changePage,
                                        prev: onPrev,
                                        next: onNext
                                    }}/>
                        }
                    </CardBody>
                </Card>
            </PageWrapper>
    );
};

export default SimpleIngredientList;