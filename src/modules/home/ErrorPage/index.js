import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Result } from "antd";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(111, error);

  return (
    <Result
      status={error.status}
      title={error.status}
      subTitle={error.data}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
}
