import Active from '@/components/Active' 
import DynamicBanner from '@/components/DynamicBanner'
import LatestActivities from '@/components/LatestActivities'
import SupportList from '@/components/SupportList'
import React from 'react'

const page = () => {
  return (
<div className="flex flex-col min-h-screen bg-gray-100"> 
      <div className="flex flex-grow"> 
        <div className="flex-grow flex flex-col gap-4 overflow-hidden">
           <DynamicBanner route='/therapist'/>
          <div className="flex w-full  px-8">
            {/* Social Posts */}
            <div className="w-[70%] f7lex flex-col">
              <SupportList/>
            </div>
            {/* Right Sidebar */}
            <div className="w-[30%] hidden lg:flex flex-col gap-6 sticky top-0">
              <Active />
              <LatestActivities/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
