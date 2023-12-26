import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardsC from "../components/CardsC";
import clienteAxios from "../helper/clientAxios";

const UserPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const allProducts = await clienteAxios.get("/products");
    setProducts(allProducts.data.getAllProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {products.map((product) => (
            <Col sm={"12"} md={"6"} lg={"4"} className="my-3">
              <CardsC
                url={product.imagen}
                titulo={product.titulo}
                descripcion={product.precio}
                idProduct={product._id}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserPage;
