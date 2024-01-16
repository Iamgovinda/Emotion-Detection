import React from "react";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { Controller, useForm } from "react-hook-form";
// import FacebookLoginComponent from '../../components/FacebookLoginComponent/FacebookLoginComponent'
import "./styles.css";
import Input from "../../components/Input/Input";
import { UserService } from "../../services/UserService";
import { setToken } from "../../utils/token";
import config from "../../config";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    UserService.login('/account/login/', data)
      .then((response) => {
        setToken({
          name: config.tokenName,
          value: JSON.stringify(response.data.token),
        });
        navigate('/homepage');
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (

      <>
<div className="container">
	<div id="login-box">
		<div className="logo">
			<img src="http://placehold.it/100x100?text=EmotionDetection" class="img img-responsive img-circle center-block"/>
			<h1 className="logo-caption"><span class="tweak">L</span>ogin</h1>
		</div>
		<div className="controls">

    <form onSubmit={handleSubmit(onSubmit)} className="flex">
          <Input
            label="Username"
            name="username"
            control={control}
            defaultValue=""
            error={errors?.name} // Pass the error for this input
            classNames={`input_basic password`}
          />
          <br/>
          <Input
            label="Password"
            name="password"
            type="password"
            control={control}
            defaultValue=""
            error={errors?.name} // Pass the error for this input
            classNames={`input_basic password`}
          />
          <br/>
          <button style={{width:'100%', height:'2rem'}}>Login</button>
          <hr/>
          If You Dont have Account {
            <><Link to={"/signup"}>SignUp</Link></>
          }
          <hr/>
          OR
          <hr/>
          <GoogleLogin />
        </form>
		</div>
    <div class="particles">
    <div class="particle" style={{ top: '20vh', left: '30vw', width: '10px', height: '10px' }} ></div>
    <div class="particle" style={{ top: '50vh', left: '70vw', width: '8px', height: '8px' }}></div>
  </div>
	</div>
</div>
      </>

    // </div>
  );
};

export default Login;

