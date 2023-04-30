import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';

export const AssigmentList = () => {
    const [assignment, setAssigment] = useState([]);
    const get = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/assigment/allassigment/");
            setAssigment(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const add = (code, date) => {
        reactLocalStorage.setObject("Submit", [code, date]);
        window.location.href = "/Submition";
    }

    useEffect(() => {
        get()
    }, [])
    return (
        <div>
            <MDBTable borderless className='mt-3' >
                <MDBTableHead>
                    <tr className="bg-dark">
                        <th scope='col' className="text-white d-letter-spacing h6">Assignment Number</th>
                        <th scope='col' className="text-white d-letter-spacing h6">Assignment Topic</th>
                        <th scope='col' className="text-white d-letter-spacing h6">Assignment Description</th>
                        <th scope='col' className="text-white d-letter-spacing h6">Due Date</th>
                        <th scope='col' className="text-white d-letter-spacing h6">Files</th>
                        <th scope='col' className="text-white d-letter-spacing h6 text-center">Submit</th>
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
                                <button size='sm' className="shadow-0" style={{ backgroundColor: "red", color: "white", width: "140px" }} type='submit' onClick={() => add(assignment.code, assignment.date)}>Submit Here</button>{''}&nbsp;&nbsp;
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </div>
    )
}
