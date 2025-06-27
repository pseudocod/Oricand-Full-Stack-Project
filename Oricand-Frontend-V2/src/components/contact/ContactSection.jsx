import { useContactForm } from "../../hooks/useContactForm";

export default function ContactSection() {
  const {
    formData,
    isSubmitting,
    submitStatus,
    errorMessage,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative p-4 lg:p-20">
        <div className="w-full h-full relative rounded-xs overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.1!2d21.224272!3d45.750721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610c11d3%3A0x1234567890abcdef!2sBulevardul%20Regele%20Ferdinand%20I%2C%20Timi%C8%99oara%2C%20Romania!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ORICÂND Location"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-100 flex items-start justify-center p-4 lg:p-8">
        <div className="w-full max-lg pt-8 lg:pt-11">
          <h2 className="text-2xl lg:text-3xl font-bold uppercase mb-12 leading-tight">
            QUESTIONS ABOUT OUR COFFEE OR SUGGESTIONS FOR NEXT DROPS?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {submitStatus === "success" && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 font-medium">
                      Thank you for your message!
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      We'll get back to you soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">
                      Error sending message
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      {errorMessage ||
                        "Please try again or contact us directly."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-4 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full p-4 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message *"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                required
                disabled={isSubmitting}
                className="w-full p-4 border-b border-gray-300 bg-transparent focus:outline-none focus:border-black placeholder-gray-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-black text-white py-4 px-8 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  SENDING...
                </span>
              ) : (
                "SEND MESSAGE"
              )}
            </button>
          </form>

          <div className="mt-8 text-sm text-gray-600">
            <p>For sales and marketing, contact</p>
            <a
              href="mailto:oricandcoffee@gmail.com"
              className="underline hover:no-underline"
            >
              oricandcoffee@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
