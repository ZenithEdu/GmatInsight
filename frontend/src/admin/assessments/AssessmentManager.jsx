import React, { useState, useEffect, useRef } from 'react';
import { Plus, BookOpen, Clock, Trash2, X, Edit } from 'lucide-react';
import Loading from '../../components/Loading';
import { useSnackbar } from '../../components/SnackbarProvider';
const API_URL = import.meta.env.VITE_API_URL;

export default function AssessmentManager() {
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAssessmentId, setCurrentAssessmentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    totalMarks: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const showSnackbar = useSnackbar();

  // Load assessments
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/assessments`)
      .then((res) => res.json())
      .then((data) => {
        setAssessments(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (showModal && firstInputRef.current) firstInputRef.current.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.duration || formData.duration <= 0)
      newErrors.duration = 'Duration must be a positive number';
    if (!formData.totalMarks || formData.totalMarks <= 0)
      newErrors.totalMarks = 'Total marks must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const createOrUpdateAssessment = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `${API_URL}/assessments/${currentAssessmentId}`
        : `${API_URL}/assessments`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          duration: Number(formData.duration),
          totalMarks: Number(formData.totalMarks),
        }),
      });

      if (!res.ok) throw new Error('Failed to save assessment');
      const saved = await res.json();

      setAssessments((prev) =>
        isEditing
          ? prev.map((a) => (a.assessmentId === currentAssessmentId ? saved : a))
          : [...prev, saved]
      );
      closeModal();
      showSnackbar(`Assessment ${isEditing ? 'updated' : 'created'} successfully!`, { type: "success" });
    } catch {
      showSnackbar('Error saving assessment.', { type: "error" });
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentAssessmentId(null);
    setFormData({ title: '', description: '', duration: '', totalMarks: '' });
    setErrors({});
  };

  const editAssessment = (assessment) => {
    setIsEditing(true);
    setCurrentAssessmentId(assessment.assessmentId);
    setFormData({
      title: assessment.title,
      description: assessment.description,
      duration: assessment.duration,
      totalMarks: assessment.totalMarks,
    });
    setShowModal(true);
  };

  const deleteAssessment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assessment?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/assessments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setAssessments((prev) => prev.filter((a) => a.assessmentId !== id));
      showSnackbar('Assessment deleted successfully!', { type: "success" });
    } catch {
      showSnackbar('Error deleting assessment.', { type: "error" });
    }
    setIsLoading(false);
  };


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-blue-700 mb-1">Assessment Manager</h1>
              <p className="text-blue-900">Organize and manage your assessments with ease</p>
            </div>
            {/* KEEP COLORS */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-blue-600 flex items-center font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              disabled={isLoading}
            >
              <Plus size={20} className="mr-2" />
              Create New Assessment
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-gray-500" />
              Your Assessments ({assessments.length})
            </h2>

            {isLoading ? (
              <Loading overlay text="Loading assessments..." />
            ) : assessments.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <BookOpen size={64} className="mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-1">No assessments yet</h3>
                <p className="text-sm">Click "Create New Assessment" to get started!</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 text-gray-700 text-sm border-radius-lg">
                <thead className="bg-blue-50 border-radius-sm">
                  <tr>
                    {['ID', 'Title', 'Description', 'Duration', 'Marks', 'Created', 'Modified', 'Actions'].map(
                      (title, idx) => (
                        <th key={idx} className="px-4 py-2 text-left font-medium">
                          {title}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {assessments.map((a, i) => (
                    <tr
                      key={a.assessmentId}
                      className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
                    >
                      <td className="px-4 py-2">{a.assessmentId}</td>
                      <td className="px-4 py-2 font-medium">{a.title}</td>
                      <td className="px-4 py-2 max-w-xs truncate">{a.description || '-'}</td>
                      <td className="px-4 py-2 flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" /> {a.duration} mins
                      </td>
                      <td className="px-4 py-2">{a.totalMarks}</td>
                      <td className="px-4 py-2">{new Date(a.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{a.modifiedAt ? new Date(a.modifiedAt).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => editAssessment(a)}
                          className="text-gray-500 hover:text-gray-700 p-1 rounded transition"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteAssessment(a.assessmentId)}
                          className="text-red-500 hover:text-red-700 p-1 rounded transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal: KEEP COLORS */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
              <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
                role="dialog"
                aria-labelledby="modal-title"
              >
                <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
                  <h2 id="modal-title" className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="mr-2" size={24} />
                    {isEditing ? 'Edit Assessment' : 'Create New Assessment'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-white hover:bg-indigo-600 p-2 rounded-full transition-colors duration-150"
                    title="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {['title', 'description', 'duration', 'totalMarks'].map((field) => (
                    <div key={field} className="relative">
                      {field === 'description' ? (
                        <textarea
                          ref={field === 'title' ? firstInputRef : null}
                          value={formData[field]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          rows={4}
                          placeholder={field}
                          className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      ) : (
                        <input
                          ref={field === 'title' ? firstInputRef : null}
                          type={field === 'duration' || field === 'totalMarks' ? 'number' : 'text'}
                          value={formData[field]}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          placeholder={field}
                          className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      )}
                      {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
                    </div>
                  ))}

                  <button
                    onClick={createOrUpdateAssessment}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-blue-600 font-medium shadow-md transform hover:scale-105 transition-all duration-200"
                  >
                    {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : isEditing ? 'Update Assessment' : 'Create Assessment'}
                  </button>
                  {isLoading && <Loading overlay text={isEditing ? 'Updating assessment...' : 'Creating assessment...'} />}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}