import { useState } from 'react';
import './Register.css'
import { registerapi } from '../services/api';
import { store_userdata } from '../services/storage';
import { isAuthemticated } from '../services/auth';
import { Navigate } from 'react-router-dom';

const Register = ()=>{

  const initialStateErrors = {
    email:{required:false},
    name:{required:false},
    password:{required:false},
    custom_error: null
};

   const [errors , setErrors] = useState(initialStateErrors)

    const [loading , setloading] = useState(false);

    // -------------------------------------------------------------------------

    const handleSubmit = (event)=>{
        event.preventDefault();

        let errors ={...initialStateErrors};

        let hasError = false;

        if(inputs.name == ""){
          errors.name.required=true;
          hasError = true;
        }
        if(inputs.email == ""){
          errors.email.required=true;
          hasError = true;
        }
        if(inputs.password == ""){
          errors.password.required=true;
          hasError = true;
        }
        
        if(!hasError){
          setloading(true)
          // sending api request
          registerapi(inputs).then((response)=>{
            store_userdata(response.data.idToken)
          }).catch((error)=>{
            if(error.response.data.error.message == "EMAIL_EXISTS"){
              setErrors({...errors , custom_error : "Already email registered"})
            }else if(String(error.response.data.error.message).includes("WEAK_PASSWORD")){
              setErrors({...errors , custom_error : "Password should be atleast 6 characters"})
            }
          }).finally(()=>{
            setloading(false) 
          })
        }
        
        setErrors(errors);
    }
    
    const [inputs , setInputs] = useState({
        email:"",
        password:"",
        name:""
    })

    const handleInput = (event)=>{
        setInputs({...inputs, [event.target.name]:event.target.value})
        
      }

  if(isAuthemticated()){
    //redirect
    return <Navigate to="/dashboard" />
  }   

    return(
        <section className="register-block">
            <div className="container">
               <div className="row ">
                  <div className="col register-sec">
                     <h2 className="text-center">Register Now</h2>
                     <form onSubmit = {handleSubmit} className="register-form" action="" >
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
          
                        <input type="text" className="form-control" name="name" onChange={handleInput} id="" />
                        { errors.name.required?
                            (<span className="text-danger" >
                            Name is required.
                        </span>):null}
                     </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
          
                        <input type="text"  className="form-control" name="email" onChange={handleInput} id=""  />
                        {errors.email.required?(<span className="text-danger" >
                            Email is required.
                        </span>):null }
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password"  name="password" onChange={handleInput} id="" />
                        {errors.password.required?
                        (<span className="text-danger" >
                            Password is required.
                        </span>):null}
                     </div>
                     <div className="form-group">
          
                       { errors.custom_error?
                        (<span className="text-danger" >
                           <p>{errors.custom_error}</p>
                        </span>):null}

                        {loading?
                        (<div  className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>):null}
          
                        <input type="submit" className="btn btn-login float-right" disabled={loading} value="Register" />
                     </div>
                     <div className="clearfix"></div>
                     <div className="form-group">
                       Already have account ? Please <a href="#">Login</a>
                     </div>
          
          
                     </form>
          
          
                  </div>
          
               </div>
          
          
            </div>
          </section>
    )
}

export default Register;