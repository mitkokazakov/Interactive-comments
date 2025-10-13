"use client";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginRegisterScheme,
  LoginRegisterScheme,
} from "@/zod/loginRegisterScheme";

import { GoInfo } from "react-icons/go";

import { registerUser } from "@/actions/registerAction";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = ({ formtype }: { formtype: string }) => {

    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRegisterScheme>({
    resolver: zodResolver(loginRegisterScheme),
  });


  const handleSubmitForm = async (data: LoginRegisterScheme) => {
    if (formtype == "login") {
      console.log("This is login func");
      console.log(data.email);
      console.log(data.password);

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/"
      })

      if(res?.error){
        alert(res.error)
      }

      if(res?.ok){
        alert("Login success")
      }
    }

    if (formtype == "register") {
      console.log("This is register func");
      console.log(data.email);
      console.log(data.password);

      startTransition(async () => {
        const res = await registerUser(data);

        if(res.error){
            alert(res.error)
        }

        if(res.success){
          router.push('/login')
          alert(res.success)
        }
      })
    }
  };

  return (
    <div className="flex flex-col w-full mt-8">
      <form
        
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col w-full"
      >
        <div className="flex flex-col mb-3">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className=" outline-none rounded-lg border-[1px] border-slate-300 px-5 py-3"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">{errors?.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className=" outline-none rounded-lg border-[1px] border-slate-300 px-5 py-3"
            {...register("password")}
          />
          {formtype == 'register' ? <div className="flex items-center gap-2 mt-2"><GoInfo/> <p className="text-sm">At least 4 characters</p></div> : null}
          {errors?.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.password.message}
            </p>
          )}
        </div>

        <button className="bg-blue-600 text-white py-3 mt-5 rounded-lg">
          {formtype == 'login' ? 'Login' : 'Sign Up'} 
        </button>

        <div className="flex justify-center items-center gap-2 py-3 border-t-[1px] border-t-slate-200 mt-5">
          <p>{formtype == 'login' ? 'Not account yet?' : 'Already have an account?'} </p>
          <Link href={formtype == 'login' ? '/register' : '/login'} className="font-semibold">
            {formtype == 'login' ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
