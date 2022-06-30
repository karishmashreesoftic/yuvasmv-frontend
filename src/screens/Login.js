import React from 'react'
import { Link } from 'react-router-dom';
import loginValidation from '../components/validation/useLoginValidation'

export const Login = () => {

  const {values, errors, handleChange, handleSubmit} = loginValidation();
  
  return (
    <div className="infocontainer">
      <div className="infocontainer0">
        <img src='/image/logo.png' alt="logo"/>
      </div>
      <div className="infocontainer1">
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userid">Email Address or Mobile Number</label>
              <input type="text" onChange={handleChange} value={values.userid} className="form-control" id="userid" name="userid" placeholder="Email Address or Mobile Number"/>
              {errors.userid && (<small className="form-text text-danger">{errors.userid}</small>)}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" onChange={handleChange} value={values.password} className="form-control" id="password" name="password" placeholder="Enter password"/>
            </div>
            <button type="submit" className="btn btn-style">Login</button>
            <div className='form-text form-footer'><Link to="/forgotpassword">Forgot Password?</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}
