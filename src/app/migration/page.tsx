'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKiosk } from '@/context/KioskContext';
import { KioskHeader } from '@/components/ui/KioskHeader';
import { MOCK_MIGRATION_COUNTRIES } from '@/lib/mockData';
import { MigrationCountry } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Compass, ShieldAlert, CheckCircle2, ExternalLink, Bot, GraduationCap, Briefcase, Home as HomeIcon } from 'lucide-react';

export default function MigrationHubScreen() {
  const router = useRouter();
  const { language } = useKiosk();
  const t = getTranslation(language);
  const [selectedCountry, setSelectedCountry] = useState<MigrationCountry>(MOCK_MIGRATION_COUNTRIES[0]);
  const [activeTab, setActiveTab] = useState<'study' | 'work' | 'living'>('work');

  return (
    <div className="gradient-page relative overflow-y-auto flex flex-col min-h-screen pt-24 pb-8 select-none">
      <KioskHeader title={t.migrationModuleTitle} />

      <main className="max-w-[1240px] mx-auto w-full my-auto flex flex-col justify-center px-4 sm:px-6 py-4">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in-down">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#EAE6DF] text-[#0F766E] rounded-full font-black text-xs sm:text-sm mb-2 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>{t.migrationBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1C1917] mb-1.5 tracking-tight">
            {t.migrationHeading}
          </h1>
          <p className="text-[#64748B] text-xs sm:text-base font-semibold max-w-xl mx-auto">
            {t.migrationSubheading}
          </p>
        </div>

        {/* SAFETY DISCLAIMER */}
        <div className="mb-5 p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl flex items-center gap-3 text-[#92400E] shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0" />
          <div className="text-xs sm:text-sm font-bold leading-relaxed">
            {t.officialWarning}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* LEFT COUNTRIES LIST */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {MOCK_MIGRATION_COUNTRIES.map((country) => (
              <div
                key={country.id}
                onClick={() => setSelectedCountry(country)}
                className={`p-4 rounded-[22px] cursor-pointer transition-all duration-200 border flex items-center justify-between shadow-2xs active:scale-[0.98] ${
                  selectedCountry.id === country.id
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-[1.01]'
                    : 'bg-white text-[#1C1917] border-[#E2E8F0] hover:border-[#0F766E] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl sm:text-4xl">{country.flag}</span>
                  <div>
                    <h4 className="text-base sm:text-lg font-black">{country.name}</h4>
                    <p
                      className={`text-xs font-semibold mt-0.5 ${
                        selectedCountry.id === country.id ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                      }`}
                    >
                      {t.requiredLang} {country.requiredLanguage}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* AI Assistant Quick Launch Button */}
            <div className="pt-1">
              <button
                onClick={() => router.push('/ai')}
                className="w-full min-h-[50px] py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <Bot className="w-4 h-4" />
                <span>Migratsiya AI Chat</span>
              </button>
            </div>
          </div>

          {/* RIGHT COUNTRY DETAIL */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-[30px] shadow-sm border border-[#E2E8F0] flex flex-col justify-between animate-fade-in-scale">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-4xl sm:text-5xl p-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
                    {selectedCountry.flag}
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                      {selectedCountry.name}
                    </h2>
                    <p className="text-[#0F766E] font-black text-sm sm:text-base mt-0.5">
                      {selectedCountry.salaryRange}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E] rounded-full text-xs font-black shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" /> Tasdiqlangan
                </div>
              </div>

              {/* TABS */}
              <div className="flex gap-1.5 mb-4 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
                <button
                  onClick={() => setActiveTab('work')}
                  className={`flex-1 py-2.5 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'work'
                      ? 'bg-[#0F172A] text-white shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" /> {t.tabWork}
                </button>

                <button
                  onClick={() => setActiveTab('study')}
                  className={`flex-1 py-2.5 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'study'
                      ? 'bg-[#0F172A] text-white shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" /> {t.tabStudy}
                </button>

                <button
                  onClick={() => setActiveTab('living')}
                  className={`flex-1 py-2.5 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'living'
                      ? 'bg-[#0F172A] text-white shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <HomeIcon className="w-3.5 h-3.5" /> {t.tabLiving}
                </button>
              </div>

              {/* TAB CONTENT */}
              <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-4">
                {activeTab === 'work' && (
                  <div className="space-y-3">
                    <p className="text-[#0F172A] font-medium text-xs sm:text-sm leading-relaxed">
                      {selectedCountry.workInfo}
                    </p>
                    <div>
                      <span className="font-black text-[#0F172A] text-xs block mb-1.5 uppercase tracking-wider">
                        {t.demandJobs}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCountry.inDemandJobs.map((job) => (
                          <span
                            key={job}
                            className="px-3 py-1 bg-white text-[#0F172A] rounded-lg text-xs font-bold border border-[#E2E8F0] shadow-2xs"
                          >
                            ✓ {job}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'study' && (
                  <p className="text-[#0F172A] font-medium text-xs sm:text-sm leading-relaxed">
                    {selectedCountry.studyInfo}
                  </p>
                )}

                {activeTab === 'living' && (
                  <p className="text-[#0F172A] font-medium text-xs sm:text-sm leading-relaxed">
                    {selectedCountry.livingInfo}
                  </p>
                )}
              </div>

              {/* OFFICIAL SOURCES LIST */}
              <div>
                <h4 className="font-black text-[#475569] text-xs mb-2 uppercase tracking-wider">
                  {t.officialLinks}
                </h4>
                <div className="space-y-1.5">
                  {selectedCountry.officialSources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:border-[#0F172A] hover:bg-white transition-all text-[#0F172A] font-bold text-xs group shadow-2xs"
                    >
                      <span className="group-hover:text-[#0F766E] transition-colors">
                        {source.title}
                      </span>
                      <div className="flex items-center gap-2 text-[#64748B] text-[11px]">
                        <span>{source.date}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#0F766E]" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
