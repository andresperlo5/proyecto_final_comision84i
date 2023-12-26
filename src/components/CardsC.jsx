import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios, { configHeaders } from "../helper/clientAxios";

const CardsC = ({ url, titulo, descripcion, idProduct, idPage }) => {
  const deleteProdFav = async() => {
    try {
      console.log(idProduct)
     const data = await clienteAxios.delete(`/favs/${idProduct}`, configHeaders)
    console.log(data)
     if(data.status === 200){
      Swal.fire({
        title: data.data.msg,
        icon: "success",
      });
     }

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{titulo}</Card.Title>
          <Card.Text>{descripcion}</Card.Text>
          {idPage === "FavPage" ? (
            <Link to={"#"} className="btn btn-danger" onClick={deleteProdFav}>
              Eliminar
            </Link>
          ) : (
            <Link to={`/product/${idProduct}`} className="btn btn-success">
              Ver Mas
            </Link>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardsC;
