import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

function MarkSheetList() {

    const [marksheet, setMarksheet] = useState([]);


    const get = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/marksheet/allmarksheet/");
            setMarksheet(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        get()
    }, [])

    return (
        <div class="dashboard-main-wrapper" >
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>

                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <h2>Marksheet List</h2>
                        <MDBRow className='mt-3'>
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Marksheet Code</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Topic</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Files</th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {marksheet.map((marksheet, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {marksheet.code}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {marksheet.topic}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    <a href={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + marksheet.picture} download="Assigment.pdf">
                                                        View
                                                    </a>

                                                </h6>
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

export default MarkSheetList
