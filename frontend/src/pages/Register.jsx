import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utilites/zodSchemas";
import { axios } from "../utilites/axiosConfig";
import {Link ,useNavigate} from "react-router"
import Login from "./Login";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  async function onSubmit({username,email,password}) {
    axios.post("/user/register",{username,email,password})
    .then((res)=>{
      if(res.status===200){
        navigate("/login");
      }
    })
    .catch(e=>console.log(e));
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
  >
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Create Account
      </h1>
      <p className="text-gray-500 mt-2">
        Sign up to get started
      </p>
    </div>

    <div className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          {...register("username")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {errors.username && (
          <p className="text-red-500 text-sm mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting
        ? "Registering..."
        : "Register"}
    </button>

    <p className="text-center text-sm text-gray-500 mt-6">
      Already have an account?
      <Link to="/login" className="text-blue-600 font-medium cursor-pointer ml-1 hover:underline">
        Login
      </Link>
    </p>
  </form>
</div>
  );
}

export default Register;
