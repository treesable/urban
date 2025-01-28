'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'

type StepProps = {
  formData: FormData
  setFormData: (data: FormData) => void
  handleNext: () => void
}

export type Goal = 'starting' | 'challenges' | 'enhance' | 'exploring'
export type Source = 'social' | 'referral' | 'search' | 'other'
export type Budget = 'price1' | 'price2' | 'price3' | 'nobudget'

export interface FormData {
  primaryGoal: Goal | null
  source: Source | null
  urgencyLevel: number
  budget: Budget | null
  interestedInvestor: boolean | null
  additionalInfo: string
}

export interface QuestionnaireProps {
  initialData: {
    name: string
    email: string
    organization: string
  }
  onClose: () => void
  onComplete: (data: FormData) => void
  isSubmitting?: boolean
  error?: string | null
}

const Step1 = ({ formData, setFormData, handleNext }: StepProps) => {
  return (
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
  )
}

const Step2 = ({ formData, setFormData, handleNext }: StepProps) => {
  return (
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
  )
}

const MultiStepQuestionnaire: React.FC<QuestionnaireProps> = ({ 
  initialData, 
  onClose, 
  onComplete, 
  isSubmitting = false,
  error = null 
}) => {
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const [formData, setFormData] = useState<FormData>({
    primaryGoal: null,
    source: null,
    urgencyLevel: 1,
    budget: null,
    interestedInvestor: null,
    additionalInfo: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const totalSteps = 6
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmitComplete(formData)
    }
  }

  const handleSubmitComplete = async (finalData: FormData) => {
    try {
      await onComplete(finalData)
      setShowSuccess(true)
      setShowConfetti(true)
    } catch (error) {
      console.error('Failed to submit:', error)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleGotIt = () => {
    setShowConfetti(false)
    onClose()
  }

  if (showSuccess) {
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
            recycle={false}
            numberOfPieces={500}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 bg-white rounded-2xl p-8 max-w-md mx-auto relative z-50"
        >
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

          <h2 className="text-3xl font-bold text-[#2D5A27] mb-4">
            Congratulations, {initialData.name}!
          </h2>

          <p className="text-gray-600 mb-8">
            You've successfully joined our waitlist! We'll be in touch soon with more information.
          </p>

          <button
            onClick={handleGotIt}
            className="bg-[#2D5A27] text-white px-8 py-3 rounded-lg hover:bg-[#234620] transition-all"
          >
            Got it!
          </button>
        </motion.div>
      </motion.div>
    )
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
          recycle={true}
          numberOfPieces={200}
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
                  {step === 1 && <Step1 formData={formData} setFormData={setFormData} handleNext={handleNext} />}
                  {step === 2 && <Step2 formData={formData} setFormData={setFormData} handleNext={handleNext} />}

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

            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 bg-white rounded-2xl p-8 max-w-md mx-auto relative z-50"
          >
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

            <h2 className="text-3xl font-bold text-[#2D5A27] mb-4">
              Congratulations, {initialData.name}!
            </h2>

            <p className="text-gray-600 mb-8">
              You've successfully joined our waitlist! We'll be in touch soon with more information.
            </p>

            <button
              onClick={handleGotIt}
              className="bg-[#2D5A27] text-white px-8 py-3 rounded-lg hover:bg-[#234620] transition-all"
            >
              Got it!
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default MultiStepQuestionnaire 