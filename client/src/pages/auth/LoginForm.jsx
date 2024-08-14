import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


function LoginForm({ setIsLoggedIn, setUsername }) {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigateHandler = () => {
    navigate("/signup");

  }

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/login", input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setUsername(response.data.username);
        navigate("/home");
        toast.success("Login Successful")
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="shadow-2xl  lg:w-1/4  rounded-2xl p-10 border-[1px]">
        <div className="flex flex-col text-center mb-4">
          <h1 className=" text-2xl my-4 font-bold">Login</h1>
          <p className="text-sm">Login to your account</p>
        </div>
        <hr className="mb-4" />
        <form onSubmit={loginHandler}>
          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          <br className="my-4" />
          <Button type="submit" className="w-full" variant="gooeyLeft">
            Login
          </Button>
          <p className="mt-5 w-full text-center text-sm">Don't have an account?<Button variant="link" className="p-2 underline text-sm font-semibold" onClick={navigateHandler}>Sign up now!</Button></p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;