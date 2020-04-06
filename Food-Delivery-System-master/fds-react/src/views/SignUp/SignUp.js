import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUp.scss";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setType] = useState(0);

  const options = [
    { value: 1, label: 'FDS Manager' },
    { value: 2, label: 'Staff' },
    { value: 3, label: 'Rider' },
    { value: 4, label: 'Customer' }
  ];

  const dropdown = options.map((option) =>
    <option key={option.value.toString()} value={option.value}>{option.label}</option>
  );

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSignUp() {
    props.history.push("/signup");
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("username: " + username);
    console.log("password: " + password);
    console.log("usertype: " + usertype);

    /**** Upload the new user data to the backend ****

    const data = {username: username, password: password, usertype: usertype};
    const url = 'api/v1/...';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(() => {
      console.log('Success!');
    })
    .catch((error) => {
      // handle the error when the user already exists
      console.log('Error: ', error);
    });

    ****/

    // return back to the home login page
    props.history.push("/");
  }

  return (

    <div className="SignUp">
      <div className="Welcome">
        <h2>Welcome to the Food Delivery System</h2>
      </div>

      <div className="SignupForm">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" bssize="large">
            <Form.Label>New User Name</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={username}
              placeholder="Enter New User Name"
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              value={password}
              placeholder="Enter New Password"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="selectCustom">
            <Form.Label>User Type</Form.Label>
            <Form.Control as="select" custom onChange={e => setType(e.target.value)}>
              {dropdown}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>

      <div className="Signup">
        <Button variant="outline-secondary" block bssize="large" onClick={handleSubmit}>
          Sign Up Now
        </Button>
      </div>

    </div>
  );
}

export default SignUp;
