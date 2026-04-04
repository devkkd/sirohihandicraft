import GetInTouch from '@/components/GetInTouch'
import Globe from '@/components/Globe'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import WhatWeMake from '@/components/WhatWeMake'
import Whoweare from '@/components/Whoweare'
import React from 'react'

export default function page() {
  return (
    <div >
      <Hero />
      <Whoweare />
      <WhatWeMake/>
      <Globe/>
      <Testimonials/>
      <GetInTouch/>
    </div>
  )
}
