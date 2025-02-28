import React from 'react'

export interface IFormSelect {
    label: string,
    name: string,
    defaultValue:string | "all",
    size: string | "medium",
    list: string[]
}

const FormSelect = ({label, name, list, defaultValue="all", size="medium"}: IFormSelect) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <span className='label-text capitalize'>{label}</span>

      </label>
      <select name={name} id={name} defaultValue={defaultValue} className={`select select-bordered ${size}`}>
        {list.map((item)=>{
            return ( <option key={item}>{item}</option>);
        })}
      </select>
    </div>
  )
}

export default FormSelect
