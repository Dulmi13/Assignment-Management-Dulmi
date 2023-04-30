import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddAssignment() {

    const [edits, setEdits] = useState(false);
    const [assignment, setAssigment] = useState([]);
    const [submit, setSubmit] = useState(true);

    const [searchNo, setSearchNo] = useState("");
    const [code, setCode] = useState("")
    const [topic, setTopic] = useState("")
    const [des, setDes] = useState("")
    const [date, setDate] = useState("")
    const [imageSelected, setimageSelected] = useState("");
    const [disable, setDisable] = useState(false)

    const valid = () => {
        if ((des != "") && (topic != "") && (date != "") && (code != "") && (imageSelected != "")) {
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    async function save(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");

        const responses = await axios.post(
            "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
            formData
        );
        const picture = imageSelected.name;
        const assignment = { code, topic, des, date, picture };

        try {
            const response = await axios.post("http://localhost:5000" + "/assigment/addassigment", assignment);
            console.log(response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Form Filled',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setTimeout(() => {
                window.location.href = '/AddAssignment';
            }, 1000);
        } catch (error) {
            console.log(error.message);

            Swal.fire({
                title: 'Error!',
                text: 'Form Not Filled',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            window.location.href = '/AddAssignment';
        }
    }
    async function edited(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");

        const responses = await axios.post(
            "https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",
            formData
        );
        const picture = imageSelected.name;
        const assignment = { code, topic, des, date, picture };
        try {
            const response = await axios.put("http://localhost:5000" + "/assigment/updateassigment", assignment);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/AddAssignment";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/AddAssignment";
        }
    }

    const get = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/assigment/allassigment/");
            setAssigment(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function remove(code) {
        axios.delete("http://localhost:5000" + "/assigment/deleteassigment/" + code).then(() => {
            window.location.href = "/AddAssignment";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function edit(code, topic, des, date,) {
        setCode(code)
        setTopic(topic)
        setDes(des)
        setDate(date)
        setEdits(true)
        setDisable(true)
    }

    const getByAssigmentNo = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/assigment/allassigment/" + searchNo);
            setAssigment(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        get()
        valid()
    }, [code, topic, des, date, imageSelected])

    return (
        <div class="dashboard-main-wrapper" >
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>

                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >

                        <MDBRow className='mt-3'>

                            <MDBCol sm='2'></MDBCol>
                            <MDBCol sm='8'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            {edits ? (
                                                <h4>Edit Assignment</h4>
                                            ) : (
                                                <h4>Add Assignment</h4>
                                            )}

                                        </center>
                                        <form onSubmit={save}>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Assignment Number</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setCode(e.target.value);
                                                    }} value={code} disabled={disable} />
                                            </div>

                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Assignment Topic</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setTopic(e.target.value);
                                                    }} value={topic} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Assignment Description</label>
                                                <textarea type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setDes(e.target.value);
                                                    }} value={des} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Enter Due Date</label>
                                                <input type="date" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setDate(e.target.value);
                                                    }} value={date} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Add Files</label>
                                                <input type="file" onChange={(e) => {
                                                    setimageSelected(e.target.files[0]);
                                                }} class="form-control" id="customFile" />
                                            </div>
                                            <br />
                                            <div className="text-end">
                                                {edits ? (
                                                    <button type="button" class="btn btn-success d-letter-spacing " style={{ width: "150px" }} onClick={edited} disabled={submit} >Save Changes</button>
                                                ) : (
                                                    <button type="submit" class="btn btn-success d-letter-spacing " style={{ width: "150px" }} disabled={submit} >Submit</button>
                                                )}
                                            </div>
                                        </form>
                                        <br />

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <div class="mb-3 mt-4">
                                <h6>Search By Assignment Number</h6>
                                <MDBInput className="mt-3 bg-white" id='form1' type='text' placeholder="Search" onChange={(e) => {
                                    setSearchNo(e.target.value);
                                }} />
                                <br />
                                <button type="button" class="btn btn-success d-letter-spacing " onClick={getByAssigmentNo} >Search</button>
                            </div>
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Assignment Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Assignment Topic</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Assignment Description</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Due Date</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Files</th>
                                        <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {assignment.map((assignment, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {assignment.code}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {assignment.topic}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {assignment.des}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {assignment.date}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    <a href={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + assignment.picture} download="Assigment.pdf">
                                                        View
                                                    </a>

                                                </h6>
                                            </td>
                                            <td className="text-center">
                                                <MDBBtn size='sm' className="shadow-0" color='danger' style={{ backgroundColor: "red", width: "80px" }} onClick={() => remove(assignment.code)}>Delete</MDBBtn>{''}&nbsp;&nbsp;
                                                <button size='sm' className="shadow-0" style={{ backgroundColor: "black", color: "white", width: "80px" }} type='submit' onClick={() => edit(assignment.code, assignment.topic, assignment.des, assignment.date)}>Edit</button>{''}&nbsp;&nbsp;
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default AddAssignment
