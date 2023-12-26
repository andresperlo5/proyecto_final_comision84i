import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios, { configHeaders } from "../helper/clientAxios";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [productState, setProductState] = useState({});
  const [imagen, setImagen] = useState({})

  const handleClose = () => setShow(false);

  const handleShow = async (idProd) => {
    setShow(true);
    const prodFind = products.find((prod) => prod._id === idProd);
    setProductState(prodFind);
  };

  const getProducts = async () => {
    try {
      const getAllProducts = await clienteAxios.get("/products");
      setProducts(getAllProducts.data.getAllProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (ev) => {
    setProductState({ ...productState, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      const data = new FormData()
      data.append('titulo', productState.titulo)
      data.append('precio', productState.precio)
      data.append('codigo', productState.codigo)
      data.append('imagen', imagen)

      const updateProd = await clienteAxios.put(
        `/products/${productState._id}`, data, configHeaders);

      if (updateProd.status === 200) {
        handleClose();
        Swal.fire({
          title: "Producto actualizado con exito!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProd = async (idProd) => {
    try {
      Swal.fire({
        title: "Estas seguro de que quieres eliminar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, estoy seguro!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const delProd = await clienteAxios.delete(
            `/products/${idProd}`,
            configHeaders
          );
          if (delProd.status === 200) {
            Swal.fire({
              title: "Producto eliminado correctamente!",
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
    getProducts();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <Table striped bordered hover className="w-75">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Precio</th>
              <th>Codigo</th>
              <th>Imagen</th>
              <th>Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.titulo}</td>
                <td>{product.precio}</td>
                <td>{product.codigo}</td>
                <td>
                  <img src={product.imagen} alt="" width={"50"} />
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShow(product._id)}
                  >
                    Editar
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Editar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Titulo</Form.Label>
                          <Form.Control
                            type="text"
                            name="titulo"
                            value={productState.titulo}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Precio</Form.Label>
                          <Form.Control
                            type="text"
                            name="precio"
                            value={productState.precio}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Codigo</Form.Label>
                          <Form.Control
                            type="text"
                            value={productState.codigo}
                            name="codigo"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(ev) => setImagen(ev.target.files[0])}
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
                    onClick={() => deleteProd(product._id)}
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

export default AdminProductsPage;
