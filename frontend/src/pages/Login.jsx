import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utilites/zodSchemas";
import { axios } from "../utilites/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { toast } from "react-toastify";

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit({ email, password }) {
    await axios
      .post("/user/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.username);
          toast.success(`Welcome , ${res.data.username}`);
          navigate("/", { replace: true });
        }
      })
      .catch((e) => {console.log();
        if(e.response.status === 401 || e.response.status === 404){

          toast.error(e.response.data.message);
        }
      else{
        console.log(e)
        toast.error("Something went wrong");
      }
      });
  }

  return (
    <div className="min-h-screen bg-[#140f1f] relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background glow blobs */}
      <div className="absolute top-[-120px] left-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT BRAND PANEL */}
          <div className="relative hidden lg:flex flex-col justify-between border-r border-white/10 p-10 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-violet-500/10">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl  text-xl font-bold text-white shadow-lg">
                  <img src="logo.png"/>
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-white">TalentLens</h1>
                  <p className="text-sm text-fuchsia-200">
                    AI Interview Prep & Resume Analysis
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div className="mt-12">
                <h2 className="text-4xl font-bold leading-tight text-white">
                  Walk into interviews with a sharper edge.
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-gray-300">
                  TalentLens helps you evaluate your resume against job
                  descriptions, uncover missing skills, and prepare with focused
                  interview questions and a practical roadmap.
                </p>
              </div>

              {/* Feature list */}
              <div className="mt-10 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">
                    Resume-to-job match analysis
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    See how well your profile aligns with the role you’re
                    targeting.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">
                    AI-powered interview questions
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    Get tailored technical and behavioral questions based on
                    your resume and the job description.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">
                    Personalized preparation roadmap
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    Focus on the highest-impact topics first with a day-wise prep
                    plan.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-10 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-4">
              <p className="text-sm font-medium text-fuchsia-200">
                Built for students, freshers, and early-career developers who
                want clearer feedback and better interview preparation.
              </p>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* Mobile branding */}
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-lg font-bold text-white shadow-lg">
                  TL
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">TalentLens</h1>
                  <p className="text-sm text-fuchsia-200">
                    AI Interview Prep & Resume Analysis
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                <p className="mt-2 text-gray-300">
                  Sign in to continue analyzing resumes and preparing for
                  interviews.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-100 outline-none transition placeholder:text-gray-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30 cursor-text"
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-100 outline-none transition placeholder:text-gray-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30 cursor-text"
                  />

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Signing In..." : "Login"}
              </button>

              <p className="mt-6 text-center text-sm text-gray-300">
                Don&apos;t have an account?
                <Link
                  to="/register"
                  className="ml-1 font-medium text-fuchsia-300 hover:text-fuchsia-200 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;