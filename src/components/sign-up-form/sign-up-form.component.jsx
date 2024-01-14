import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    // set the formFields as usual and set the specific modified name-value pair
    setFormFields({...formFields, [name]: value })
  };

  const handleSubmit = async (event) => {
    // do not use the default fields
    event.preventDefault();

    // confirm password matched
    if(password !== confirmPassword) {
      alert("password not match");
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // pass in the displayName to stored in firebase
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('can not create user with email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type='text' required onChange={handleChange} name="displayName" value={displayName}/>

        <label>Email</label>
        <input type='email' required onChange={handleChange} name="email" value={email}/>

        <label>Password</label>
        <input type='password' required onChange={handleChange} name="password" value={password}/>

        <label>Confirm Password</label>
        <input type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;
