import React from "react";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import Input from "../../components/Input/Input";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const SignUp = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // Handle form submission logic here
    UserService.register("/account/register/", data)
      .then((response) => {
        toast.success("Successfully Registered ");
        navigate("/login");

      })
      .catch((errors) => {
        console.log(errors?.data);
        for (const key in errors?.data) {
          console.log("key: ", key)
          if (errors?.data?.hasOwnProperty(key)) {
              // Access the property values using the key
              const value = errors?.data[key];
              toast.error(value)
              // console.log(`${key}: ${value}`);
          }
      }
      });
  };
  return (
    <div className="signup-main">
<div className="container">
	<div id="login-box">
		<div className="logo">
			<img src="http://placehold.it/100x75?text=ED" class="img img-responsive img-circle center-block"/>
			<h1 className="logo-caption"><span class="tweak">S</span>ignUp</h1>
		</div>
		<div className="controls">

      <form onSubmit={handleSubmit(onSubmit)}className="flex">
          <Input
            label="Email"
            name="email"
            type="email"
            control={control}
            defaultValue=""
            error={errors?.name} // Pass the error for this input
            classNames={"input_basic password"}
          />

          <br />
          <Input
            label="First Name"
            name="first_name"
            control={control}
            defaultValue=""
            error={errors?.name} // Pass the error for this input
            classNames={"input_basic password"}
          />

          <br />
          <Input
            label="Last Name"
            name="last_name"
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
          <br />
          <Input
            label="Confirm Password"
            name="repeat_password"
            type="password"
            control={control}
            defaultValue=""
            error={errors?.name} // Pass the error for this input
            classNames={"input_basic password"}
          />
          <br/>
          <button style={{width:'100%', height:'2rem'}}>SignUp</button>
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
    </div>
  );
};

export default SignUp;


