import "./App.css";
import { Table, Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [employe, setemploye] = useState([]);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/employe");
      const json = await response.json();

      if (response.ok) {
        setemploye(json.sort((a, b) => b.salary - a.salary));
      }
    };

    fetchWorkouts();
  }, []);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employe = { name, designation, age, salary };

    const response = await fetch("http://localhost:4000/api/employe", {
      method: "POST",
      body: JSON.stringify(employe),
      headers: {
        "Content-Type": "application/json",
        "api-key": "",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.error("Failed to add employe");
    }
    if (response.ok) {
      console.log(json);
      setName("");
      setDesignation("");
      setAge("");
      setSalary("");
    }
  };
  const delete_emp = async (id) => {
    const response = await fetch("http://localhost:4000/api/employe/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(json);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editName, setEditName] = useState("");
  const [editDesignation, setEditDesignation] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editSalary, setEditSalary] = useState("");
  const [editId, setEditId] = useState("");

  const openEditBox = ({ _id, name, designation, age, salary }) => {
    setEditId(_id);
    setEditName(name);
    setEditDesignation(designation);
    setEditAge(age);
    setEditSalary(salary);
    handleShow();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("update run ");
    const employe = {
      name: editName,
      designaton: editDesignation,
      age: editAge,
      salary: editSalary,
    };
    console.log(employe);
    const response = await fetch(
      "http://localhost:4000/api/employe/" + editId,
      {
        method: "PATCH",
        body: JSON.stringify(employe),
        headers: {
          "Content-Type": "application/json",
          "api-key": "",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      console.error("Failed to edit employe");
    }
    if (response.ok) {
      console.log(json);
      setEditId("");
      setEditName("");
      setEditDesignation("");
      setEditAge("");
      setEditSalary("");
      handleClose();
    }
  };

  return (
    <div className="App">
      <form className="create" onSubmit={handleSubmit}>
        <h4>Add a New Employe</h4>
<div className="input-box">
        <labe className="lableinput">Name:</labe>
        <input className="inputbox"  placeholder="name..."
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        /><br></br><br></br>

        <label className="lableinput">Design:</label>
        <input className="inputbox"  placeholder="designation.."
          type="text"
          onChange={(e) => setDesignation(e.target.value)}
          value={designation}
        /><br></br><br></br>

        <label className="lableinput">Age:</label>
        <input className="inputbox"  placeholder="age..."
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        /><br></br><br></br>
        <label className="lableinput">Salary:</label>
        <input className="inputbox"  placeholder="salary..."
          type="number"
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
        /><br></br><br></br>

        <Button  type="submit">Add employe</Button>
        </div>
      </form>

      <div className="tab">
        <Table
          striped
          bordered
          hover
          size="sm"
          mt-5="true"
          className="table border shadow"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employe.map((emp) => {
              return (
                <tr key={emp._id}>
                  <th>{emp.name}</th>
                  <td>{emp.designation}</td>
                  <td>{emp.age}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => {
                        delete_emp(emp._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => {
                        openEditBox(emp);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="create" onSubmit={handleUpdate}>
            <div >
              <label className="lableinput">Name:</label>
              <input className="inputbox"  placeholder="name..."
                type="text"
                onChange={(e) => setEditName(e.target.value)}
                value={editName}
              /><br></br><br></br>

              <label className="lableinput">Design.:</label>
              <input className="inputbox"  placeholder="designation..."
                type="text"
                onChange={(e) => setEditDesignation(e.target.value)}
                value={editDesignation}
              /><br></br><br></br>

              <label className="lableinput">Age:</label>
              <input className="inputbox"  placeholder="age..."
                type="number"
                onChange={(e) => setEditAge(e.target.value)}
                value={editAge}
              /><br></br><br></br>
              <label className="lableinput">Salary:</label>
              <input className="inputbox" placeholder="salary..."
                type="number"
                onChange={(e) => setEditSalary(e.target.value)}
                value={editSalary}
              /><br></br><br></br>

              <Button type="submit">Edit employe</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default App;
