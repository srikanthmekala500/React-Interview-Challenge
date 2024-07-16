 import React, { useState } from 'react'
 import '../Form-Validation/Form_Validation.css'

 const Form_Validation = () => {
        const defaultValues ={
              firstName :{
                id:"firstName",
                label :"first Name",
                type:"text",
                palceholder:"First Name ....",
                value:'',
                isError :false,
                errorMsg:"firstname can't be empty"
              },
              lastname :{
                id:"lastname",
                label :"last Name",
                type:"text",
                palceholder:"last Name ....",
                value:'',
                isError :false,
                errorMsg:"last Name can't be empty"
              },
              email: {
                id: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Email...',
                value: '',
                isError: false,
                errorMsg: "Email Name can't be empty"
              },
              password: {
                id: 'password',
                label: 'Password',
                type: 'text',
                placeholder: 'Password...',
                value: '',
                isError: false,
                errorMsg: "Password  can't be empty"
              },
              confirmPassword: {
                id: 'confirmPassword',
                label: 'Confirm Password',
                type: 'text',
                placeholder: 'Confirm Password...',
                value: '',
                isError: false,
                errorMsg: "Confimr Password  can't be empty"
              }
        }
        const [formData,setFormData] =useState(defaultValues)
        const [isPassMatch, setIsPassMatch] = useState(true);
        //input onchnage
        const handleinput =(e)=>{
              const key = e.target.id
              const value = e.target.value
              const copyformdata = {...formData}
              copyformdata[key].value = value
              setFormData(copyformdata)
              isValidform()
        }
        // form valid 
          const isValidform = ()=>{
                const copyformdata = {...formData}
                Object.keys(copyformdata).forEach((key)=>{
                      const obj = copyformdata[key]
                      obj.isError = !obj.value ? true : false
                });
                setFormData(copyformdata)
                passwordMatch();
          }
          const passwordMatch = () => {
            const copyFormData = { ...formData };
            const pass = copyFormData['password'].value;
            const cPass = copyFormData['confirmPassword'].value;
            if (pass !== cPass) {
              setIsPassMatch(false);
            } else {
              setIsPassMatch(true);
            }
          }
        // on sumbite
        const handlesubmite = (e)=>{
              e.preventDefault()
              isValidform()
               
        }
        console.log(formData)
   return (
     <div className='App'>
        <div className='container'>
              <form onSubmit={handlesubmite}>
                  {
                    Object.keys(formData)
                    .map((key)=>{
                        const {id, label, type, placeholder,
                          value, isError, errorMsg}=formData[key]
                        return <div className='form-item'>
                                <label>{label}</label>
                                <input
                                onChange={handleinput}
                                    id={id}
                                    type={type}
                                    palceholder={placeholder}
                                    value={value}
                                    className={
                                      isError && 'error-border'
                                    }
                                />
                                {
                                  isError && 
                                  <span className='error'>{errorMsg}</span>
                                }
                                {
                                  key === 'confirmPassword' && !isPassMatch &&
                                  <span className='error'>  Password does not match </span>
                                }
                        </div>
                        
                    })
                  }
                  <div className='form-item'>
                      <button>submite</button>
                  </div>
              </form>
        </div> 

     </div>
   )
 }
 
 export default Form_Validation