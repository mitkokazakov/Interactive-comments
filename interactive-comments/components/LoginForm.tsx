"use client"
import Link from "next/link";
import React from "react";
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRegisterScheme, LoginRegisterScheme } from "@/zod/loginRegisterScheme";

const LoginForm = () => {

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRegisterScheme>({
    resolver: zodResolver(loginRegisterScheme),
  });

  const onLogIn = async (data: LoginRegisterScheme) => {

    console.log(data.email);
    console.log(data.password);
    
    
  }

  return (
    <div className="flex flex-col w-full mt-8">
      <form method="POST" onSubmit={handleSubmit(onLogIn)} className="flex flex-col w-full">
        <div className="flex flex-col mb-3">
        <label htmlFor="email" className="mb-2">Email</label>
        <input type="email" id="email" className=" outline-none rounded-lg border-[1px] border-slate-300 px-5 py-3" placeholder="example@gmail.com" {...register("email")}/>
        {errors?.email && <p className="text-red-500 text-sm mt-1">{errors?.email.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-2">Password</label>
        <input type="password" id="password" className=" outline-none rounded-lg border-[1px] border-slate-300 px-5 py-3" {...register("password")}/>
        {errors?.password && <p className="text-red-500 text-sm mt-1">{errors?.password.message}</p>}
      </div>

      <button className="bg-blue-600 text-white py-3 mt-5 rounded-lg">Login</button>

      <div className="flex justify-center items-center gap-2 py-3 border-t-[1px] border-t-slate-200 mt-5">
        <p>Not account yet? </p>
        <Link href={"/register"} className="font-semibold">Sign Up</Link>
      </div>
      </form>
    </div>
  );
};

export default LoginForm;
