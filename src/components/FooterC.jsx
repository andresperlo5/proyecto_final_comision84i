import { Col, Container, Nav, Row } from "react-bootstrap";
import ImagenC from "./ImagenC";
import "../css/FooterC.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const FooterC = () => {
  const [userAdmin, setUserAdmin] = useState(false);
  return (
    <>
      {!userAdmin && (
        <footer className="bg-navbar-propio p-5">
          <Container>
            <Row>
              <Col>
                <ImagenC
                  url={
                    "https://icones.pro/wp-content/uploads/2021/04/icone-robot-android-vert.png"
                  }
                  alt={"imagen de android"}
                  width={"150"}
                />
              </Col>
              <Col>
                <NavLink to="#home" className={"nav-link"}>
                  Facebook
                </NavLink>
                <NavLink to="#link">Instagram</NavLink>
                <NavLink to="#link">YouTube</NavLink>
              </Col>
              <Col>
                <NavLink to="#home">Trabaja con nosotros</NavLink>
                <NavLink to="#link">Terminos y Condiciones</NavLink>
                <NavLink to="#link">Contacto</NavLink>
              </Col>
              <Col>
                <iframe src="" frameBorder="0"></iframe>
              </Col>
            </Row>
          </Container>
        </footer>
      )}
    </>
  );
};

export default FooterC;
