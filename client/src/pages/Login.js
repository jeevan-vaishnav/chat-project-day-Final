import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      props.history.push("/");
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault(); //by default the referece the page
    loginUser({ variables });
  };

  return (
    <>
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Login</h1>

          <Form onSubmit={submitLoginForm}>
            {/* Form Group2 */}
            <Form.Group>
              <Form.Label className={errors.username && "text-danger"}>
                {errors.username ?? "Username"}
              </Form.Label>
              <Form.Control
                type="text"
                value={variables.username}
                className={errors.username && "is-invalid"}
                onChange={(e) =>
                  setVariables({ ...variables, username: e.target.value })
                }
              />
            </Form.Group>
            {/* Form Group3 */}
            <Form.Group>
              <Form.Label className={errors.password && "text-danger"}>
                {errors.password ?? "Password"}
              </Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                className={errors.password && "is-invalid"}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
              />
            </Form.Group>
            {/* Form Group4 */}

            <div className="text-center mt-2">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
              <br />
              <small>
                Don't have an account? <Link to="/register">Register</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(
      username: $username

      password: $password
    ) {
      email
      username
      createdAt
      token
    }
  }
`;
