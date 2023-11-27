import React from "react";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { Controller, useForm } from "react-hook-form";
// import FacebookLoginComponent from '../../components/FacebookLoginComponent/FacebookLoginComponent'
import "./styles.css";
import Input from "../../components/Input/Input";
import { UserService } from "../../services/UserService";
import { setToken } from "../../utils/token";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // Handle form submission logic here
    UserService.login('/account/login/', data).then((response) => {
      setToken({
        name: config.tokenName,
        value: JSON.stringify(response.data.token),
      });
      navigate('/homepage');
    }).catch((error) => {
      
    })
  };
  return (
    <div className="login-main">
      <div className="custom-login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username"
            name="username"
            control={control}
            defaultValue=""
            error={errors?.name} // Pass the error for this input
            classNames={"input_basic password"}
          />
          <br />
          <Input
            label="Password"
            name="password"
            type="password"
            control={control}
            defaultValue=""
            error={errors?.name} // Pass the error for this input
            classNames={"input_basic password"}
          />
          <button className="button">Login</button>
        </form>
      </div>

      <GoogleLogin />
    </div>
  );
};

export default Login;
