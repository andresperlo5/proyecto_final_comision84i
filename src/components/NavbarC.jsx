import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/NavbarC.css";
import ImagenC from "./ImagenC";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import clienteAxios, { configHeaders } from "../helper/clientAxios";

const NavbarC = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    titulo: "",
    precio: 0,
    codigo: "",
  });

  const [imagen, setImagen] = useState({});

  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const role = JSON.parse(sessionStorage.getItem("role")) || "";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const singOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("idUsuario");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleChange = (ev) => {
    setNewProduct({ ...newProduct, [ev.target.name]: ev.target.value });
  };

  const handleChangeImagen = (ev) => {
    setImagen(ev.target.files[0]);
  };

  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      const { titulo, precio, codigo } = newProduct;

      if (!titulo || !precio || !codigo) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algun campo esta vacio!",
        });
      } else {
        const data = new FormData();
        data.append("titulo", titulo);
        data.append("precio", precio);
        data.append("codigo", codigo);
        data.append("imagen", imagen);

        const createProd = await clienteAxios.post(
          "/products",
          data,
          configHeaders
        );

        if (createProd.status === 201) {
          Swal.fire({
            title: "Producto creado con exito!",
            icon: "success",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-navbar-propio">
        <Container fluid>
          <Navbar.Brand
            to={
              token && role === "user"
                ? "/user"
                : token && role === "admin"
                ? "/admin"
                : "/"
            }
          >
            <ImagenC
              url={
                "https://icones.pro/wp-content/uploads/2021/04/icone-robot-android-vert.png"
              }
              alt={"imagen de android"}
              width={"50"}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to={
                  token && role === "user"
                    ? "/user"
                    : token && role === "admin"
                    ? "/admin"
                    : "/"
                }
                className={"nav-link"}
              >
                Inicio
              </NavLink>
              {token && role === "user" ? (
                <>
                  <NavLink to="#link" className={"nav-link"}>
                    Sobre Nosotros
                  </NavLink>
                  <NavLink to="#link" className={"nav-link"}>
                    Contacto
                  </NavLink>
                  <NavLink to="/fav" className={"nav-link"}>
                    Favoritos
                  </NavLink>
                  <NavLink to="/cart" className={"nav-link"}>
                    Carrito
                  </NavLink>
                </>
              ) : token && role === "admin" ? (
                <>
                  <NavLink to="/admin-users" className={"nav-link"}>
                    Usuarios
                  </NavLink>
                  <NavLink to="/admin-products" className={"nav-link"}>
                    Productos
                  </NavLink>
                  <Button
                    variant="success"
                    onClick={handleShow}
                    className="clase-btn"
                  >
                    Crear Producto
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Crear Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Titulo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="EJ: Titulo1"
                            value={newProduct.titulo}
                            onChange={handleChange}
                            name="titulo"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Precio</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="EJ: $1000"
                            value={newProduct.precio}
                            onChange={handleChange}
                            name="precio"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Codigo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="EJ:9as75d98asd"
                            value={newProduct.codigo}
                            onChange={handleChange}
                            name="codigo"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control
                            type="file"
                            value={newProduct.imagen}
                            onChange={handleChangeImagen}
                          />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                          <Button
                            variant="success"
                            type="submit"
                            onClick={handleClick}
                          >
                            Enviar Formulario
                          </Button>
                        </div>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </>
              ) : (
                <>
                  <NavLink to="#link" className={"nav-link"}>
                    Sobre Nosotros
                  </NavLink>
                  <NavLink to="#link" className={"nav-link"}>
                    Contacto
                  </NavLink>
                </>
              )}
            </Nav>
            {token && role ? (
              <Nav className="ms-auto">
                <NavLink to="#" onClick={singOut} className={"nav-link"}>
                  Cerrar Sesion
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink to="/login" className={"nav-link"}>
                  Iniciar Sesion
                </NavLink>
                <NavLink to="/register" className={"nav-link"}>
                  Registrarse
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
