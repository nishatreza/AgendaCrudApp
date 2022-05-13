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
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)


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
        // validation
        setFormErrors(validate(agenda));
        setIsSubmit(true);

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            await axios.post("http://localhost:3002/agendas", agenda);
            navigate('/');
        }

    }



    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "Title is required!";
        }
        if (!values.description) {
            errors.description = "Description is required!";
        }
        if (!values.day) {
            errors.day = "Day is required!";
        }

        return errors;

    };


    return (


        <div className="container py-4">
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
                        <div id="titleHelp" className="form-text text-danger">{formErrors.title}</div>


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
                        <div id="descHelp" className="form-text text-danger">{formErrors.description}</div>

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
                        <div id="dayHelp" className="form-text text-danger">{formErrors.day}</div>
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
                        <button type="submit" className="btn btn-primary">Add Agenda</button>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddAgenda