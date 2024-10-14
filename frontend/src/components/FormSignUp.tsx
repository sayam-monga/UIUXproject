import React, { ChangeEvent, useState } from "react";

import { Card } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { signUpType } from "@sayam-monga/input-validation";

interface test{
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
}

function FormSignUp() {
  const [postInput,setPostInput] = useState<signUpType>({
    email: "",
    password:"",
    name:""
})


return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Please use a @thapar.edu id for signup
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="Sayam Monga"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>{
              setPostInput({
                ...postInput,
                name:e.target.value
              })
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="example@thapar.edu"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>{
              setPostInput({
                ...postInput,
                email:e.target.value
              })
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e)=>{
              setPostInput({
                ...postInput,
                password:e.target.value
              })
            }}
          />
        </div>
    
        <Button className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
         <Link to={'/signin'}>
         <a className="underline">
            Sign In
         </a>
         
         </Link>
         
        </Typography>
      </form>
    </Card>
  );
}

export default FormSignUp;
