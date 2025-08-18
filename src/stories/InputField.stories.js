import React, { useState } from "react";
import InputField from "../components/InputField";

const inputFieldStory = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: { control: "radio", options: ["filled", "outlined", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    type: { control: "radio", options: ["text", "password", "email"] }
  }
};

export default inputFieldStory;

const Template = (args) => {
  const [val, setVal] = useState("");
  return <InputField {...args} value={val} onChange={(e) => setVal(e.target.value)} />;
};

export const Basic = Template.bind({});
Basic.args = {
  label: "Email",
  placeholder: "you@example.com",
  helperText: "We will not share your email.",
  variant: "outlined",
  size: "md"
};

export const Error = Template.bind({});
Error.args = {
  label: "Username",
  invalid: true,
  errorMessage: "This username is already taken"
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Input",
  disabled: true
};

export const Password = Template.bind({});
Password.args = {
  label: "Password",
  type: "password"
};
