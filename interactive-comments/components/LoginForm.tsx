import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div className="flex flex-col w-full mt-8">
      <div className="flex flex-col mb-3">
        <label htmlFor="email" className="mb-2">Email</label>
        <input type="email" name="email" id="email" className=" outline-none rounded-lg border-[1px] border-slate-300 px-5 py-3" placeholder="example@gmail.com"/>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-2">Password</label>
        <input type="password" name="password" id="password" className=" outline-none rounded-lg border-[1px] border-slate-300 px-5 py-3" />
      </div>

      <button className="bg-blue-600 text-white py-3 mt-5 rounded-lg">Login</button>

      <div className="flex justify-center items-center gap-2 py-3 border-t-[1px] border-t-slate-200 mt-5">
        <p>Not account yet? </p>
        <Link href={"/register"} className="font-semibold">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
