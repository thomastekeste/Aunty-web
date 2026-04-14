/** Reusable mock tab bar for phone mockups. Pass activeTab to highlight one. */
export default function MockTabBar({ activeTab = "Home" }: { activeTab?: string }) {
  const tabs = [
    {
      name: "Home",
      icon: (c: string) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15C15 14.4477 14.5523 14 14 14H10C9.44772 14 9 14.4477 9 15V21H4C3.44772 21 3 20.5523 3 20V10.5Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "Ritual",
      icon: (c: string) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" stroke={c} strokeWidth="2"/>
          <path d="M4 10H20" stroke={c} strokeWidth="2"/>
          <path d="M8 3V7" stroke={c} strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 3V7" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: "Products",
      icon: (c: string) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke={c} strokeWidth="2"/>
          <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "Chat",
      icon: (c: string) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M21 12C21 16.4183 16.9706 20 12 20C10.8053 20 9.66162 19.8004 8.6085 19.4341L3 21L4.48953 16.3754C3.55037 15.0911 3 13.5956 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "Learn",
      icon: (c: string) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  const gold = "#D4A04A";
  const muted = "#9E8C7A";

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[rgba(45,27,14,0.06)] px-1 pt-1.5 pb-3">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const active = tab.name === activeTab;
          return (
            <div key={tab.name} className="flex flex-col items-center gap-[2px] relative">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
