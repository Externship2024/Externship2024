import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState([]);

    const handleGoogleLogin = (codeResponse) => {
        setUser(codeResponse);
        onLogin(true);
    };

    const login = useGoogleLogin({
        onSuccess: handleGoogleLogin,
        onError: (error) => console.log('Login Failed:', error)
    });

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'user' && password === 'pass') {
            onLogin(true);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="6">
                    <h2 className="text-center">Login to your ride-share app</h2>
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button color="primary" type="submit" block onClick={handleLogin}>
                                    Login
                                </Button>
                                <Button color="secondary" onClick={login} block>
                                    Sign in with Google 🚀
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;