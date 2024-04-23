import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import moment from "moment";  /// dom me date ko sahi tarike se dikhata hai ..
// import { useNavigate } from 'react-router-dom';

function TodoList() {
    const [todoList, setTodoList] = useState([])
    const [inputdata, setinputdata] = useState({
        id: "",
        task: "",
        status: "pending",
        duedate: "",
        completiondate: ""
    })
    //    console.log(inputdata)

    // const [show, setShow] = useState(false);
    // const [view, setview] = useState(false);

    // const handleClose1 = () => setview(false);
    // const handleShow1 = () => setview(true);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [newid, setnewid] = useState()   /// update ke liy params ke liye...
    // console.log(newid)

    const [update, setupdate] = useState({
        task: "",
        status: "",
        duedate: "",
        completiondate: ""
    });
    // console.log(update)


    useEffect(() => {

        axios.get("http://localhost:5001/getdata", {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
            .then(res => {
                // console.log(res)
                if (res.data.Status) {
                    setTodoList(res.data.result)
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello")
        axios.post(`http://localhost:5001/savedata`, inputdata,
            { withCredential: true, credential: "include" })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    // console.log(todoList)

    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:5001/deletedata/` + id)
            .then(res => {
                console.log(res)
                if (res.data.Status) {
                    window.location.reload(true)  ///  isse page reload hota hai 
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    const handleUpdate = (id, task, status, duedate, completiondate) => {
        console.log(id, task, status, duedate, completiondate)
        setnewid(id)  // params ke liye alag state bana diya ...
        setupdate({
            ...update,
            task: task,
            status: status,
            duedate: duedate,
            completiondate: completiondate
        });
        setShowUpdateModal(true);
    }
    // console.log(update.newduedate)

    const finallyUpdate = () => {
        console.log(newid)
        axios.put(`http://localhost:5001/updatedata/` + newid, update)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>

            <div className='p-2 d-flex justify-content-center shadow bg-blue'>
                <h4>Todo List</h4>
            </div>

            <Button className='mt-3 ' variant="primary" onClick={() => setShowAddModal(true)}>Add Data</Button>
            <br />

            <Table className='mt-3' striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th>DueDate</th>
                        <th>CompletionDate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    todoList.map((d, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>{d.id} </td>
                                    <td>{d.task} </td>
                                    <td>{d.status} </td>
                                    <td>{moment(d.duedate).format('DD-MM-YYYY')} </td>
                                    <td>{moment(d.completiondate).format('DD-MM-YYYY')} </td>
                                    <td>
                                        <Button variant="primary"
                                            onClick={() => handleUpdate(d.id, d.task, d.status, d.duedate, d.completiondate)}>Update 
                                            </Button>
                                        <Button variant='danger' onClick={() => handleDelete(d.id)}>delete</Button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>

            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Todo List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >S.No.</Form.Label>
                            <Form.Control type="number" placeholder="Enter id" name="newid"
                                value={newid} readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Task</Form.Label>
                            <Form.Control type="text" placeholder="Enter task" name="task"
                                onChange={(e) => setupdate({ ...update, [e.target.name]: e.target.value })} value={update.task}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Status</Form.Label>
                            <Form.Select aria-label="Default select example" name='status'
                                onChange={(e) => setupdate({ ...update, [e.target.name]: e.target.value })} value={update.status}
                            >
                                <option >pending</option>
                                <option >progress</option>
                                <option >completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Duedate</Form.Label>
                            <Form.Control type="date" name="duedate"
                                onChange={(e) => setupdate({ ...update, [e.target.name]: e.target.value })} value={update.duedate}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Completiondate</Form.Label>
                            <Form.Control type="date" name="completiondate"
                                onChange={(e) => setupdate({ ...update, [e.target.name]: e.target.value })} value={update.completiondate}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => finallyUpdate()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >S.No.</Form.Label>
                            <Form.Control type="number" placeholder="Enter id" name="id"
                                onChange={(e) => setinputdata({ ...inputdata, [e.target.name]: e.target.value })} value={inputdata.id}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Task</Form.Label>
                            <Form.Control type="text" placeholder="Enter task" name="task"
                                onChange={(e) => setinputdata({ ...inputdata, [e.target.name]: e.target.value })} value={inputdata.task}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Status</Form.Label>
                            <Form.Select aria-label="Default select example" name='status'
                                onChange={(e) => setinputdata({ ...inputdata, [e.target.name]: e.target.value })} value={inputdata.status}
                            >
                                <option >pending</option>
                                <option >progress</option>
                                <option >completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Duedate</Form.Label>
                            <Form.Control type="date" name="duedate"
                                onChange={(e) => setinputdata({ ...inputdata, [e.target.name]: e.target.value })} value={inputdata.duedate}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label >Completiondate</Form.Label>
                            <Form.Control type="date" name="completiondate"
                                onChange={(e) => setinputdata({ ...inputdata, [e.target.name]: e.target.value })} value={inputdata.completiondate}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Data
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>

    )
}

export default TodoList
