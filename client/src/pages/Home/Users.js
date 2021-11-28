import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMessagesDispatch, useMessagesState } from "../../context/message";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import classNames from "classnames";

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

export default function Users() {
  const { users } = useMessagesState();
  const selectedUser = users?.find((u) => u.selected === true)?.username;
  console.log(selectedUser);
  const dispatch = useMessagesDispatch();
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
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;

      return (
        <div
          role="button"
          className={classNames(
            "user-div d-flex justify-content-md-start p-3",
            {
              "bg-white": selected,
            }
          )}
          key={user.username}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.username })
          }
        >
          <Image src={user.imageUrl} className="user-image " />
          <div className="d-none d-md-block mr-2">
            <p className="text-success mx-2"> {user.username}</p>
            <p className="font-weight-light mx-2">
              {user.latestMessages
                ? user.latestMessages.content
                : "You are not connected"}
            </p>
          </div>
        </div>
      );
    });
  }
  return (
    <Col xs={2} md={4} className="p-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}
