import React from 'react'
import changePasswordValidation from '../components/validation/useChangePasswordValidation'

export const ChangePassword = () => {

    const {values, errors, handleChange, handleSubmit} = changePasswordValidation();
  
  return (
    <div className='password-container'>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="oldpassword">Old Password</label>
                <input type="text" onChange={handleChange} value={values.oldpassword} className="form-control" id="oldpassword" name="oldpassword" placeholder="Enter Old Password"/>
                {errors.oldpassword && (<small className="form-text text-danger">{errors.oldpassword}</small>)}
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
            <button type="submit" className="btn btn-style">Change Password</button>
        </form>
    </div>
  )
}