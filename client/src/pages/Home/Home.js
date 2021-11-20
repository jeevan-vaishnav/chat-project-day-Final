import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Users from "../Home/Users";

const GET_MESSAGES = gql`
  query getUsers($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

export default function Home({ history }) {
  const dispatch = useAuthDispatch();

  const [selectedUser, setSelectedUser] = useState(null);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  const [getMessages, { loading: messagingLoading, data: messageData }] =
    useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser]);

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
        <Users setSelectedUser={setSelectedUser} />
        <Col xs={8}>
          {messageData && messageData.getMessages.length > 0 ? (
            messageData.getMessages.map((message) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>You are now connected!</p>
          )}
        </Col>
      </Row>
    </Fragment>
  );
}
