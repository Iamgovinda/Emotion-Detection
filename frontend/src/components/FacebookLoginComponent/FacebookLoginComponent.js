import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = () => {
  const appId = process.env.REACT_APP_FACEBOOK_APP_ID;

  const responseFacebook = (response) => {
    console.log(response);
    // You can handle the Facebook response here, e.g., store user data, set user state, etc.
  };

  return (
    <div>
      <FacebookLogin
        appId={appId}
        autoLoad={false} // Set to true if you want to auto-load the login button
        fields="name,email,picture" // Requested user data fields
        callback={responseFacebook} // Callback function to handle the response
      />
    </div>
  );
};

export default FacebookLoginComponent;
