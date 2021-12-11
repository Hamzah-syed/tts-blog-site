import React, { Fragment } from "react";
import Header from "./header";

const Index = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default Index;
