import React from 'react'
import {Link} from 'react-router-dom'
import signupValidation from '../components/validation/useSignupValidation'
import PasswordStrengthBar from 'react-password-strength-bar';

export const Signup = () => {

  const {values, errors, handleChange, handleSubmit} = signupValidation();

  return (
    <div className='infocontainer'>
      <div className="infocontainer0">
        <img src='/image/logo.png' alt="logo"/>
      </div>
      <div className="infocontainer1">
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fname">First Name<span style={{display:"inline"}} className='form-text text-danger'> *</span></label>
              <input type="text" className="form-control" onChange={handleChange} value={values.fname} id="fname" name="fname" placeholder="Enter your first name"/>
              {errors.fname && (<small className="form-text text-danger">{errors.fname}</small>)}
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input type="text" className="form-control" onChange={handleChange} value={values.lname} id="lname" name="lname" placeholder="Enter your last name"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address<span style={{display:"inline"}} className='form-text text-danger'> *</span></label>
              <input type="email" className="form-control" onChange={handleChange} value={values.email} id="email" name="email" placeholder="Enter your email address"/>
              {errors.email && (<small className="form-text text-danger">{errors.email}</small>)}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password<span style={{display:"inline"}} className='form-text text-danger'> *</span></label>
              <input type="password" className="form-control" onChange={handleChange} value={values.password} id="password" name="password" placeholder="Enter password"/>
              {values.password? <PasswordStrengthBar password={values.password}/> : null}
            </div>
            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password<span style={{display:"inline"}} className='form-text text-danger'> *</span></label>
              <input type="password" className="form-control" onChange={handleChange} value={values.cpassword} id="cpassword" name="cpassword" placeholder="Confirm your password"/>
              {errors.cpassword && (<small className="form-text text-danger">{errors.cpassword}</small>)}
            </div>
            <button type="submit" className="btn btn-style">Signup</button>
            <small className="form-text text-muted form-footer">Register already? <Link to="/">Login</Link> here.</small>
          </form>
        </div>
      </div>
    </div>
  )
}
