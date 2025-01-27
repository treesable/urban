'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'

interface QuestionnaireProps {
  initialData: {
    name: string
    email: string
    organization: string
  }
  onClose: () => void
  onComplete: (data: {
    primaryGoal?: string
    source?: string
    urgencyLevel?: number
    budget?: string
    interestedInvestor?: boolean
    additionalInfo?: string
  }) => void
}

type Goal = 'starting' | 'challenges' | 'enhance' | 'exploring'
type Source = 'social' | 'referral' | 'search' | 'other'

interface FormData {
  primaryGoal: Goal | null
  source: Source | null
  urgencyLevel: number
  budget: 'price1' | 'price2' | 'price3' | 'nobudget' | null
  interestedInvestor: boolean | null
  additionalInfo: string
}

const MultiStepQuestionnaire = ({ initialData, onClose, onComplete }: QuestionnaireProps) => {
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [formData, setFormData] = useState<FormData>({
    primaryGoal: null,
    source: null,
    urgencyLevel: 1,
    budget: null,
    interestedInvestor: null,
    additionalInfo: ''
  })

  const totalSteps = 6
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Send data back to parent
      onComplete(formData)
      // Show success page and trigger confetti
      setShowSuccess(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#2D5A27', '#90EE90', '#234620', '#ffffff']}
          recycle={false}
        />
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-2xl p-8 relative"
      >
        {!showSuccess ? (
          <>
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100 rounded-t-2xl overflow-hidden">
              <motion.div
                className="h-full bg-[#90EE90]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="mt-4">
              <div className="text-right text-sm text-gray-500 mb-6">
                {step}/{totalSteps}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#2D5A27]">
                      What is your primary goal in managing urban forests and green infrastructure?
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'starting', label: 'Starting a new project or initiative' },
                          { id: 'challenges', label: 'Overcoming current challenges' },
                          { id: 'enhance', label: 'Enhancing existing practices' },
                          { id: 'exploring', label: 'Exploring new possibilities' }
                        ].map((goal) => (
                          <button
                            key={goal.id}
                            onClick={() => {
                              setFormData({ ...formData, primaryGoal: goal.id as Goal })
                              handleNext()
                            }}
                            className={`p-4 rounded-xl text-left transition-all ${
                              formData.primaryGoal === goal.id
                                ? 'bg-[#90EE90] text-[#234620]'
                                : 'bg-gray-50 hover:bg-[#90EE90]/10'
                            }`}
                          >
                            {goal.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: How did you hear about us? */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#2D5A27]">
                        How did you hear about us?
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'social', label: 'Social Media' },
                          { id: 'referral', label: 'Referral from a friend or colleague' },
                          { id: 'search', label: 'Search engine' },
                          { id: 'other', label: 'Other' }
                        ].map((source) => (
                          <button
                            key={source.id}
                            onClick={() => {
                              setFormData({ ...formData, source: source.id as Source })
                              handleNext()
                            }}
                            className={`p-4 rounded-xl text-left transition-all ${
                              formData.source === source.id
                                ? 'bg-[#90EE90] text-[#234620]'
                                : 'bg-gray-50 hover:bg-[#90EE90]/10'
                            }`}
                          >
                            {source.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Urgency Level */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#2D5A27]">
                        On a scale from 1 to 10, how urgent is your need for urban forest management?
                      </h2>
                      <div className="flex justify-between items-center px-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <button
                            key={num}
                            onClick={() => {
                              setFormData({ ...formData, urgencyLevel: num })
                              handleNext()
                            }}
                            className={`w-8 h-8 rounded-full transition-all ${
                              formData.urgencyLevel === num
                                ? 'bg-[#90EE90] text-[#234620]'
                                : 'bg-gray-50 hover:bg-[#90EE90]/10'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Just curious</span>
                        <span>ASAP</span>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Budget */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#2D5A27]">
                        When it comes to your budget for urban forest management systems, which price range do you have in mind?
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'price1', label: '$75 - $180 per month' },
                          { id: 'price2', label: '$180 - $350 per month' },
                          { id: 'price3', label: '$350+ per month' },
                          { id: 'nobudget', label: "I haven't set a budget yet" }
                        ].map((price) => (
                          <button
                            key={price.id}
                            onClick={() => {
                              setFormData({ ...formData, budget: price.id as any })
                              handleNext()
                            }}
                            className={`p-4 rounded-xl text-left transition-all ${
                              formData.budget === price.id
                                ? 'bg-[#90EE90] text-[#234620]'
                                : 'bg-gray-50 hover:bg-[#90EE90]/10'
                            }`}
                          >
                            {price.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Investor Interest */}
                  {step === 5 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#2D5A27]">
                        Would you like to see the Angel investor presentation for this business?
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => {
                            setFormData({ ...formData, interestedInvestor: true })
                            handleNext()
                          }}
                          className={`p-4 rounded-xl text-left transition-all ${
                            formData.interestedInvestor === true
                              ? 'bg-[#90EE90] text-[#234620]'
                              : 'bg-gray-50 hover:bg-[#90EE90]/10'
                          }`}
                        >
                          Yes, please invite me to a presentation
                        </button>
                        <button
                          onClick={() => {
                            setFormData({ ...formData, interestedInvestor: false })
                            handleNext()
                          }}
                          className={`p-4 rounded-xl text-left transition-all ${
                            formData.interestedInvestor === false
                              ? 'bg-[#90EE90] text-[#234620]'
                              : 'bg-gray-50 hover:bg-[#90EE90]/10'
                          }`}
                        >
                          That's not for me
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Additional Information */}
                  {step === 6 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#2D5A27]">
                        Is there anything else you would like us to know?
                      </h2>
                      <textarea
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        className="w-full h-32 p-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#90EE90] transition-all"
                        placeholder="Share any additional thoughts or questions..."
                        maxLength={1000}
                      />
                      <div className="text-right text-sm text-gray-500">
                        {formData.additionalInfo.length}/1000
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className={`px-6 py-2 rounded-lg transition-all ${
                  step === 1
                    ? 'opacity-0 pointer-events-none'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-[#2D5A27] text-white px-6 py-2 rounded-lg hover:bg-[#234620] transition-all"
              >
                {step === totalSteps ? 'Complete' : 'Next'}
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            {/* Success Content */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-[#90EE90] rounded-full mx-auto mb-8 flex items-center justify-center"
            >
              <svg 
                className="w-12 h-12 text-[#2D5A27]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-[#2D5A27] mb-4"
            >
              Congratulations, {initialData.name}!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8 max-w-md mx-auto"
            >
              You've successfully joined the waitlist! Over the coming weeks, we'll be rolling out more information 
              and updates about our urban forest management platform. You'll be among the first to know.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-[#2D5A27]">What's Next?</h3>
              <ul className="text-gray-600 space-y-2">
                <li>✓ Check your email for a welcome message</li>
                <li>✓ Access your exclusive resources</li>
                <li>✓ Stay tuned for important updates</li>
              </ul>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={onClose}
              className="mt-8 bg-[#2D5A27] text-white px-8 py-3 rounded-lg hover:bg-[#234620] transition-all"
            >
              Got it!
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default MultiStepQuestionnaire 