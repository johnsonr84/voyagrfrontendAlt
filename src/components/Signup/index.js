import React, { useState, useRef } from "react";
import "./style.css";
import Card from "../../components/FormCard";
import { Alert } from "react-bootstrap"
import { Input, LoginBtn, SignupBtn } from "../Form";
import axios from 'axios'
import { useAuth, AuthProvider } from "../../Contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Signup = () => {


  const { signup, currentUser } = useAuth()
  // const emailRef = useRef()
  // const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirm, setPasswordConfirm] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    if (password !== passwordConfirm) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(email, password)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)

  }

  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <h2>Sign up</h2>
        {/* {JSON.stringify(currentUser)} */}
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <label> Email:</label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            required
          />
          <label> Password:</label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            required
          />
          <label>Confirm Password:</label>
          <Input
            onChange={(e) => setPasswordConfirm(e.target.value)}
            id="password-confirm"
            type="password"
            required
          />
          <SignupBtn
            disabled={loading}
          >
            Create Account
              </SignupBtn>
        </form>

        <h6 className="form-info">Already have an account?</h6>

        <LoginBtn> Log In </LoginBtn>

      </Card>
    </div >
  );
}

export default Signup;
