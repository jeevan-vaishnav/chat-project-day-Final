import React from "react";
import { useAuthState } from "../../context/auth";
import classNames from "classnames";
export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const recevied = !sent;

  return (
    <div className="d-flex my-3">
      <div
        className={classNames("py-2 px-3 rounded-pill", {
          "bg-primary": sent,
          "bg-secondary": recevied,
        })}
      >
        <p className="text-white" key={message.uuid}>
          {message.content}
        </p>
      </div>
    </div>
  );
}
