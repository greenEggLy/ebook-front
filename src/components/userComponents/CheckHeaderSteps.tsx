import React from "react";
import { Steps } from "antd";

const headerSteps = [
  {
    title: "Cart",
  },
  {
    title: "Check Order",
  },
  {
    title: "Submit Order",
  },
];

export const CheckHeaderSteps = () => {
  return <Steps current={1} items={headerSteps} />;
};

export const SubmitHeaderSteps = () => {
  return <Steps current={2} items={headerSteps} />;
};
