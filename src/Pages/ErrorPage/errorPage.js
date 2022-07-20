import React from "react";

const ErrorPage = (props) => {
  const { ErrorInfo } = props;
  return (
    <div className="container justify-content-center text-center mt-5">
      <img src="https://www.google.com/images/errors/robot.png" alt="Robot" />
      <h3 className="text-danger">{ErrorInfo}</h3>
    </div>
  );
};

export default ErrorPage;
