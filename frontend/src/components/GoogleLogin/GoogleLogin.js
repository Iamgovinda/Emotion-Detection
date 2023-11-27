import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { setToken } from "../../utils/token";
import config from "../../config";
import { post } from "../../API/axios";


const GoogleSparkLogin = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, [clientId]);
  const navigate = useNavigate();


  const onSuccess = (response) => {
    if (response) {
      const inputData = {
        provider: "google",
        id_token: response?.tokenId,
      };
      post("account/social-auth/", inputData).then((res) => {
        setToken({
          name: config.tokenName,
          value: JSON.stringify(res.data.token),
        });
        navigate('/homepage')
        
      });
    }
  };

  const onFailure = (err) => {
    // toast.error("Could not authenticate. Please try again!");
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Continue with Google"
        onSuccess={(e) => onSuccess(e)}
        onFailure={(e) => onFailure(e)}
        cookiePolicy={"single_host_origin"}
        className={` mb-2`}
      />
    </div>
  );
};

export default GoogleSparkLogin;
