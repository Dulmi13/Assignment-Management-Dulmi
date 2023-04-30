import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import 'jspdf-autotable';

function SubmitionList() {

    const [submit, setSubmit] = useState([]);

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Report";
        const headers = [["Assignment Code", "Student Number", "Date", "Submitted Status"]];

        const data = submit.map(submit => [submit.assCode, submit.code, submit.date, submit.remainings + " Days"]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }
    const get = async () => {
        try {
            const res = await axios.get("http://localhost:5000" + "/submit/allsubmit/");
            setSubmit(res.data);
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

                        <MDBRow className='mt-3'>
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Assignment Code</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Student Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Date</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Submitted Status</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Files</th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {submit.map((submit, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {submit.assCode}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {submit.code}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {submit.date}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {submit.remainings} Days
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    <a href={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/" + submit.picture} download="Assigment.pdf">
                                                        View
                                                    </a>

                                                </h6>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                            <div className='col' style={{ paddingTop: "15px", paddingLeft: "1150px" }}>
                                <button type="button" className="btn btn-warning d-letter-spacing" style={{ width: "200px", }} onClick={exportPDF}>Download Report</button>
                            </div>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default SubmitionList
