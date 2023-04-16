import React from 'react'
import axios from 'axios'
import "../App.scss"
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {GoogleLogin} from "react-google-login"
import { gapi } from 'gapi-script'
import {Form,Stack,TextInput,Button} from '@carbon/react'
import { Link } from 'react-router-dom'

const Login = () => {
    const googleID = '17800721780-feofamlj3j6ruma8o7oab81clc1ki792.apps.googleusercontent.com'
    const navigate = useNavigate()
    const [formdata,setformdata] = useState({
        email:"",
        password:""
    })
    const handleChange = (e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
        console.log(formdata);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(formdata.email && formdata.password){
            const res = await axios.post('http://localhost:8000/user/signin',formdata)
            console.log(res.data);
            localStorage.setItem("profile",JSON.stringify(res.data))
            navigate('/strategy')   
        }
    }
    const googleSuccess = async(res) =>{
      const email = res?.profileObj?.email;
      const name = res?.profileObj?.name;
      const token = res?.tokenId;
      const googleId = res?.googleId;
      const result = {email,name,token,googleId};
      const response = await axios.post('http://localhost:8000/user/googlelogin',result)
      console.log(response.data);
      localStorage.setItem("profile",JSON.stringify(response.data))
      navigate('/strategy')
    }
    const googleFaliure = (err) =>{
      console.log(err);
    }

    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: googleID,
          scope: '',
        });
      }
      gapi.load('client:auth2', start);
    }, []);
  return (
    <div className="container">
    <div className="login-container">
    <div className="text-container">
    <br></br>

    <h2>
       Login to SeaQuant
     </h2>
     <br></br>
     <p>Welcome Back!!</p>
     <br></br>

     </div>
    <Form className="form-container" action='post' onSubmit={handleSubmit}>
    <Stack gap={7}>
      <TextInput
        id="test2"
        invalidText="Invalid error message."
        labelText="Email"
        placeholder="abc@gmail.com"
        name='email' 
        value={formdata.email}
        onChange={handleChange}
        required
      />
      <TextInput
        id="test2"
        invalidText="Invalid error message."
        labelText="Password"
        name='password'
        value={formdata.password}
        onChange={handleChange}
        required
      />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button
        kind="primary"
        tabIndex={0}
        type="submit"
       >
      SignIn
      </Button>
      <GoogleLogin
        clientId={googleID}
        render={(renderProps) => (
          <Button
            kind="secondary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            SignIn with Google
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFaliure}
        cookiePolicy="single_host_origin"
          />
    </div>
    </Stack>
  <p>Dont have an account?</p>
  <Link to="/signup"> Signup</Link>
  </Form>
  </div>
  <div className="img-container">
  </div>
  </div>
  )
}

export default Login