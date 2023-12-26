import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios, { configHeaders } from "../helper/clientAxios";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userState, setUserState] = useState({});

  const handleClose = () => setShow(false);

  const handleShow = async (idUser) => {
    setShow(true);
    const userFind = users.find((user) => user._id === idUser);
    setUserState(userFind);
  };
  /* Revisar el bucle infinito del useEffect */
  const getAllUsers = useCallback(async () => {
    try {
      const getUsers = await clienteAxios.get("/users", configHeaders);
      setUsers(getUsers.data.getAllUsers);
    } catch (error) {
      console.log(error);
    }
  }, []);

  /*  const getAllUsers = async () => {
    try {
      const getUsers = await clienteAxios.get("/users");
      setUsers(getUsers.data.getAllUsers);
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleChage = (ev) => {
    setUserState({ ...userState, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      const updateProd = await clienteAxios.put(
        `/users/${userState._id}`,
        {
          nombreUsuario: userState.nombreUsuario,
          emailUsuario: userState.emailUsuario,
          role: userState.role,
        },
        configHeaders
      );

      if (updateProd.status === 200) {
        handleClose();
        Swal.fire({
          title: "Usuario actualizado con exito!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (idUser) => {
    try {
      Swal.fire({
        title: "Estas seguro de que quieres eliminar este usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, estoy seguro!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const delUser = await clienteAxios.delete(
            `/users/${idUser}`,
            configHeaders
          );

          if (delUser.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <Table striped bordered hover className="w-50">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Role</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.nombreUsuario}</td>
                <td>{user.emailUsuario}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShow(user._id)}
                  >
                    Editar
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombreUsuario"
                            value={userState.nombreUsuario}
                            onChange={handleChage}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Correo</Form.Label>
                          <Form.Control
                            type="text"
                            name="emailUsuario"
                            value={userState.emailUsuario}
                            onChange={handleChage}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            value={userState.role}
                            name="role"
                            onChange={handleChage}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleClick}
                        >
                          Guardar
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <Button
                    variant="danger"
                    className={user.role === "admin" && "d-none"}
                    onClick={() => deleteUser(user._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AdminUsersPage;
