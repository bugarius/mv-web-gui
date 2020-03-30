import React, {useEffect, useState} from "react";
import GrapevineService from "../grapevine/service/GrapevineService";

const GrapevinesReceiver = ({history, render}) => {

    const [grapevines, setGrapevines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GrapevineService.getAll()
                .then(grapevines => {
                    const options = grapevines
                            .map((p) => ({value: p.id, label: p.name}));
                    setGrapevines(options);
                    setLoading(false);
                })
                .catch(res => {
                    history.push(`/error/${res.status}`);
                });
    }, []);

    return render(grapevines, loading);
};

export default GrapevinesReceiver;