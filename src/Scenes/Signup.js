// here react code go to the react folder than go to the screens folder and create signup.js file
import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

function Signup() {

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    // preventDefault is a synthetic event
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    if (json.sucess) {
      navigate('/login');
    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  
  return (
    <>

    
    
<div className='main_container p-3 mt-4 col-md-4 mx-auto fw-bold bg-dark'>
      <div className='container p-5 mb-2 bg-primary rounded'>
        <form onSubmit={handleSubmit}>
          <h1 className="">Register yourself</h1>
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label ">Name</label>
            <input type="text" className="form-control " name="name" value={credentials.name} onChange={onChange} placeholder='Enter Your Name'/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email' />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label"  >Password</label>
            <input type="password" className="form-control" name='password' placeholder='Enter your password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label" >Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputAddress" placeholder='Address' />
          </div>
          <button type="submit" className="m-3 btn btn-dark" style={{borderRadius: '6px', padding: '8px 20px', textTransform: 'uppercase', fontWeight: 'bold'}}>Submit</button>
          <Link to="/login" className='m-3 btn btn-danger' style={{borderRadius: '6px', padding: '8px 20px', textTransform: 'uppercase', fontWeight: 'bold'}}>Already a user</Link>
        </form>
      </div>
    </div>
    </>
  )


}

export default Signup
