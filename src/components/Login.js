import React, { useState } from 'react'
import './Login.css'
import { loginapi } from '../services/api';
import { store_userdata } from '../services/storage';

function Login() {
    const initialStateErrors = {
        email:{required : false},
        password:{require: false},
        coustomError:null
    }

    const [errors , seterrors] = useState(initialStateErrors);
    
    const [loading , setloading]= useState(false)

    const [inputs , setInputs]=useState({
        email:"",
        password:"",
    })

    const handleInputs = (event)=>{
        // setInputs({...inputs})
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        let errors = {...initialStateErrors}
        let hasError = false;

        if(inputs.email == ""){
            errors.name.required = true;
            hasError = true;
        }
        if(inputs.password == ""){
            errors.password.required = true;
            hasError= true;
        }

        if(!hasError){
            setloading(true)
            loginapi(inputs).then((response)=>{
                store_userdata((response.data.idToken))
                console.log("loginsuccessfull");
            }).catch(()=>{{
                console.log("email or password incorrect");
            }})
        }
    }

  return (
    <section className="login-block">
    <div className="container">
        <div className="row ">
            <div className="col login-sec">
                <h2 className="text-center">Login Now</h2>
                <form onSubmit={handleSubmit}className="login-form" action="">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                    <input type="email"  className="form-control" name="email"  id="" placeholder="email"  />
                   {errors.email.required? 
                   ( <span className="text-danger" >
                        Email is required.
                    </span>) : null }
                </div>
                
                
                
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input  className="form-control" type="password"  name="password" placeholder="password" id="" />
                    {errors.password.required?
                    (<span className="text-danger" >
                        Password is required.
                    </span>): null }
                </div>
                 
                
                <div className="form-group">
                    {loading ? 
                        (<div  className="text-center">
                        <div className="spinner-border text-primary " role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                    </div>): null }


                    {errors.coustomError? 
                    (<span className="text-danger" >
                    <p>Custom Error Message!</p>
                    </span>):null}
                    <input  type="submit" className="btn btn-login float-right" disabled={loading} value="Login" />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                Create new account ? Please <a  href="#">Register</a>
                </div>
                </form>
            </div>
        </div>
    </div>
</section>
  )
}


export default Login;