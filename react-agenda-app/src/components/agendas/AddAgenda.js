import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddAgenda = () => {
    const navigate = useNavigate();

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


    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:3002/agendas", agenda);
        navigate('/');

    }


    return (


        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add an Agenda</h2>
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
                        <div id="titleHelp" className="form-text text-danger">We'll use validation</div>


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
                        <div id="descHelp" className="form-text text-danger">We'll use validation</div>

                    </div>
                    <div className="mb-3">


                        <input type="text"
                            className="form-control"
                            aria-describedby="dayHelp"
                            placeholder="Add Day & Time"
                            name="day"
                            value={day}
                            onChange={handleChange}

                        />
                        <div id="dayHelp" className="form-text text-danger">We'll use validation</div>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={status}
                            onChange={handleChange}
                            name="status"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Add Agenda</button>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddAgenda