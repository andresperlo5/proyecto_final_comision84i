import { useEffect, useState } from "react";
import clienteAxios, { configHeaders } from "../helper/clientAxios";
import CardsC from "../components/CardsC";
import { Col, Container, Row } from "react-bootstrap";

const FavPages = () => {
  const [favoritos, setFavoritos] = useState([]);

  const getAllFav = async () => {
    try {
      const favs = await clienteAxios.get("/favs", configHeaders);
      console.log(favs.data.getFavs[0].favoritos)
      setFavoritos(favs.data.getFavs[0].favoritos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFav();
  }, []);

  return (
    <>
      <Container className="my-5">
        <Row>
          {favoritos.map((fav) => (
            <Col sm={12} md={4}>
              <CardsC
                url={fav.imagen}
                titulo={fav.titulo}
                descripcion={fav.precio}
                idProduct={fav._id}
                key={fav._id}
                idPage="FavPage"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default FavPages;
