import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ChatContext } from "../App";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { showChat, toggleChat } = useContext(ChatContext);
  const checkTokenExpiration = (token) => {
    if (!token) {
      return false;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const exp = decodedToken.exp * 1000;

      if (Date.now() >= exp) {
        localStorage.removeItem("token");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // const hasExpired = checkTokenExpiration(token);
      // if (hasExpired) {
      //   navigate("/login", { replace: true });
      // } else {
      //   navigate("/job-list", { replace: true });
      // }
    }
    toggleChat(false);
  }, [navigate]);
  useEffect(() => {
    // const interval = setInterval(() => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     const hasExpired = checkTokenExpiration(token);
    //     if (hasExpired) {
    //       navigate('/login', { replace: true });
    //     }
    //   }
    // }, 60000);
    // return () => clearInterval(interval);
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage("Login failed: " + JSON.stringify(data));
        return;
      }

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/job-list");
      } else {
        setMessage("Login failed: " + JSON.stringify(data.errors));
      }
    } catch (error) {
      setMessage("Error during login: " + error.message);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="mt-10">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/Register" className="underline">
              Sign in
            </Link>
          </div>
          {message && <p className="text-danger mt-3">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
