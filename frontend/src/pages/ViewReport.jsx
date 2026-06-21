import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from "../utilites/axiosConfig";

function ViewReport() {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("technical");

  const [openTechnical, setOpenTechnical] = useState({});
  const [openBehavioral, setOpenBehavioral] = useState({});

  useEffect(() => {
    async function fetchReport() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`/ai/fetchReport/${id}`);
        setReport(response.data.report);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch report.");
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getSeverityClasses(severity) {
    if (severity === "high") {
      return "border-red-400/20 bg-red-500/10 text-red-300";
    }
    if (severity === "medium") {
      return "border-yellow-400/20 bg-yellow-500/10 text-yellow-300";
    }
    return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";
  }

  function toggleTechnical(index) {
    setOpenTechnical((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  function toggleBehavioral(index) {
    setOpenBehavioral((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log("Copy failed", err);
    }
  }

  function renderCenterContent() {
    if (!report) return null;

    if (activeSection === "technical") {
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Technical Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-300">
              Likely technical interview questions based on your resume and the
              target role.
            </p>
          </div>

          {report.technicalQuestions?.length > 0 ? (
            report.technicalQuestions.map((item, index) => {
              const isOpen = !!openTechnical[index];

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleTechnical(index)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-lg font-semibold text-white leading-relaxed">
                        Q{index + 1}. {item.question}
                      </p>
                    </div>

                    <span className="text-fuchsia-300 text-sm font-medium shrink-0">
                      {isOpen ? "Hide" : "View"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 px-5 pb-5">
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-fuchsia-300">
                          Intention
                        </p>
                        <p className="mt-1 text-sm sm:text-base text-gray-300 leading-relaxed">
                          {item.intention}
                        </p>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-fuchsia-300">
                            Suggested Answer
                          </p>
                          <button
                            type="button"
                            onClick={() => copyText(item.answer)}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-white/10 transition"
                          >
                            Copy Answer
                          </button>
                        </div>

                        <p className="mt-1 text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-400">No technical questions available.</p>
          )}
        </div>
      );
    }

    if (activeSection === "behavioral") {
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Behavioral Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-300">
              Practice experience-based answers and prepare structured stories.
            </p>
          </div>

          {report.behavioralQuestions?.length > 0 ? (
            report.behavioralQuestions.map((item, index) => {
              const isOpen = !!openBehavioral[index];

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleBehavioral(index)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-lg font-semibold text-white leading-relaxed">
                        Q{index + 1}. {item.question}
                      </p>
                    </div>

                    <span className="text-fuchsia-300 text-sm font-medium shrink-0">
                      {isOpen ? "Hide" : "View"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 px-5 pb-5">
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-fuchsia-300">
                          Intention
                        </p>
                        <p className="mt-1 text-sm sm:text-base text-gray-300 leading-relaxed">
                          {item.intention}
                        </p>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-fuchsia-300">
                            Suggested Answer
                          </p>
                          <button
                            type="button"
                            onClick={() => copyText(item.answer)}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-white/10 transition"
                          >
                            Copy Answer
                          </button>
                        </div>

                        <p className="mt-1 text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-400">No behavioral questions available.</p>
          )}
        </div>
      );
    }

    if (activeSection === "roadmap") {
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Preparation Roadmap
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-300">
              A focused plan to close the most important gaps before your
              interview.
            </p>
          </div>

          {report.preparationPlan?.length > 0 ? (
            <div className="space-y-4">
              {report.preparationPlan.map((dayItem) => (
                <div
                  key={dayItem._id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">
                    Day {dayItem.day}: {dayItem.focus}
                  </h3>

                  <ul className="mt-4 space-y-2 list-disc pl-5 text-sm sm:text-base text-gray-300">
                    {dayItem.tasks?.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No preparation roadmap available.</p>
          )}
        </div>
      );
    }

    return null;
  }

  return (
    <div className="min-h-screen bg-[#140f1f] relative overflow-hidden px-4 py-8">
      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Loading */}
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white">Loading report...</h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300">
              Fetching your TalentLens interview report.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 backdrop-blur-xl shadow-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-red-300">
              Something went wrong
            </h2>
            <p className="mt-3 text-sm sm:text-base text-red-200">{error}</p>
          </div>
        )}

        {/* Report */}
        {!loading && !error && report && (
          <div className="rounded-3xl border border-white/10 bg-[#1b1430]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Top Header */}
            <div className="border-b border-white/10 px-6 sm:px-8 py-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-fuchsia-300">
                TalentLens Report
              </p>

              <div className="mt-3 flex flex-col gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {report.title}
                </h1>

                <p className="text-sm sm:text-base text-gray-300 max-w-3xl">
                  This report compares your profile with the target role and
                  gives you focused interview preparation guidance.
                </p>

                <p className="text-sm text-gray-400">
                  Generated on {formatDate(report.createdAt)}
                </p>
              </div>
            </div>

            {/* Main 3-column layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
              {/* LEFT SIDEBAR */}
              <aside className="border-b xl:border-b-0 xl:border-r border-white/10 p-5 sm:p-6 bg-white/[0.02]">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Report Sections
                </h2>

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSection("technical")}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      activeSection === "technical"
                        ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg"
                        : "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    Technical Questions
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSection("behavioral")}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      activeSection === "behavioral"
                        ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg"
                        : "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    Behavioral Questions
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSection("roadmap")}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      activeSection === "roadmap"
                        ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg"
                        : "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    Roadmap
                  </button>
                </div>
              </aside>

              {/* CENTER CONTENT */}
              <main className="border-b xl:border-b-0 xl:border-r border-white/10 p-5 sm:p-6 lg:p-8 min-w-0">
                {renderCenterContent()}
              </main>

              {/* RIGHT SIDEBAR */}
              <aside className="p-5 sm:p-6 bg-white/[0.02]">
                {/* Match score */}
                <div className="rounded-3xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-6 py-5 text-center">
                  <p className="text-sm font-medium text-gray-300">
                    Match Score
                  </p>
                  <p className="mt-2 text-4xl font-bold text-fuchsia-300">
                    {report.matchScore}%
                  </p>
                </div>

                {/* Missing skills */}
                <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-bold text-white">Missing Skills</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Areas where your profile appears weaker for this role.
                  </p>

                  <div className="mt-5 space-y-3">
                    {report.skillGaps?.length > 0 ? (
                      report.skillGaps.map((gap, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/10 bg-[#241b3e] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-white leading-snug">
                              {gap.skill}
                            </p>

                            <span
                              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getSeverityClasses(
                                gap.severity
                              )}`}
                            >
                              {gap.severity}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">
                        No missing skills found.
                      </p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReport;