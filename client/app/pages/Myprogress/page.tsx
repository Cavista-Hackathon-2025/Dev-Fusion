"use client";

import AppointmentCalendar from "@/components/ProgressComponents/Appointement";
import EmotionalHealthTracker from "@/components/ProgressComponents/CurrentVitals";
import EmotionalHealingOverview from "@/components/ProgressComponents/EmotionalHealthOverview";
import Head from "@/components/ProgressComponents/header"; 
import React from "react"; 
import PersonalGrowthChart from "@/components/ProgressComponents/PersonalGrowth";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> 

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */} 

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          <Head />

          {/* Dashboard Content */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left Column */}
            <div className="flex flex-col space-y-6 flex-1">
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Emotional Health Tracker</h3>
                <EmotionalHealthTracker />
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Emotional Healing Overview</h3>
                <EmotionalHealingOverview />
              </section>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-6 flex-1">
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Appointment Calendar</h3>
                <AppointmentCalendar />
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Growth Chart</h3>
                <PersonalGrowthChart />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
