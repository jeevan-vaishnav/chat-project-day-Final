import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMessagesDispatch, useMessagesState } from "../../context/message";
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

export default function Users({ setSelectedUser }) {
  const dispatch = useMessagesDispatch();
  const { users } = useMessagesState();
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => (
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
    <Col xs={4} className="px-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}
