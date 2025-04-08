'use client';

import { useAppTranslation } from '../hooks/useAppTranslation';
import { useState, useEffect } from 'react';

export const SubmitEventButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { t } = useAppTranslation('submitEvent');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Listen for subscription form open/close events
    const handleSubscriptionOpen = () => setIsSubscriptionOpen(true);
    const handleSubscriptionClose = () => setIsSubscriptionOpen(false);

    window.addEventListener('subscription:open', handleSubscriptionOpen);
    window.addEventListener('subscription:close', handleSubscriptionClose);

    return () => {
      window.removeEventListener('subscription:open', handleSubscriptionOpen);
      window.removeEventListener('subscription:close', handleSubscriptionClose);
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitSuccess(false);
    setSubmitError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Create the event data object
      const eventData = {
        id: Date.now().toString(),
        title: {
          en: formData.title,
          zh: formData.title
        },
        date: formData.date,
        location: {
          en: formData.location,
          zh: formData.location
        },
        description: formData.description ? {
          en: formData.description,
          zh: formData.description
        } : null,
        image: formData.image ? URL.createObjectURL(formData.image) : null
      };

      // Save to submitted.json
      const response = await fetch('/api/submit-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit event');
      }
      
      setSubmitSuccess(true);
      setTimeout(() => {
        handleCloseModal();
        setFormData({
          title: '',
          date: '',
          location: '',
          description: '',
          image: null,
        });
      }, 2000);
    } catch (error) {
      setSubmitError(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isSubscriptionOpen && (
        <button
          onClick={handleOpenModal}
          className="fixed right-6 bottom-24 bg-white text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 z-50"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>{t('title')}</span>
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('form.success')}</h3>
                  <p className="text-gray-600">Your email client will open with the form details.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t('form.title')}</h3>
                      <div>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t('form.date')}</h3>
                      <div>
                        <input
                          type="text"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          placeholder="e.g., April 12, 2024"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t('form.location')}</h3>
                      <div>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g., Papuwa, Jinjiang District"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Description (Optional) */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t('form.description')} (Optional)</h3>
                      <div>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500"
                        />
                      </div>
                    </div>

                    {/* Image Upload (Optional) */}
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{t('form.image')} (Optional)</h3>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="image-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-gold-600 hover:text-gold-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gold-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="image-upload"
                                name="image"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      {formData.image && (
                        <div className="mt-2 text-sm text-gray-500">
                          Selected file: {formData.image.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      {t('form.close')}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      {isSubmitting ? 'Submitting...' : t('form.submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 