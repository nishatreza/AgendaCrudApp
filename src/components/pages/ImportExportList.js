import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import Moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ImportExportList = () => {
    // Moment.locale('en');
    const [agendas, setAgendas] = useState([]);

    useLayoutEffect(() => {
        loadAgendas();

    }, []);

    const loadAgendas = async () => {
        const result = await axios.get("http://localhost:3002/agendas");
        // console.log(result)
        setAgendas(result.data)
    }




    return (



        <div className='container'>
            <div className="py-4">


                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-secondary mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS" />

                {agendas.length > 0 ?
                    (<table className="table border shadow" id="table-to-xls">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Day & Time</th>


                            </tr>
                        </thead>
                        <tbody>
                            {

                                agendas.map((agenda, index) => (
                                    <tr>
                                        <th scope="row" key={agenda.id}>{index + 1}</th>
                                        <td>{agenda.title}</td>
                                        <td>{agenda.description}</td>
                                        <td>
                                            {agenda.status === true ? "Complete" : "Incomplete"}
                                        </td>
                                        <td>{Moment(agenda.day).format('LLLL')}</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>)
                    : (<div className="w-100 alert alert-warning  shadow p-5">
                        No Agendas To Show!
                    </div>)


                }


            </div>
        </div>
    )
}

export default ImportExportList