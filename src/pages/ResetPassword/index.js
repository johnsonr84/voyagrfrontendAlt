import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../Contexts/AuthContext"
import { Link } from "react-router-dom"
import "./style.css";
// import Card from "../../components/FormCard";
import { Input, LoginBtn, SignupBtn } from "../../components/Form";

export default function ResetPassword() {
    // const emailRef = useRef()
    const [email, setEmail] = useState()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(email)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }
    return (
        <>
            <div
                style={{ backgroundColor: "#333333", height: "100vh" }}
            >
                <Card className="resetPasswordCard" style={{ top: 100, marginLeft: "auto", marginRight: "auto" }}>
                    <h2>Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <label> Email:</label>
                        <Input
                            // onChange={(e) => setEmail(e.target.value)}
                            type="email" onChange={(e) => setEmail(e.target.value)} required
                        />

                        <Button disabled={loading} className="w-100" type="submit" variant="success">
                            Reset Password
                        </Button>
                    </form>
                    <Link to="/">
                        <Button
                            className="w-100"
                            style={{ marginTop: 10 }}> Back</Button>
                    </Link>
                </Card >
            </div>
        </>
    )
}