import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function HomePage({ username, setIsLoggedIn, setUsername }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  const logoutHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(false);
        setUsername("");
        navigate("/");
        toast.success("Logout successful");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center flex-col gap-12 items-center w-screen h-screen">
      <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
      <Button variant="gooeyLeft" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
}

export default HomePage;
