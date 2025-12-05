import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { getPhotoSessions, sendPhotoEmail } from "../services/photo.service";

function AdminPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resendModalOpen, setResendModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [resendEmail, setResendEmail] = useState("");

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await getPhotoSessions();
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
      alert("Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const totalSessions = sessions.length;
  const emailedCount = sessions.filter((s) => s.emailSentTo).length;
  const qrOnlyCount = totalSessions - emailedCount;

  const handleView = (imageUrl) => {
    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async (imageUrl) => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      alert("Link copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      alert("Failed to copy link");
    }
  };

  const openResendModal = (session) => {
    setSelectedSession(session);
    setResendEmail(session.emailSentTo || "");
    setResendModalOpen(true);
  };

  const closeResendModal = () => {
    setResendModalOpen(false);
    setSelectedSession(null);
    setResendEmail("");
  };

  const handleConfirmResend = async () => {
    if (!selectedSession || !resendEmail.trim()) {
      alert("Please enter an email.");
      return;
    }
    try {
      await sendPhotoEmail(
        resendEmail.trim(),
        selectedSession.imageUrl,
        selectedSession._id
      );
      alert("Email sent successfully!");

      // Refresh table so emailSentTo updates
      fetchSessions();
      closeResendModal();
    } catch (err) {
      console.error("Resend email error:", err.response?.data || err);
      alert(
        "Failed to send email: " +
          (err.response?.data?.error ||
            err.response?.data?.message ||
            "Please try again.")
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Overview of all photobooth sessions: uploads, emails, and usage.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">Total Sessions</p>
            <p className="text-2xl font-semibold text-slate-800">
              {totalSessions}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">Emailed</p>
            <p className="text-2xl font-semibold text-emerald-600">
              {emailedCount}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">QR-only (No Email)</p>
            <p className="text-2xl font-semibold text-sky-600">{qrOnlyCount}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <p className="text-sm font-medium text-slate-700">Photo Sessions</p>
            <button
              type="button"
              onClick={fetchSessions}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-50 transition"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-2 text-left">Preview</th>
                  <th className="px-4 py-2 text-left">Captured by</th>
                  <th className="px-4 py-2 text-left">Email sent to</th>
                  <th className="px-4 py-2 text-left">Emailed?</th>
                  <th className="px-4 py-2 text-left">Created at</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-xs text-slate-500"
                    >
                      No sessions yet.
                    </td>
                  </tr>
                ) : (
                  sessions.map((session) => {
                    const created = session.createdAt
                      ? new Date(session.createdAt).toLocaleString()
                      : "-";
                    const emailed = !!session.emailSentTo;

                    return (
                      <tr
                        key={session._id}
                        className="border-t border-slate-100 hover:bg-slate-50/60"
                      >
                        <td className="px-4 py-2">
                          <img
                            src={session.imageUrl}
                            alt="thumb"
                            className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                          />
                        </td>
                        <td className="px-4 py-2 text-xs text-slate-700">
                          {session.capturedByEmail || "—"}
                        </td>
                        <td className="px-4 py-2 text-xs text-slate-700">
                          {session.emailSentTo || "—"}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                              emailed
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {emailed ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs text-slate-500">
                          {created}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleView(session.imageUrl)}
                              className="px-2 py-1 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyLink(session.imageUrl)}
                              className="px-2 py-1 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
                            >
                              Copy link
                            </button>
                            <button
                              type="button"
                              onClick={() => openResendModal(session)}
                              className="px-2 py-1 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
                            >
                              Re-send email
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resend Email Modal */}
        {resendModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">
                Re-send Email
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Enter the email address to send this photo to.
              </p>
              <input
                type="email"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                placeholder="guest@example.com"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900/70"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeResendModal}
                  className="px-4 py-2 text-xs border border-slate-300 rounded-full text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmResend}
                  className="px-4 py-2 text-xs rounded-full bg-slate-900 text-white hover:bg-slate-800"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminPage;
