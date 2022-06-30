import React from 'react'
import changePasswordValidation from '../components/validation/useChangePasswordValidation'

export const ChangePassword = () => {

    const {values, errors, handleChange, handleSubmit} = changePasswordValidation();
  
  return (
    <div className='password-container'>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="oldpassword">Old Password</label>
                <input type="text" onChange={handleChange} value={values.oldpassword} className="form-control" id="oldpassword" name="oldpassword" placeholder="Enter old password"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={handleChange} value={values.password} className="form-control" id="password" name="password" placeholder="Enter password"/>
            </div>
            <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" onChange={handleChange} value={values.cpassword} className="form-control" id="cpassword" name="cpassword" placeholder="Confirm password"/>
                {errors.cpassword && (<small className="form-text text-danger">{errors.cpassword}</small>)}
            </div>
            <button type="submit" className="btn btn-style">Change Password</button>
        </form>
    </div>
  )
}