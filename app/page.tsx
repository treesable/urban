'use client'
import React from 'react'
import HeroSection from '@/components/HeroSection'
import CoreBenefits from '@/components/CoreBenefits'
import AboutUs from '@/components/AboutUs'
import ValueProposition from '@/components/ValueProposition'
import BonusOffer from '@/components/BonusOffer'
import SocialProof from '@/components/SocialProof'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValueProposition />
      <CoreBenefits />
      <AboutUs />
      <SocialProof />
      <BonusOffer />
    </main>
  )
} 