import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    // preventDefault is a synthetic event
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (! json.sucess) {
      alert("enter valid credentials");
    }

    if (json.sucess) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate('/');
    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    < div className='main_container mt-5 p-3 col-md-4 mx-auto fw-bold bg-dark'>
      <div className='container p-5 mb-2 bg-primary rounded-3'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" className="form-control " placeholder='Enter Email id' name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div class="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" className="form-control" placeholder='Enter Password' name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <button type="submit" className=" m-3 btn btn-dark">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I am  a new user</Link>
        </form>
      </div>
    </div >
  )
}

export default Login
