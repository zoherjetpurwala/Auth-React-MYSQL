import React from "react";
import { useState } from "react";
import "@/App.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/login");

  }

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setInput({
          username: "",
          email: "",
          password: "",
        });
        toast.success(response.data.message);
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
      <div className="shadow-2xl w-1/4 rounded-2xl p-10 border-[1px]">
      <div className="flex flex-col text-center mb-4">
          <h1 className="font-bold text-2xl my-4">Sign Up</h1>
          <p className="text-sm">Sign up new account</p>
        </div>
        <hr className="mb-4" />
        <form onSubmit={signupHandler}>
          <div className="my-4">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              className="focus-visible:ring-transparent my-2"
            />
          </div>
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
            Sign Up
          </Button>
          <p className="w-full text-center mt-5 text-sm">Already have an account?<Button variant="link" className="p-2 underline text-sm font-semibold" onClick={navigateHandler}>Login now!</Button></p>

        </form>
      </div>
    </div>
  );
};
export default SignUpForm;
