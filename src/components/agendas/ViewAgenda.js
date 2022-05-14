import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Moment from 'moment';


const ViewAgenda = () => {
    const [agenda, setAgenda] = useState({
        title: "",
        description: "",
        status: false,
        day: ""
    })
    const { id } = useParams();

    useEffect(() => {

        laodAgenda();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const laodAgenda = async () => {

        const result = await axios.get(`http://localhost:3002/agendas/${id}`);
        setAgenda(result.data);
    }

    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/">
                back to Home
            </Link>
            <h1 className="display-4">Agenda Id: {id}</h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">Title: {agenda.title}</li>
                <li className="list-group-item">Description: {agenda.description}</li>
                <li className="list-group-item">Status: {agenda.status === true ? "Complete" : "Incomplete"}</li>
                <li className="list-group-item">Day: {Moment(agenda.day).format('LLLL')}</li>
            </ul>
        </div>
    )
}

export default ViewAgenda