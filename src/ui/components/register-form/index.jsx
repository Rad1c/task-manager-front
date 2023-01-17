import { Form, Label, ErrorLabel } from "../register-form/styled";
import { TextInput, Button } from "@lanaco/lnc-react-ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationRegisterSchema } from "../../../validation/validator";
import { ErrorValidation } from "../common-styles";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import ConfirmModal from "../../modals/ConfirmModal";
import { motion } from "framer-motion";

const REGISTER_URL = "/register";

const RegisterForm = () => {
  const navigate = useNavigate();
  const modal = useRef();
  const [registerErr, setRegisterErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationRegisterSchema),
  });

  const submitForm = async (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          passwordConfirm: confirmPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("successed register");
      modal.current.open();
    } catch (error) {
      console.log("register error");
      setRegisterErr("Registration unsuccessful");
    }
  };

  const okModalResponse = () => {
    modal.current.close();

    navigate("/login");
  };

  return (
    <>
      <ConfirmModal ref={modal} okClicked={okModalResponse} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Form onSubmit={handleSubmit(submitForm)}>
          <Label>Register</Label>
          <ErrorLabel></ErrorLabel>
          <TextInput
            name="firstName"
            style={{ width: "250px" }}
            placeholder="First name"
            {...register("firstName")}
          />
          <ErrorValidation>{errors.firstName?.message}</ErrorValidation>
          <TextInput
            name="lastName"
            style={{ width: "250px" }}
            placeholder="Last Name"
            {...register("lastName")}
          />
          <ErrorValidation>{errors.lastName?.message}</ErrorValidation>
          <TextInput
            name="email"
            {...register("email")}
            style={{ width: "250px" }}
            placeholder="Email"
          />
          <ErrorValidation>{errors.email?.message}</ErrorValidation>
          <TextInput
            style={{ width: "250px" }}
            placeholder="Password"
            name="password"
            {...register("password")}
          />
          <ErrorValidation>{errors.password?.message}</ErrorValidation>
          <TextInput
            style={{ width: "250px" }}
            placeholder="Confirm password"
            name="confirmPassword"
            {...register("confirmPassword")}
          />
          <ErrorValidation>{errors.confirmPassword?.message}</ErrorValidation>
          <Button
            text="Register"
            style={{ width: "100%", marginTop: "10px" }}
          />
        </Form>
      </motion.div>
    </>
  );
};

export default RegisterForm;
