import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Form,Stack,TextInput,Button} from '@carbon/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {GoogleLogin} from "react-google-login"
const Signup = () => {
    const navigate = useNavigate()
    const googleID = 'o0280283.apps.googleusercontent.com'
    const [form,setform] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setform({...form,[e.target.name]:e.target.value})
        console.log(form);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(form.email && form.password  && form.firstname && form.lastname){
            const res = await axios.post('http://localhost:8000/user/signup',form)
            console.log(res.data);
            localStorage.setItem("profile",JSON.stringify(res.data))
            navigate("/strategy")
    }
    }
    const googleSuccess = () =>{}
    const googleFaliure = () =>{}
  return (
    <div className="page-container">
    <div className="signup-container">
    <div className="text-container">
    <h2>
     Signup for an account
     </h2>
     <br></br>
     <p>Welcome to SeaQuant</p>
     </div>
    <Form className="form-container" action='post' onSubmit={handleSubmit}>
    <br></br>

    <Stack gap={7}>
    <div className="form-flname">
    <TextInput
        labelText="First name"
        placeholder="john"
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        required
      />
      <br></br>
      <br></br>

      <TextInput
        labelText="Last name"
        placeholder="doe"
        name="lastname"
        value={form.lastname}
        onChange={handleChange}
        required
      />
    </div>
      <TextInput
        id="test2"
        invalidText="Invalid error message."
        labelText="Email"
        placeholder="abc@gmail.com"
        name='email' 
        value={form.email}
        onChange={handleChange}
        required
      />
      <TextInput
        id="test2"
        invalidText="Invalid error message."
        labelText="Password"
        name='password'
        value={form.password}
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
    <br></br>
  <p>Already have an account?</p>
  <Link to="/login">Login</Link>
  </Form>
  </div>
  <div className="signup-img-container">
  </div>
  </div>
  )
}

export default Signup