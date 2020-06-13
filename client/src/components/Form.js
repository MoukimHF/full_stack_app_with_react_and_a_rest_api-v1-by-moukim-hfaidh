import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    success,
    submit,
    submitButtonText,
    cancelButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} success={success}/>
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>{cancelButtonText}</button>
        </div>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors,success }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
             <li >{errors}</li>
          </ul>
        </div>
      </div>
    );
  }
  if(success){
  if (success.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">&#9989;</h2>
        <div className="validation-errors">
          <ul>
             <li >{success}</li>
          </ul>
        </div>
      </div>
    );
  }}
  return errorsDisplay;
}
