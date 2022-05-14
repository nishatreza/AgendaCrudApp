import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAgenda = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [agenda, setAgenda] = useState({
        title: "",
        description: "",
        status: false,
        day: ""
    })

    const { title, description, status, day } = agenda;

    const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value, type, checked } = e.target
        setAgenda(prevAgenda => {
            return {
                ...prevAgenda,
                [name]: type === "checkbox" ? checked : value
            }

        })

    }

    useEffect(() => {

        laodAgenda();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();

        // validation
        if (!title && !description && !day) {
            toast.error("Oops! You misssed a field!", { position: "top-center" });
        } else if (!title) {
            toast.error("Title is required!", { position: "top-center" });
        } else if (!description) {
            toast.error("Description is required!", { position: "top-center" });
        } else if (!day) {
            toast.error("Day is required!", { position: "top-center" });
        } else {
            await axios.put(`http://localhost:3002/agendas/${id}`, agenda);
            navigate('/');
        }



    }

    const laodAgenda = async () => {

        const result = await axios.get(`http://localhost:3002/agendas/${id}`);
        setAgenda(result.data);
    }


    return (


        <div className="container py-4">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit an Agenda</h2>
                {/* <form onSubmit={e => onSubmit(e)}> */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <input type="text"
                            className="form-control"
                            aria-describedby="titleHelp"
                            placeholder="Enter Title"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                        {/* <div id="titleHelp" className="form-text text-danger">use validation</div> */}


                    </div>
                    <div className="mb-3">
                        <textarea className="form-control"
                            placeholder="Enter Description"
                            rows="3"
                            aria-describedby="descHelp"
                            name="description"
                            value={description}
                            onChange={handleChange}

                        />
                        {/* <div id="descHelp" className="form-text text-danger"> use validation</div> */}

                    </div>
                    <div className="mb-3">


                        <input type="datetime-local"
                            className="form-control"
                            aria-describedby="dayHelp"
                            placeholder="Add Day & Time"
                            name="day"
                            value={day}
                            onChange={handleChange}

                        />
                        {/* <div id="dayHelp" className="form-text text-danger"> use validation</div> */}
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={status}
                            onChange={handleChange}
                            name="status"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Set Status</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-warning">Update Agenda</button>

                    </div>
                </form>
                <ToastContainer />

            </div>
        </div>

    )
}

export default EditAgenda