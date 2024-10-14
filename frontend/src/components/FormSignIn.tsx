import React, { useState } from 'react'
import { Card } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { signInType } from '@sayam-monga/input-validation';
function FormSignIn({type} : {type : 'signup' | 'signin'}) {
    const postInput = useState<signInType>({
        email: "",
        password:""
    })
  return (
    <Card color="transparent" shadow={false}>
    <Typography variant="h4" color="blue-gray">
      Sign In
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Please use a @thapar.edu id for sign in
    </Typography>
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-1 flex flex-col gap-6">
        
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
        />
      </div>
  
      <Button className="mt-6" fullWidth>
        sign in
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Create an account?{" "}
       <Link to={'/signup'}>
       <a className="underline">
          Sign Up
       </a>
       
       </Link>
       
      </Typography>
    </form>
  </Card>
  )
}

export default FormSignIn