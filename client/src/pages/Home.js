import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "./../context/auth";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
      imageUrl
      latestMessages {
        content
        uuid
        createdAt
        from
        to
      }
    }
  }
`;

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

  const { loading, data, error } = useQuery(GET_USERS);

  const [getMessages, { loading: messagingLoading, data: messageData }] =
    useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser]);

  if (messageData) console.log(messageData.getMessages);

  // if (error) {
  //   console.log(error);
  // }

  // if (data) {
  //   console.log(data);
  // }

  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div
        className="d-flex p-3"
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          src={user.imageUrl}
          roundedCircle
          className="mr-2"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
        <div>
          <p className="text-success mx-2"> {user.username}</p>
          <p className="font-weight-light mx-2">
            {user.latestMessages
              ? user.latestMessages.content
              : "You are not connected"}
          </p>
        </div>
      </div>
    ));
  }
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
        <Col xs={4} className="px-0 bg-secondary">
          {usersMarkup}
        </Col>
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
