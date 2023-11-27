import React from "react";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import Input from "../../components/Input/Input";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // Handle form submission logic here
    UserService.register("/account/register/", data)
      .then((response) => {
        // toast.success("Successfully Logged In");
        navigate("/login");
      })
      .catch((error) => {
        // toast.error("Unable to Logged In");

      });
  };
  return (
    <div className="signup-main">
      <div className="custom-signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <button className="button">SignUp</button>
        </form>
      </div>
      <br />
      <GoogleLogin />
    </div>
  );
};

export default SignUp;
