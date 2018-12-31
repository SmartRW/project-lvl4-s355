import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import connect from '../connect';

const MessageForm = () => (
  <form className="form">
    <div className="form-group">
      <Field className="form-control" name="message" component="input" type="text" />
    </div>
    <button className="btn btn-primary" type="submit">Send</button>
  </form>
);

export default reduxForm({
  form: 'newMessage',
})(MessageForm);
