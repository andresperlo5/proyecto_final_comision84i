import React, { useEffect, useState } from "react";
import ImagenC from "../components/ImagenC";
import { Col, Container, Row } from "react-bootstrap";
import CardsC from "../components/CardsC";
import Spinner from "react-bootstrap/Spinner";
import clienteAxios from "../helper/clientAxios";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="grow" style={{ width: "5rem", height: "5rem" }} />
        </div>
      ) : (
        <>
          <ImagenC
            url={"https://media.vandal.net/m/4-2023/2023441892982_1.jpg"}
            alt={"mario bros"}
            width={"100%"}
          />
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
      )}
    </>
  );
};

export default HomePage;
