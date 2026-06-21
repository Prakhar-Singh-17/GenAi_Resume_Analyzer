import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../utilites/axiosConfig";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function PreviousReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("/ai/allReports");
        setReports(response.data.reports || []);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch previous reports.");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function handleViewReport(reportId) {
    navigate(`/report/${reportId}`);
  }

  return (
    <div className="min-h-screen bg-[#140f1f] relative overflow-hidden px-4 py-8">
      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Previous Reports
          </h1>
          <p className="mt-3 max-w-3xl text-sm sm:text-base text-gray-300 leading-relaxed">
            Browse your previously generated interview reports, revisit role
            match scores, and quickly jump back into any report for preparation.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl p-10 text-center">
            <div className="w-[260px] sm:w-[320px]">
              <DotLottieReact src="loading.json" autoplay loop />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Loading previous reports...
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300">
              Fetching your saved TalentLens reports.
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 backdrop-blur-xl shadow-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-red-300">
              Something went wrong
            </h2>
            <p className="mt-3 text-sm sm:text-base text-red-200">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && reports.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white">
              No reports generated yet
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300">
              Once you generate an interview report, it will appear here.
            </p>
          </div>
        )}

        {/* Reports Grid */}
        {!loading && !error && reports.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl p-6 sm:p-7 flex flex-col"
              >
                {/* Top section */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-snug">
                      {report.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                      Generated on {formatDate(report.createdAt)}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/15 px-4 py-2 text-sm font-semibold text-fuchsia-300">
                    {report.matchScore}% Match
                  </div>
                </div>

                {/* Skill gaps */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-3">
                    Key Skill Gaps
                  </h3>

                  {report.skillGaps && report.skillGaps.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {report.skillGaps.slice(0, 4).map((gap, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-gray-200"
                        >
                          {gap.skill}
                        </span>
                      ))}

                      {report.skillGaps.length > 4 && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-fuchsia-300">
                          +{report.skillGaps.length - 4} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      No skill gap data available.
                    </p>
                  )}
                </div>

                {/* Bottom section */}
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-sm text-gray-400">
                      Click below to view the full report, questions, and
                      preparation plan.
                    </p>
                  </div>

                  <button
                    onClick={() => handleViewReport(report._id)}
                    className="shrink-0 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 text-white font-semibold text-sm shadow-lg hover:opacity-90 transition"
                  >
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviousReports;
