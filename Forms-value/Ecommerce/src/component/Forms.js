import React, { useState } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";

function Project() {
  const [data, setData] = useState([]);
  const [fields, setFields] = useState({});
  const [editId, setEditId] = useState(false);

  const handleChange=(e,field)=>{
    e.preventDefault();
    setFields({...fields,[field]:e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email } = fields;
    if (first_name && last_name && email) {
      if (editId !== false) {
        const updatedData = data.map((item) =>
          item.id === editId ? { ...item, ...fields } : item
        );
        setData(updatedData);
        setEditId(false);
      } else {
        const id = data.length + 1;
        setData([
          ...data,
          {
            id,
            first_name,
            last_name,
            email,
          },
        ]);
      }
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setFields({
      first_name: itemToEdit.first_name,
      last_name: itemToEdit.last_name,
      email: itemToEdit.email,
    });
    setEditId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1 className="text-warning">{editId ? "Edit Form" : "Add Form"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <label className=" fw-bold">
                First Name:
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  style={{ width: "470px" }}
                  value={fields.first_name ? fields.first_name : ""}
                  onChange={(e) => handleChange(e, "first_name")}
                />
              </label>
            </Form.Group>
            <Form.Group>
              <label className=" fw-bold">
                Last Name:
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  style={{ width: "470px" }}
                  value={fields.last_name ? fields.last_name : ""}
                  onChange={(e) => handleChange(e, "last_name")}
                />
              </label>
            </Form.Group>
            <Form.Group>
              <label className=" fw-bold">
                Email:
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  style={{ width: "470px" }}
                  value={fields.email ? fields.email : ""}
                  onChange={(e) => handleChange(e, "email")}
                />
              </label>
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="success">
                {editId ? "Update" : "Submit"}
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <h1 className="pt-4 text-danger">Data</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEdit(item.id)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Project;
