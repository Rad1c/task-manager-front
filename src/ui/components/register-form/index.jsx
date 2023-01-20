import { Form, Label, ErrorLabel } from "../register-form/styled";
import { TextInput, Button, PasswordInput } from "@lanaco/lnc-react-ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationRegisterSchema } from "../../../validation/validator";
import { ErrorValidation } from "../common-styles";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import ConfirmModal from "../../modals/ConfirmModal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const REGISTER_URL = "/register";

const RegisterForm = () => {
  const { t } = useTranslation();
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

      modal.current.open();
    } catch (error) {
      if (error?.response?.status === 400) setRegisterErr(t("registerUnSuccesful"));
      else setRegisterErr(t("error"));
    }
  };

  const okModalResponse = () => {
    modal.current.close();

    navigate("/login");
  };

  return (
    <>
      <ConfirmModal ref={modal} okClicked={okModalResponse} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Label>{t("registerTitle")}</Label>
          <ErrorLabel>{registerErr}</ErrorLabel>
          <TextInput
            name="firstName"
            style={{ width: "250px" }}
            placeholder={t("firstName")}
            {...register("firstName")}
          />
          <ErrorValidation>{errors.firstName?.message}</ErrorValidation>
          <TextInput
            name="lastName"
            style={{ width: "250px" }}
            placeholder={t("lastName")}
            {...register("lastName")}
          />
          <ErrorValidation>{errors.lastName?.message}</ErrorValidation>
          <TextInput
            name="email"
            {...register("email")}
            style={{ width: "250px" }}
            placeholder={t("email")}
          />
          <ErrorValidation>{errors.email?.message}</ErrorValidation>
          <PasswordInput
            style={{ width: "250px" }}
            placeholder={t("password")}
            name="password"
            {...register("password")}
          />
          <ErrorValidation>{errors.password?.message}</ErrorValidation>
          <PasswordInput
            style={{ width: "250px" }}
            placeholder={t("confirmPassword")}
            name="confirmPassword"
            {...register("confirmPassword")}
          />
          <ErrorValidation>{errors.confirmPassword?.message}</ErrorValidation>
          <Button text={t("register")} style={{ width: "100%", marginTop: "10px" }} />
        </Form>
      </motion.div>
    </>
  );
};

export default RegisterForm;
