import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddMarks() {

    const [submit, setSubmit] = useState(true);

    const [code, setCode] = useState("")
    const [topic, setTopic] = useState("")
    const [imageSelected, setimageSelected] = useState("");

    const valid = () => {
        if ((topic != "") && (code != "") && (imageSelected != "")) {
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
        const marksheet = { code, topic, picture };

        try {
            const response = await axios.post("http://localhost:5000" + "/marksheet/addmarksheet", marksheet);
            console.log(response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Form Filled',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setTimeout(() => {
                window.location.href = '/AddMarks';
            }, 1000);
        } catch (error) {
            console.log(error.message);

            Swal.fire({
                title: 'Error!',
                text: 'Form Not Filled',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            window.location.href = '/AddMarks';
        }
    }

    useEffect(() => {
        valid()
    }, [code, topic, imageSelected])

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
                                            <h4>Add Marks Sheet</h4>
                                        </center>
                                        <form onSubmit={save}>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Assignment Number</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setCode(e.target.value);
                                                    }} value={code} />
                                            </div>

                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Assignment Topic</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setTopic(e.target.value);
                                                    }} value={topic} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Upload Mark Sheet</label>
                                                <input type="file" onChange={(e) => {
                                                    setimageSelected(e.target.files[0]);
                                                }} class="form-control" id="customFile" />
                                            </div>
                                            <br />
                                            <div className="text-end">

                                                <button type="submit" class="btn btn-success d-letter-spacing " style={{ width: "150px" }} disabled={submit} >Submit</button>

                                            </div>
                                        </form>
                                        <br />

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default AddMarks
