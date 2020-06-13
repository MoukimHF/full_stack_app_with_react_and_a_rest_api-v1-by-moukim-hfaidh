import React from 'react';

export default ({context}) => {
  const authUser = context.authenticatedUser ;   
  return (
    <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} is authenticated!</h1>
      <p>Your username is {authUser.firstName+" "+authUser.lastName}.</p>
    </div>
  </div>
  );
}