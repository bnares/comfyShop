import React from 'react'

export type FormInputType = {
    name:string,
    type:string,
    defaultValue: string,
    label:string
}

const FormInput = ({label, name, type, defaultValue}: FormInputType) => {
  return (
    <div className="form-control">
  <label className="label">
    <span className="label-text">{label}</span>
  </label>
  <input name={name} defaultValue={defaultValue} type={type} placeholder="Type here" className="input input-bordered" />
  
  </div>
  )
}

export default FormInput
