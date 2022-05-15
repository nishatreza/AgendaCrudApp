/* eslint-disable no-undef */
import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import Moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as XLSX from 'xlsx';

const ImportExportList = () => {
    // Moment.locale('en');
    const [agendas, setAgendas] = useState([]);
    const [importedAgendas, setImportedAgendas] = useState([]);


    useLayoutEffect(() => {
        loadAgendas();

    }, []);

    const loadAgendas = async () => {
        const result = await axios.get("http://localhost:3002/agendas");
        // console.log(result)
        setAgendas(result.data)
    }

    // import from xl file
    const readExcel = (file) => {

        const promise = new Promise((resolve, reject) => {

            const fileReader = new FileReader();

            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);


            };


            fileReader.onerror = (error) => {
                reject(error);
            };

        });

        promise.then((d) => {
            console.log(d);

            setImportedAgendas(d);

        })

    }



    return (



        <div className='container'>
            <div className="py-4">

                <div className="row">
                    <div className="col-md-6">

                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-secondary mt-4"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Export to XLS" />
                    </div>
                    <div className="col-md-6">
                        <div className="input-export-div mb-2">
                            <label htmlFor="formFile" className="form-label fw-bold">Import from XLS</label>

                            <input className="form-control form-import-file-input" type="file" id="formFile" name="myfile" onChange={(e) => {
                                const file = e.target.files[0];

                                readExcel(file);
                            }} />
                        </div>
                    </div>

                </div>



                <div className="row">





                    {agendas.length > 0 ?
                        (<table className="table border shadow" id="table-to-xls">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">DateTime</th>


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
                        : importedAgendas.length > 0 ?
                            (<table className="table border shadow" id="table-to-xls">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">DateTime</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        importedAgendas.map((agenda, index) => (
                                            <tr>
                                                <th scope="row" key={agenda.id}>{index + 1}</th>
                                                <td>{agenda.Title}</td>
                                                <td>{agenda.Description}</td>
                                                <td>
                                                    {agenda.Status}
                                                </td>

                                                <td>{agenda.DateTime}</td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>)
                            : (<div className="w-100 alert alert-warning  shadow p-5">
                                No Agendas To Show! Import from XLS!
                            </div>)





                    }












                </div>






            </div>





        </div>
    )
}

export default ImportExportList