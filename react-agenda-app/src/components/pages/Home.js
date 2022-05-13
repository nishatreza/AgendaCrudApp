import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'


const Home = () => {

    const [agendas, setAgendas] = useState([]);

    useEffect(() => {
        loadAgendas();

    }, []);

    const loadAgendas = async () => {
        const result = await axios.get("http://localhost:3002/agendas");
        // console.log(result)
        setAgendas(result.data)
    }

    const deleteAgenda = async id => {
        await axios.delete(`http://localhost:3002/agendas/${id}`);
        loadAgendas();

    }

    return (
        <div className='container'>
            <div className="py-4">
                <h1>Home Page</h1>
                <table className="table border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Day & Time</th>
                            <th >Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            agendas.map((agenda, index) => (
                                <tr>
                                    <th scope="row" key={agenda.id}>{index + 1}</th>
                                    <td>{agenda.title}</td>
                                    <td>{agenda.description}</td>
                                    <td>{agenda.status === true ? <span class="badge bg-success">Complete</span> : <span class="badge bg-danger">Incomplete</span>}

                                    </td>
                                    <td>{agenda.day}</td>
                                    <td>
                                        <Link className="btn btn-primary m-1" to={`/agendas/view/${agenda.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary m-1" to={`/agendas/edit/${agenda.id}`}>Edit</Link>
                                        <Link className="btn btn-danger m-1" to="" onClick={() => deleteAgenda(agenda.id)}>Delete</Link>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home