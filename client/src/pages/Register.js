import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
export default function Register() {
  const [variables, setVariables] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const submitRegisterForm = (e) => {
    e.preventDefault(); //by default the referece the page
    console.log(variables);
  };

  return (
    <>
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Register</h1>

          <Form onSubmit={submitRegisterForm}>
            {/* Form Group1 */}
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={variables.email}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
                }
              />
            </Form.Group>
            {/* Form Group2 */}
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={variables.username}
                onChange={(e) =>
                  setVariables({ ...variables, username: e.target.value })
                }
              />
            </Form.Group>
            {/* Form Group3 */}
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
              />
            </Form.Group>
            {/* Form Group4 */}

            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                value={variables.confirmPassword}
                onChange={(e) =>
                  setVariables({
                    ...variables,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Form.Group>

            <div className="text-center mt-2">
              <Button variant="success" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
