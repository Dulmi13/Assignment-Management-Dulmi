import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';

function Submition() {

    var Submit = reactLocalStorage.getObject('Submit');
    const [submit, setSubmit] = useState(true);

    const [code, setCode] = useState("")
    const [remainings, setRemainings] = useState("")
    const [imageSelected, setimageSelected] = useState("");
    const [subBtn, setSubBtn] = useState(true);
    const assCode = Submit[0]
    const date = Submit[1]
    const today = new Date();
    const todayDate = today.toISOString().slice(0, 10);
    const remaining = Math.round((new Date(date) - new Date(todayDate)) / (1000 * 60 * 60 * 24));


    const valid = () => {
        if ((code != "") && (imageSelected != "")) {
            setSubmit(false)
            if (remaining <= 0) {
                setRemainings("Session Expired")
            }
            else {
                setRemainings(remaining)
            }
        }
        else {
            setSubmit(true)
        }
    }
    const presave = () => {
        setSubBtn(false)
    }
    const cancel = () => {
        window.location.href = '/Submition';
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
        const submission = { assCode, code, date, remainings, picture };

        try {
            const response = await axios.post("http://localhost:5000" + "/submit/addsubmit", submission);
            console.log(response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Submission Successes',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setTimeout(() => {
                window.location.href = '/Submition';
            }, 1000);
        } catch (error) {
            console.log(error.message);

            Swal.fire({
                title: 'Error!',
                text: 'Submission Not Successes',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            window.location.href = '/Submition';
        }
    }

    useEffect(() => {
        valid()
    }, [code, imageSelected])

    return (
        <div class="dashboard-main-wrapper" >
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>

                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >

                        <MDBRow className='mt-3'>

                            <MDBCol sm='2'></MDBCol>
                            <MDBCol sm='8'>
                                <br />
                                <br />
                                <MDBCard className='shadow-0'>
                                    {subBtn ? (
                                        <MDBCardBody className="bg-light">
                                            <center>
                                                <h4>Submit Your Assignment</h4>
                                            </center>
                                            <form onSubmit={presave}>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label h6">Student Number</label>
                                                    <input type="text" class="form-control" placeholder=""
                                                        onChange={(e) => {
                                                            setCode(e.target.value);
                                                        }} value={code} />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label h6">File Submission</label>
                                                    <input type="file" onChange={(e) => {
                                                        setimageSelected(e.target.files[0]);
                                                    }} class="form-control" id="customFile" />
                                                </div>
                                                <div className='' style={{ textAlign: "center" }}>
                                                    <h6>
                                                        Accepted File Types
                                                    </h6>
                                                    <p>
                                                        .png .jpg .jpeg
                                                    </p>
                                                </div>
                                                <br />
                                                <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <button type="submit" class="btn btn-success d-letter-spacing" style={{ width: "150px", backgroundColor: "darkblue", color: "white" }} disabled={submit}>Submit</button>
                                                </div>
                                            </form>
                                            <br />
                                        </MDBCardBody>
                                    ) : (
                                        <MDBCardBody className="bg-light">
                                            <MDBTable>
                                                <MDBTableBody>
                                                    <th style={{ fontWeight: 'bold', fontSize: "22px" }}>Student Number :</th>
                                                    <td style={{ fontSize: "22px" }}>{code}</td>
                                                </MDBTableBody>
                                                <br />
                                                <MDBTableBody>
                                                    <th style={{ fontWeight: 'bold', fontSize: "22px" }}>Submitted :</th>
                                                    <td style={{ fontSize: "22px" }}>Successfully Submitted !</td>
                                                </MDBTableBody>
                                                <br />
                                                <MDBTableBody>
                                                    <th style={{ fontWeight: 'bold', fontSize: "22px" }}>Due Date :</th>
                                                    <td style={{ fontSize: "22px" }}>{date}</td>
                                                </MDBTableBody>
                                                <br />
                                                <MDBTableBody>
                                                    <th style={{ fontWeight: 'bold', fontSize: "22px" }}>Date Remaining :</th>
                                                    <td style={{ fontSize: "22px" }}>{remainings} Days</td>
                                                </MDBTableBody>
                                            </MDBTable>
                                            <br />
                                            <br />
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <button type="submit" class="btn btn-success d-letter-spacing" style={{ width: "150px", backgroundColor: "black", color: "white" }} onClick={save}>Confirm</button>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <button type="submit" class="btn btn-success d-letter-spacing" style={{ width: "150px", backgroundColor: "red", color: "white" }} onClick={cancel}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </MDBCardBody>
                                    )}
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Submition
