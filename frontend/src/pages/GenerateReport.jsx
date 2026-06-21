import { useState } from "react";
import { axios } from "../utilites/axiosConfig";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router";

function GenerateReport() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);
      formData.append("selfDescription", selfDescription);

      const report = await axios.post("/ai/aiReport", formData);

      console.log("Report Generated",report);
      navigate(`/report/${report.interviewRepor._id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#140f1f] relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Loading Screen Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#140f1f]/95 backdrop-blur-md">
          <div className="w-[260px] sm:w-[320px]">
                      <DotLottieReact src="loading.json" autoplay loop />
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
            Generating Your Report...
          </h2>
          <p className="mt-2 max-w-md text-center text-sm sm:text-base text-gray-300 px-4">
            TalentLens is analyzing your resume, job description, and self
            description to prepare your personalized interview report.
          </p>
        </div>
      )}

      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-6xl rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <div className="p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white">
                Generate Interview Report
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                Paste the job description so{" "}
                <span className="font-semibold text-fuchsia-300">
                  TalentLens
                </span>{" "}
                can compare it with your resume and create a personalized
                interview preparation report.
              </p>
            </div>

            <div className="flex flex-col h-full">
              <label
                htmlFor="jobDescription"
                className="mb-2 text-sm font-semibold text-gray-200"
              >
                Job Description
              </label>

              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here..."
                className="w-full min-h-[320px] lg:min-h-[420px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-gray-100 placeholder:text-gray-400 outline-none resize-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30 cursor-text"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Candidate Details
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                  Upload your resume and add a short self description so the AI
                  can generate a more accurate report.
                </p>
              </div>

              {/* Resume Upload */}
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Resume Upload
                </label>

                <div className="rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-5 hover:border-fuchsia-400/50 transition">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-fuchsia-500 file:to-violet-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90 cursor-pointer"
                  />
                  <p className="mt-3 text-xs sm:text-sm text-gray-400">
                    Upload your resume in PDF format.
                  </p>

                  {resume && (
                    <p className="mt-3 text-sm font-medium text-fuchsia-300 break-all">
                      Selected: {resume.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Self Description */}
              <div>
                <label
                  htmlFor="selfDescription"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Self Description
                </label>
                <textarea
                  id="selfDescription"
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Write about your background, strengths, weak areas, goals, and what kind of role you're targeting..."
                  className="w-full min-h-[220px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-gray-100 placeholder:text-gray-400 outline-none resize-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!resume || !jobDescription.trim() || loading}
                className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 text-white font-semibold text-sm sm:text-base shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateReport;