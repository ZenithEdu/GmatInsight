import React, { useState, useEffect, useRef } from 'react';
import { Plus, BookOpen, Clock, Trash2, X, Edit } from 'lucide-react';

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Load assessments from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    const stored = JSON.parse(localStorage.getItem('assessments') || '[]');
    setAssessments(stored);
    setIsLoading(false);
  }, []);

  // Save assessments to localStorage whenever assessments change
  useEffect(() => {
    localStorage.setItem('assessments', JSON.stringify(assessments));
  }, [assessments]);

  // Focus trap and ESC key handling for modal accessibility
  useEffect(() => {
    if (showModal && firstInputRef.current) {
      firstInputRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  // Auto-hide snackbar after 3 seconds
  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar({ open: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be a positive number';
    if (!formData.totalMarks || formData.totalMarks <= 0) newErrors.totalMarks = 'Total marks must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const generateAssessmentId = () => {
    const existingIds = assessments.map((assessment) => assessment.assessmentId);
    let nextNumber = 1;
    while (existingIds.includes(`Exam${nextNumber}`)) {
      nextNumber++;
    }
    return `Exam${nextNumber}`;
  };

  const createAssessment = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const newAssessment = {
      assessmentId: generateAssessmentId(),
      ...formData,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    setAssessments((prev) => [...prev, newAssessment]);
    closeModal();
    setIsLoading(false);
    setSnackbar({ open: true, message: 'Assessment created successfully!' });
  };

  const updateAssessment = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setAssessments((prev) =>
      prev.map((assessment) =>
        assessment.assessmentId === currentAssessmentId
          ? { ...assessment, ...formData, modifiedAt: new Date().toISOString() }
          : assessment
      )
    );
    closeModal();
    setIsLoading(false);
    setSnackbar({ open: true, message: 'Assessment updated successfully!' });
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentAssessmentId(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      totalMarks: '',
    });
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

  const deleteAssessment = (id) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      setAssessments((prev) => prev.filter((assessment) => assessment.assessmentId !== id));
      setSnackbar({ open: true, message: 'Assessment deleted successfully!' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">Assessment Manager</h1>
            <p className="text-indigo-600">Organize and manage your assessments with ease</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 flex items-center font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
            disabled={isLoading}
          >
            <Plus size={20} className="mr-2" />
            Create New Assessment
          </button>
        </div>

        {/* Assessment List (Table) */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-6 flex items-center">
            <BookOpen className="mr-2 text-indigo-600" size={24} />
            Your Assessments ({assessments.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-12 text-indigo-500 animate-pulse">Loading...</div>
          ) : assessments.length === 0 ? (
            <div className="text-center py-12 text-indigo-500">
              <BookOpen size={64} className="mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-medium mb-2">No assessments yet</h3>
              <p className="text-sm">Click "Create New Assessment" to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-indigo-200">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Modified</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-indigo-200">
                  {assessments.map((assessment, index) => (
                    <tr key={assessment.assessmentId} className={`${index % 2 === 0 ? 'bg-indigo-50/50' : 'bg-white'} hover:bg-indigo-100 transition-colors duration-150`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">{assessment.assessmentId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">{assessment.title}</td>
                      <td className="px-6 py-4 text-sm text-indigo-600 max-w-xs truncate">
                        {assessment.description || 'No description'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 flex items-center">
                        <Clock size={14} className="mr-2 text-indigo-500" />
                        {assessment.duration} mins
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{assessment.totalMarks} marks</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                        {new Date(assessment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                        {assessment.modifiedAt ? new Date(assessment.modifiedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                        <button
                          onClick={() => editAssessment(assessment)}
                          className="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-200 p-1 rounded-full transition-colors duration-150"
                          title="Edit assessment"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteAssessment(assessment.assessmentId)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-200 p-1 rounded-full transition-colors duration-150"
                          title="Delete assessment"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create/Edit Assessment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div
              ref={modalRef}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
              role="dialog"
              aria-labelledby="modal-title"
            >
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
                <h2 id="modal-title" className="text-xl font-semibold flex items-center">
                  <BookOpen className="mr-2" size={24} />
                  {isEditing ? 'Edit Assessment' : 'Create New Assessment'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-indigo-800 p-2 rounded-full transition-colors duration-150"
                  title="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        ref={firstInputRef}
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`peer w-full px-4 py-3 border-2 ${
                          errors.title ? 'border-red-500' : 'border-indigo-200'
                        } rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-200 bg-white placeholder-transparent`}
                        placeholder="Assessment Title"
                        aria-invalid={!!errors.title}
                        aria-describedby={errors.title ? 'title-error' : undefined}
                      />
                      <label
                        htmlFor="title"
                        className="absolute left-3 -top-2.5 px-1 text-sm font-medium text-indigo-600 bg-white transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                      >
                        Assessment Title <span className="text-red-500">*</span>
                      </label>
                      {errors.title && (
                        <p id="title-error" className="mt-1 text-sm text-red-500">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="peer w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-200 bg-white placeholder-transparent"
                        rows="4"
                        placeholder="Brief description of the assessment"
                      />
                      <label
                        htmlFor="description"
                        className="absolute left-3 -top-2.5 px-1 text-sm font-medium text-indigo-600 bg-white transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                      >
                        Description
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="number"
                          id="duration"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className={`peer w-full px-4 py-3 border-2 ${
                            errors.duration ? 'border-red-500' : 'border-indigo-200'
                          } rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-200 bg-white placeholder-transparent`}
                          placeholder="60"
                          min="1"
                          aria-invalid={!!errors.duration}
                          aria-describedby={errors.duration ? 'duration-error' : undefined}
                        />
                        <label
                          htmlFor="duration"
                          className="absolute left-3 -top-2.5 px-1 text-sm font-medium text-indigo-600 bg-white transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                        >
                          Duration (minutes) <span className="text-red-500">*</span>
                        </label>
                        {errors.duration && (
                          <p id="duration-error" className="mt-1 text-sm text-red-500">
                            {errors.duration}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type="number"
                          id="totalMarks"
                          value={formData.totalMarks}
                          onChange={(e) => handleInputChange('totalMarks', e.target.value)}
                          className={`peer w-full px-4 py-3 border-2 ${
                            errors.totalMarks ? 'border-red-500' : 'border-indigo-200'
                          } rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all duration-200 bg-white placeholder-transparent`}
                          placeholder="100"
                          min="1"
                          aria-invalid={!!errors.totalMarks}
                          aria-describedby={errors.totalMarks ? 'marks-error' : undefined}
                        />
                        <label
                          htmlFor="totalMarks"
                          className="absolute left-3 -top-2.5 px-1 text-sm font-medium text-indigo-600 bg-white transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                        >
                          Total Marks <span className="text-red-500">*</span>
                        </label>
                        {errors.totalMarks && (
                          <p id="marks-error" className="mt-1 text-sm text-red-500">
                            {errors.totalMarks}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="border-t border-indigo-200 pt-6">
                    <div className="flex space-x-4">
                      <button
                        onClick={isEditing ? updateAssessment : createAssessment}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 font-medium disabled:bg-indigo-400 shadow-md transform hover:scale-105 transition-all duration-200"
                        disabled={isLoading}
                      >
                        {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : isEditing ? 'Update Assessment' : 'Create Assessment'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Snackbar */}
        {snackbar.open && (
          <div className="fixed top-4 right-4 z-50 w-80 bg-indigo-600 text-white p-4 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out translate-x-0 animate-slide-in">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{snackbar.message}</p>
              <button
                onClick={handleSnackbarClose}
                className="text-white hover:text-indigo-200"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animation Keyframes */}
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
    </div>
  );
}