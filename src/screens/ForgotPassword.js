import React from 'react'
import { Link } from 'react-router-dom'
import forgotPasswordValidation from '../components/validation/useForgotPasswordValidation'

export const ForgotPassword = () => {

    const {values, errors, handleChange, handleSubmit} = forgotPasswordValidation();
  
  return (
    <div className='password-container'>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userid">Email Address or Mobile Number</label>
                <input type="text" onChange={handleChange} value={values.userid} className="form-control" id="userid" name="userid" placeholder="Email Address or Mobile Number"/>
                {errors.userid && (<small className="form-text text-danger">{errors.userid}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input type="password" onChange={handleChange} value={values.password} className="form-control" id="password" name="password" placeholder="Enter New Password"/>
                {errors.password && (<small className="form-text text-danger">{errors.password}</small>)}
            </div>
            <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" onChange={handleChange} value={values.cpassword} className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password"/>
                {errors.cpassword && (<small className="form-text text-danger">{errors.cpassword}</small>)}
            </div>
            <button type="submit" className="btn btn-style">Reset Password</button>
            <div className='form-text form-footer'><Link to="/">Login?</Link></div>
        </form>
    </div>
  )
}