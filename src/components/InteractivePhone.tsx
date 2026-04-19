"use client";

import { useState } from "react";
import PhoneMockup from "./PhoneMockup";

type Tab = "Home" | "Plan" | "Products" | "Chat" | "Learn";

const tabs: { name: Tab; icon: (c: string) => React.ReactNode }[] = [
  {
    name: "Home",
    icon: (c) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15C15 14.4477 14.5523 14 14 14H10C9.44772 14 9 14.4477 9 15V21H4C3.44772 21 3 20.5523 3 20V10.5Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Plan",
    icon: (c) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" stroke={c} strokeWidth="2"/>
        <path d="M4 10H20" stroke={c} strokeWidth="2"/>
        <path d="M8 3V7" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 3V7" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Products",
    icon: (c) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke={c} strokeWidth="2"/>
        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Chat",
    icon: (c) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M21 12C21 16.4183 16.9706 20 12 20C10.8053 20 9.66162 19.8004 8.6085 19.4341L3 21L4.48953 16.3754C3.55037 15.0911 3 13.5956 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Learn",
    icon: (c) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const gold = "#D4A04A";
const muted = "#9E8C7A";

// ─── Screen content for each tab ───

function HomeScreen() {
  return (
    <div className="flex-1 overflow-hidden px-4 pt-2 pb-14">
      {/* Top bar */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#2A7B7B] mb-0.5">Week 1</p>
          <p className="font-display text-[16px] font-bold text-[#2D1B0E] leading-tight">Good morning, Queen</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#2A7B7B] flex items-center justify-center mt-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#FEF8EC" strokeWidth="2"/>
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.988C9.5799 19.718 9.31074 19.5119 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01198 9.77251C4.28196 9.5799 4.48814 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#FEF8EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Today's Plan card */}
      <div className="rounded-2xl p-3.5 mb-3.5" style={{ backgroundColor: '#2A7B7B' }}>
        <div className="flex items-center justify-between mb-1">
          <p className="font-body text-[7px] font-semibold tracking-[1.5px] uppercase text-[rgba(254,248,236,0.7)]">Today&rsquo;s Plan</p>
          <span className="font-body text-[7px] font-semibold px-2 py-0.5 rounded-full bg-[rgba(254,248,236,0.15)] text-[#FEF8EC]">30 min</span>
        </div>
        <p className="font-display text-[15px] font-bold text-[#FEF8EC] mb-1">Wash Day</p>
        <p className="font-body text-[8px] text-[rgba(254,248,236,0.7)] mb-3 leading-relaxed">Deep cleanse &amp; moisture reset for your curls</p>
        <div className="flex gap-2">
          <div className="flex-1 h-[28px] rounded-lg bg-[#FEF8EC] flex items-center justify-center">
            <span className="font-body text-[8px] font-bold text-[#2A7B7B]">Start Plan</span>
          </div>
          <div className="h-[28px] w-[28px] rounded-lg bg-[rgba(254,248,236,0.15)] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="#FEF8EC" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Week progress */}
      <div className="mb-3.5">
        <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#9E8C7A] mb-2">This Week</p>
        <div className="flex gap-1.5 overflow-hidden">
          {[
            { day: "Mon", date: 7, ritual: "Rest", color: "#9E8C7A", done: true },
            { day: "Tue", date: 8, ritual: "Scalp", color: "#C75B2A", done: true },
            { day: "Wed", date: 9, ritual: "Wash", color: "#2A7B7B", done: false, today: true },
            { day: "Thu", date: 10, ritual: "Style", color: "#7B3F6B", done: false },
            { day: "Fri", date: 11, ritual: "Protect", color: "#3D5A99", done: false },
            { day: "Sat", date: 12, ritual: "Refresh", color: "#C2456E", done: false },
            { day: "Sun", date: 13, ritual: "Rest", color: "#9E8C7A", done: false },
          ].map((d) => (
            <div
              key={d.day}
              className="flex flex-col items-center rounded-lg py-1.5 px-1 min-w-[28px]"
              style={{
                backgroundColor: d.today ? d.color : d.done ? `${d.color}15` : 'transparent',
                border: d.today ? 'none' : d.done ? 'none' : '1px solid #E8DCC8',
              }}
            >
              <span className={`font-body text-[6px] ${d.today ? 'text-[rgba(254,248,236,0.7)]' : 'text-[#9E8C7A]'}`}>{d.day}</span>
              <span className={`font-display text-[11px] font-bold my-0.5 ${d.today ? 'text-[#FEF8EC]' : 'text-[#2D1B0E]'}`}>{d.date}</span>
              {d.done && !d.today && (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13L9 17L19 7" stroke={d.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {d.today && <div className="w-[5px] h-[5px] rounded-full bg-[#FEF8EC]" />}
              {!d.done && !d.today && <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: `${d.color}30` }} />}
              <span className={`font-body text-[5px] mt-0.5 ${d.today ? 'text-[rgba(254,248,236,0.7)]' : 'text-[#9E8C7A]'}`}>{d.ritual}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aunty quote card */}
      <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: '#1A7A4A' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-[#FEF8EC20] flex items-center justify-center text-[10px]">M</div>
          <div>
            <p className="font-body text-[8px] font-semibold text-[#FEF8EC]">Aunty Marcia</p>
            <p className="font-body text-[6px] text-[rgba(254,248,236,0.6)]">Kingston, Jamaica</p>
          </div>
        </div>
        <p className="font-body text-[8px] text-[#FEF8EC] leading-relaxed mb-2 italic">&ldquo;Your hair holds memory, darling. Wash day is how we start fresh.&rdquo;</p>
        <div className="h-[22px] rounded-md bg-[rgba(254,248,236,0.15)] flex items-center justify-center">
          <span className="font-body text-[7px] font-semibold text-[#FEF8EC]">Chat with Marcia</span>
        </div>
      </div>

      {/* Aunty's Tip */}
      <div className="rounded-xl bg-white p-3" style={{ boxShadow: '0 2px 8px rgba(45,27,14,0.06)' }}>
        <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-1.5">Aunty&rsquo;s Tip</p>
        <p className="font-body text-[8px] text-[#5C4433] leading-relaxed">Sleep on a satin pillowcase to lock in tonight&rsquo;s moisture...</p>
      </div>
    </div>
  );
}

function PlanScreen() {
  const rituals = [
    { time: "Morning", name: "Pre-poo Treatment", duration: "15 min", color: "#D4A04A", done: false },
    { time: "Morning", name: "Gentle Cleanse", duration: "10 min", color: "#2A7B7B", done: false },
    { time: "Afternoon", name: "Deep Condition", duration: "30 min", color: "#1A7A4A", done: false },
    { time: "Evening", name: "Moisturize & Seal", duration: "10 min", color: "#7B3F6B", done: false },
  ];

  return (
    <div className="flex-1 overflow-hidden px-4 pt-2 pb-14">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-0.5">Wednesday</p>
          <p className="font-display text-[16px] font-bold text-[#2D1B0E] leading-tight">Wash Day Plan</p>
        </div>
        <span className="font-body text-[8px] font-semibold px-2.5 py-1 rounded-full bg-[#2A7B7B] text-[#FEF8EC]">4 steps</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-[4px] rounded-full bg-[#E8DCC8]">
          <div className="h-full rounded-full bg-[#D4A04A]" style={{ width: '0%' }} />
        </div>
        <span className="font-body text-[7px] text-[#9E8C7A]">0/4</span>
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        {rituals.map((r, i) => (
          <div key={i} className="rounded-xl bg-white p-3 flex items-center gap-3" style={{ boxShadow: '0 1px 4px rgba(45,27,14,0.05)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: r.color + '15' }}>
              <span className="font-display text-[11px] font-bold" style={{ color: r.color }}>{i + 1}</span>
            </div>
            <div className="flex-1">
              <p className="font-display text-[11px] font-bold text-[#2D1B0E]">{r.name}</p>
              <p className="font-body text-[7px] text-[#9E8C7A]">{r.time} &middot; {r.duration}</p>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#9E8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </div>

      {/* Aunty tip */}
      <div className="mt-3.5 rounded-xl p-3 bg-[#FDF6E8] border border-[#D4A04A20]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-full bg-[#D4A04A20] flex items-center justify-center text-[7px] font-bold text-[#D4A04A]">N</div>
          <p className="font-body text-[7px] font-semibold text-[#D4A04A]">Ngozi says:</p>
        </div>
        <p className="font-body text-[8px] text-[#5C4433] italic leading-relaxed">&ldquo;Section di hair into four before you start. Trust me.&rdquo;</p>
      </div>
    </div>
  );
}

function ProductsScreen() {
  const products = [
    { name: "Kéra Revival Repair Treatment", match: "98%", color: "#1A7A4A" },
    { name: "Soleil Curl Nourishing Hair Oil", match: "95%", color: "#2A7B7B" },
    { name: "Lumina Botanics Leave-In Cream", match: "92%", color: "#D4A04A" },
    { name: "Coilcraft Deep Repair Mask", match: "89%", color: "#7B3F6B" },
  ];

  return (
    <div className="flex-1 overflow-hidden px-4 pt-2 pb-14">
      <div className="mb-3">
        <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-0.5">Your Shelf</p>
        <p className="font-display text-[16px] font-bold text-[#2D1B0E] leading-tight">Recommended For You</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 mb-3.5">
        {["All", "Wash Day", "Styling", "Oils"].map((f, i) => (
          <span
            key={f}
            className="font-body text-[7px] px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: i === 0 ? '#2D1B0E' : '#FEF8EC',
              color: i === 0 ? '#FEF8EC' : '#9E8C7A',
              border: i === 0 ? 'none' : '1px solid #E8DCC8',
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Product cards */}
      <div className="space-y-2.5">
        {products.map((p) => (
          <div key={p.name} className="rounded-xl bg-white p-3 flex items-center gap-3" style={{ boxShadow: '0 1px 4px rgba(45,27,14,0.05)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: p.color + '15' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[10px] font-bold text-[#2D1B0E] truncate">{p.name}</p>
              <p className="font-body text-[7px] text-[#9E8C7A]">Match score</p>
            </div>
            <span className="font-display text-[12px] font-bold" style={{ color: p.color }}>{p.match}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="flex-1 overflow-hidden px-4 pt-2 pb-14 flex flex-col">
      <div className="mb-3">
        <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-0.5">Ask Your Aunties</p>
        <p className="font-display text-[16px] font-bold text-[#2D1B0E] leading-tight">Chat</p>
      </div>

      {/* Aunty selector */}
      <div className="flex gap-2 mb-4">
        {[
          { initial: "N", color: "#D4A04A", name: "Ngozi" },
          { initial: "M", color: "#1A7A4A", name: "Marcia" },
          { initial: "D", color: "#3D5A99", name: "Denise" },
        ].map((a, i) => (
          <div key={a.name} className="flex flex-col items-center gap-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: i === 0 ? a.color : a.color + '15',
                color: i === 0 ? '#FEF8EC' : a.color,
                border: i === 0 ? 'none' : `1.5px solid ${a.color}40`,
              }}
            >
              {a.initial}
            </div>
            <span className="font-body text-[6px]" style={{ color: i === 0 ? a.color : '#9E8C7A' }}>{a.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#E8DCC8] text-[10px] text-[#9E8C7A]">+4</div>
          <span className="font-body text-[6px] text-[#9E8C7A]">More</span>
        </div>
      </div>

      {/* Chat bubbles */}
      <div className="flex-1 space-y-2.5">
        <div className="flex gap-2 items-end">
          <div className="w-5 h-5 rounded-full bg-[#D4A04A] flex items-center justify-center text-[6px] font-bold text-[#FEF8EC] flex-shrink-0">N</div>
          <div className="rounded-xl rounded-bl-sm bg-[#FDF6E8] border border-[#D4A04A20] px-3 py-2 max-w-[75%]">
            <p className="font-body text-[8px] text-[#2D1B0E] leading-relaxed">Wetin happen? Tell Aunty everything about dis hair.</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-xl rounded-br-sm bg-[#2D1B0E] px-3 py-2 max-w-[75%]">
            <p className="font-body text-[8px] text-[#FEF8EC] leading-relaxed">My curls are so dry after wash day!</p>
          </div>
        </div>
        <div className="flex gap-2 items-end">
          <div className="w-5 h-5 rounded-full bg-[#D4A04A] flex items-center justify-center text-[6px] font-bold text-[#FEF8EC] flex-shrink-0">N</div>
          <div className="rounded-xl rounded-bl-sm bg-[#FDF6E8] border border-[#D4A04A20] px-3 py-2 max-w-[75%]">
            <p className="font-body text-[8px] text-[#2D1B0E] leading-relaxed">Ah! You no dey seal? After leave-in, you need oil THEN cream. Lock. It. In.</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-[28px] rounded-full bg-[#F5EDE0] flex items-center px-3">
          <span className="font-body text-[8px] text-[#9E8C7A]">Ask your aunty...</span>
        </div>
        <div className="w-[28px] h-[28px] rounded-full bg-[#D4A04A] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="#FEF8EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LearnScreen() {
  const articles = [
    { title: "Why Your Curls Shrink (and Why That's Beautiful)", tag: "Science", color: "#3D5A99", aunty: "D" },
    { title: "The LOC Method: A Step-By-Step", tag: "Technique", color: "#D4A04A", aunty: "N" },
    { title: "Protein vs Moisture: Finding Your Balance", tag: "Deep Dive", color: "#2A7B7B", aunty: "S" },
  ];

  return (
    <div className="flex-1 overflow-hidden px-4 pt-2 pb-14">
      <div className="mb-3">
        <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#D4A04A] mb-0.5">Hair School</p>
        <p className="font-display text-[16px] font-bold text-[#2D1B0E] leading-tight">Learn</p>
      </div>

      {/* Featured */}
      <div className="rounded-2xl p-3.5 mb-3.5 relative overflow-hidden" style={{ backgroundColor: '#3D5A99' }}>
        <p className="font-body text-[7px] font-semibold text-[rgba(254,248,236,0.6)] mb-1">Featured Lesson</p>
        <p className="font-display text-[13px] font-bold text-[#FEF8EC] mb-1.5 leading-snug">Understanding Your Curl Pattern</p>
        <p className="font-body text-[8px] text-[rgba(254,248,236,0.6)] mb-2.5">With Aunty Denise &middot; 5 min read</p>
        <div className="h-[24px] w-[90px] rounded-md bg-[rgba(254,248,236,0.15)] flex items-center justify-center">
          <span className="font-body text-[7px] font-semibold text-[#FEF8EC]">Start Reading</span>
        </div>
      </div>

      {/* Article list */}
      <p className="font-body text-[7px] font-semibold tracking-[2px] uppercase text-[#9E8C7A] mb-2">Recent</p>
      <div className="space-y-2.5">
        {articles.map((a) => (
          <div key={a.title} className="rounded-xl bg-white p-3 flex items-start gap-2.5" style={{ boxShadow: '0 1px 4px rgba(45,27,14,0.05)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold" style={{ backgroundColor: a.color + '15', color: a.color }}>
              {a.aunty}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[10px] font-bold text-[#2D1B0E] leading-snug mb-0.5">{a.title}</p>
              <span className="font-body text-[6px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: a.color + '12', color: a.color }}>{a.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───

export default function InteractivePhone() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const screens: Record<Tab, React.ReactNode> = {
    Home: <HomeScreen />,
    Plan: <PlanScreen />,
    Products: <ProductsScreen />,
    Chat: <ChatScreen />,
    Learn: <LearnScreen />,
  };

  return (
    <PhoneMockup screenBg="#FEF8EC">
      <div className="h-full flex flex-col bg-[#FEF8EC] overflow-hidden relative">
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1">
          <span className="font-body text-[9px] font-semibold text-[#2D1B0E]">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="12" height="9" viewBox="0 0 12 9" fill="#2D1B0E"><rect x="0" y="4" width="2.5" height="5" rx="0.5"/><rect x="3.2" y="2.5" width="2.5" height="6.5" rx="0.5"/><rect x="6.4" y="1" width="2.5" height="8" rx="0.5"/><rect x="9.5" y="0" width="2.5" height="9" rx="0.5" opacity="0.3"/></svg>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#2D1B0E"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
            <div className="flex items-center">
              <div className="w-5 h-[9px] rounded-[2px] border border-[#2D1B0E] relative">
                <div className="absolute inset-[1px] rounded-[1px] bg-[#2D1B0E]" style={{ width: '70%' }} />
              </div>
              <div className="w-[1.5px] h-[4px] bg-[#2D1B0E] rounded-r-full ml-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Screen content — keyed for transition */}
        {screens[activeTab]}

        {/* Interactive tab bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[rgba(45,27,14,0.06)] px-1 pt-1.5 pb-3">
          <div className="flex justify-around items-center">
            {tabs.map((tab) => {
              const active = tab.name === activeTab;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className="flex flex-col items-center gap-[2px] relative cursor-pointer"
                >
                  {tab.icon(active ? gold : muted)}
                  <span
                    className={`font-body text-[6px] ${active ? "font-semibold" : ""}`}
                    style={{ color: active ? gold : muted }}
                  >
                    {tab.name}
                  </span>
                  {active && (
                    <div
                      className="w-[4px] h-[4px] rounded-full"
                      style={{ background: "linear-gradient(135deg, #D4A04A, #B8862E)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneMockup>
  );
}
