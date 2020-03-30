import React, {useEffect, useState} from "react";
import ParcelService from "../parcel/service/ParcelService";

const ParcelsReceiver = ({history, render}) => {

    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ParcelService.getAll()
                .then(parcels => {
                    const options = parcels
                            .map((p) => ({value: p.id, label: p.registrationNumber + " - " + p.district}));
                    setParcels(options);
                    setLoading(false);
                })
                .catch(res => {
                    history.push(`/error/${res.status}`);
                });
    }, []);

    return render(parcels, loading);
};

export default ParcelsReceiver;