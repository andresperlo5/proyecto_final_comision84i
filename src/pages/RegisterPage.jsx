import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import clienteAxios, { configHeaders } from "../helper/clientAxios";
const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    user: "",
    email: "",
    pass: "",
    rpass: "",
  });

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
  };

  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      const { user, email, pass, rpass } = formValues;
      if (!user || !email || !pass || !rpass) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algun campo esta vacio!",
        });
      } else if (pass === rpass) {
        const enviarForm = await clienteAxios.post(
          "/users",
          {
            nombreUsuario: user,
            emailUsuario: email,
            contrasenia: pass,
          },
          configHeaders
        );

        if (enviarForm.status === 201) {
          Swal.fire({
            title: "Registro exitoso!",
            icon: "success",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las contraseñas no coinciden!",
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.msg}`,
        });
      }
    }
  };

  return (
    <>
      <div className="text-center my-5">RegisterPage</div>
      <div className="d-flex justify-content-center mb-5">
        <Form className="w-25">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario </Form.Label>
            <Form.Control
              type="text"
              name="user"
              value={formValues.user}
              onChange={handleChange}
              placeholder="EJ: usuario123"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email del Usuario </Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="EJ: mail@dominio.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="pass"
              value={formValues.pass}
              onChange={handleChange}
              type="password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repetir Contraseña</Form.Label>
            <Form.Control
              name="rpass"
              value={formValues.rpass}
              onChange={handleChange}
              type="password"
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit" onClick={handleClick}>
              Enviar Formulario
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
