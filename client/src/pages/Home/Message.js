import React from "react";
import { Col, Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useAuthState } from "../../context/auth";
import classNames from "classnames";
import moment from "moment";

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const recevied = !sent;

  return (
    <>
      <OverlayTrigger
        placement={sent ? "right" : "left"}
        overlay={
          <Tooltip>
            {moment(message.createdAt).format("MMM DD,YYYY @ h:mm a")}
          </Tooltip>
        }
        transition={false}
      >
        <div
          className={classNames("my-4 px-2 d-flex  flex-column", {
            "align-items-end": sent,
            "align-items-start": recevied,
          })}
        >
          <div
            className={classNames("py-2 px-3 rounded-pill", {
              "bg-primary": sent,
              "bg-secondary": recevied,
            })}
          >
            <p
              className={classNames({ "text-white": sent })}
              key={message.uuid}
            >
              {message.content}
            </p>
          </div>
        </div>
      </OverlayTrigger>
    </>
  );
}
