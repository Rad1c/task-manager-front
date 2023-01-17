import { PasswordInput, TextInput, Button } from "@lanaco/lnc-react-ui";
import { Form, ErrorLabel, Label, LinkTo } from "./styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationLoginSchema } from "http://localhost:5173/src/validation/validator.jsx";
import { ErrorValidation } from "../common-styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLoginStore from "../../../store/loginStore";
import { motion } from "framer-motion";

const LoginForm = () => {
  const { isUserLoggedIn, login, loginErrors } = useLoginStore();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationLoginSchema),
  });

  const submitForm = async (data) => {
    const { email, password } = data;
    login(email, password);
    if (isUserLoggedIn) console.log("ulogovan");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, type: "spring" }}
      exit={{ opacity: 0, transition: { ease: "easeInOut" } }}
    >
      <Form onSubmit={handleSubmit(submitForm)}>
        <Label>Login</Label>
        {loginErrors && (
          <ErrorLabel id="error-message">{loginErrors}</ErrorLabel>
        )}
        <TextInput
          name="email"
          placeholder="Email"
          style={{ width: "100%" }}
          {...register("email")}
          value="mmarko@mail.com"
        />
        <ErrorValidation>{errors.email?.message}</ErrorValidation>
        <PasswordInput
          name="password"
          placeholder="Password"
          {...register("password")}
          value="0000"
        />
        <ErrorValidation>{errors.password?.message}</ErrorValidation>
        <Button
          type="submit"
          text="Login"
          style={{ width: "100%", marginTop: "10px" }}
        />
        <LinkTo>
          <Link to="/register">Create an account</Link>
        </LinkTo>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
