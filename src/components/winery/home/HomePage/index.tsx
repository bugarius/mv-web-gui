import React, {useEffect} from "react";
import useWineService from "../../wine/service/useWineService";
import {useWineContext} from "../../wine/WineContext";
import WineInfoBox from "../../wine/WineInfo/WineInfoBox";
import PageWrapper from "../../../common/PageWrapper";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Wine} from "../../wine/types/Wine";
import {Card, CardBody} from "reactstrap";
import {usePushHistory} from "../../common/usePushHistory";

export const BoardPage = () => {

    const {pushHistory} = usePushHistory();
    const service = useWineService();
    const {wineResult: result, setWineResult: setResult, wines, loading, setWines} = useWineContext();

    useEffect(() => {
        if (result.status === StatusType.loading)
        {
            service.getList()
                .then(response => {
                    setResult({status: StatusType.loaded});
                    setWines(response);
                })
                .catch(response => setResult(new ResponseError<Wine[]>(response)))
        }
    })

    const editWineInfo = (wineId) => {
        pushHistory(`/mv/wine/info/${wineId}`);
    };

    return (
        <PageWrapper title={"home.TITLE"}>
            <div className={"row"}>
                {wines?.length ?
                    wines.map(wine => {
                        return (
                            <div className={"col-xl-4 col-lg-6"} key={wine?.id?.toString()}>
                                <WineInfoBox button={{
                                    action: () => editWineInfo(wine?.id),
                                    label: "Zarządzaj"
                                }}
                                             wine={wine}
                                             loading={loading}
                                />
                            </div>
                        )
                    })
                    :
                    <Card className="b block-center"><CardBody>Wszystkie zbiorniki są puste</CardBody></Card>
                }
            </div>
        </PageWrapper>
    )
};