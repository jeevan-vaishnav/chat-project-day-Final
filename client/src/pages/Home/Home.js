import React, { Fragment } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import Users from "../Home/Users";
import Messages from "../Home/Messages";
export default function Home({ history }) {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  // if (error) {
  //   console.log(error);
  // }

  // if (data) {
  //   console.log(data);
  // }

  return (
    <Fragment>
      <Row className="bg-white mb-1" xs>
        <Col className="mx-5">
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
        </Col>
        <Col>
          <Button variant="link" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="bg-white mb-1 ">
        <Users />
        <Messages />
      </Row>
    </Fragment>
  );
}
