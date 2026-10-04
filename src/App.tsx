import React, { useState, useRef, useEffect } from 'react';
import { Heart, Eye, Share2, Flag, Link as LinkIcon, Sparkles, Rocket, ShieldCheck, Clipboard, Flame } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { PaidPackagesSection } from './components/PaidPackagesSection';
import { ReferralSection } from './components/ReferralSection';

interface ServiceAction {
  id: string;
  name: string;
  icon: React.ReactNode;
  qty: string;
  badge?: string;
}

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  color: string;
  badgeColor: string;
  gradient: string;
  activeBg: string;
  icon: string;
  placeholder: string;
  actions: ServiceAction[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: 'সুপার ফাস্ট লাইভ বুস্টার',
    color: '#000000',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    gradient: 'bg-gradient-to-r from-gray-900 via-neutral-900 to-black',
    activeBg: 'bg-black text-white shadow-xl shadow-black/25 ring-2 ring-black',
    icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png',
    placeholder: 'https://vt.tiktok.com/... অথবা ভিডিও লিংক পেস্ট করুন',
    actions: [
      { id: '14888', name: 'Like', icon: <Heart size={18} className="text-rose-400" />, qty: '15', badge: 'Fast ⚡' },
      { id: '3231', name: 'View', icon: <Eye size={18} className="text-cyan-400" />, qty: '300', badge: 'Instant 🚀' },
      { id: '29452', name: 'Share', icon: <Share2 size={18} className="text-emerald-400" />, qty: '100', badge: 'Active 🔥' },
      { id: '27953', name: 'Report', icon: <Flag size={18} className="text-amber-400" />, qty: '100', badge: 'Safe 🛡️' },
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'হাই স্পিড সোশ্যাল গ্রোথ',
    color: '#e1306c',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
    gradient: 'bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600',
    activeBg: 'bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 text-white shadow-xl shadow-pink-500/25 ring-2 ring-pink-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
    placeholder: 'https://www.instagram.com/reel/... অথবা পোস্ট লিংক পেস্ট করুন',
    actions: [
      { id: '29528', name: 'Like', icon: <Heart size={18} className="text-pink-300" />, qty: '15', badge: 'Fast ⚡' },
      { id: '31766', name: 'View', icon: <Eye size={18} className="text-yellow-300" />, qty: '300', badge: 'Instant 🚀' },
      { id: '36223', name: 'Share', icon: <Share2 size={18} className="text-purple-300" />, qty: '100', badge: 'Active 🔥' },
      { id: '36344', name: 'Report', icon: <Flag size={18} className="text-rose-300" />, qty: '100', badge: 'Safe 🛡️' },
    ]
  }
];

let audioCtx: AudioContext | null = null;

const playClickSound = () => {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.error("Audio play failed:", e);
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'tiktok' | 'instagram' | 'paid'>('tiktok');
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [timers, setTimers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const intervalsRef = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    // Inject Adsterra Native Banner script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = "//pl29089921.profitablecpmratenetwork.com/f139bed64c586705dcb7d8c9131768e8/invoke.js";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // 🛑 Block and suppress all ads when Paid Packages tab is active
  useEffect(() => {
    const stickyAd = document.getElementById('sticky-ad-container');
    if (activeTab === 'paid') {
      document.body.classList.add('paid-mode-active');
      if (stickyAd) {
        stickyAd.style.setProperty('display', 'none', 'important');
      }

      // Hide all dynamic floating/iframe/push ad elements
      const hideAllAds = () => {
        const adElements = document.querySelectorAll(
          '#sticky-ad-container, iframe[src*="profitablecpmratenetwork"], iframe[src*="highperformanceformat"], iframe[src*="omg10"], [id^="pl290"], [class*="adsterra"], [id*="adsterra"], div[style*="z-index: 9999"], div[style*="z-index: 2147483647"], div[style*="z-index: 100000"]'
        );
        adElements.forEach(el => {
          (el as HTMLElement).style.setProperty('display', 'none', 'important');
          (el as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
        });
      };

      hideAllAds();
      // Run once more after 300ms in case a script injects something asynchronously
      const timer = setTimeout(hideAllAds, 300);
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('paid-mode-active');
      if (stickyAd) {
        stickyAd.style.removeProperty('display');
      }
      const adElements = document.querySelectorAll(
        '#sticky-ad-container, iframe[src*="profitablecpmratenetwork"], iframe[src*="highperformanceformat"], iframe[src*="omg10"], [id^="pl290"], [class*="adsterra"], [id*="adsterra"], div[style*="z-index: 9999"], div[style*="z-index: 2147483647"], div[style*="z-index: 100000"]'
      );
      adElements.forEach(el => {
        (el as HTMLElement).style.removeProperty('display');
        (el as HTMLElement).style.removeProperty('pointer-events');
      });
    }
  }, [activeTab]);

  const handleUrlChange = (id: string, value: string) => {
    setUrls(prev => ({ ...prev, [id]: value }));
  };

  const pasteFromClipboard = async (id: string) => {
    playClickSound();
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrls(prev => ({ ...prev, [id]: text.trim() }));
          return;
        }
      }
      alert("অনুগ্রহ করে আপনার লিংকটি বক্সে পেস্ট (Paste) করুন।");
    } catch (e) {
      alert("ক্লিপবোর্ড থেকে সরাসরি পেস্ট করা যায়নি। অনুগ্রহ করে বক্সে লং-প্রেস করে পেস্ট করুন।");
    }
  };

  const sendRequest = async (serviceId: string, actionId: string, qty: string) => {
    playClickSound();
    
    if ((timers[serviceId] || 0) > 0) {
      alert(`দয়া করে আরও ${timers[serviceId]} সেকেন্ড অপেক্ষা করুন!`);
      return;
    }

    const link = urls[serviceId];
    if (!link || !link.trim()) {
      alert("ভিডিও বা পোস্টের লিঙ্ক পেস্ট করুন আগে!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: serviceId,
          service: actionId,
          link: link.trim(),
          quantity: qty
        })
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        throw new Error('সার্ভার থেকে সঠিক রেসপন্স পাওয়া যায়নি।');
      }

      if (!res.ok || data.error) {
        console.error('API Error:', data.error || 'Unknown error');
        if (data.error && data.error.toLowerCase().includes('sufficient balance')) {
          alert('দুঃখিত, বর্তমানে সার্ভারে পর্যাপ্ত ব্যালেন্স নেই। দয়া করে কিছুক্ষণ পরে আবার চেষ্টা করুন।');
        } else {
          alert(`সমস্যা হয়েছে: ${data.error || 'Unknown error'}`);
        }
        return;
      }

      console.log('Request sent successfully:', data);
      alert("🎉 অর্ডার সফল হয়েছে! পরবর্তী অর্ডারের জন্য দয়া করে ১৮০ সেকেন্ড অপেক্ষা করুন।");
      
      // Clear existing timer if any
      if (intervalsRef.current[serviceId]) {
        clearInterval(intervalsRef.current[serviceId]);
      }

      // Start new countdown
      setTimers(prev => ({ ...prev, [serviceId]: 180 }));
      
      intervalsRef.current[serviceId] = setInterval(() => {
        setTimers(prev => {
          const newTime = (prev[serviceId] || 180) - 1;
          if (newTime <= 0) {
            clearInterval(intervalsRef.current[serviceId]);
            return { ...prev, [serviceId]: 0 };
          }
          return { ...prev, [serviceId]: newTime };
        });
      }, 1000);

    } catch (error: any) {
      console.error('Network error:', error);
      alert(`সমস্যা হয়েছে! ${error.message || 'ইন্টারনেট কানেকশন চেক করুন বা পরে আবার চেষ্টা করুন।'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeService = SERVICES.find(s => s.id === activeTab) || SERVICES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans pb-12 selection:bg-purple-200">
      
      {/* 🚀 Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-xs">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-purple-200/80 shadow-md shadow-purple-500/15 shrink-0 bg-white">
              <img src="/logo.png" alt="FreeViral Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
                freeviral.shop
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>100% Free & Active</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200/60 text-xs font-bold">
            <ShieldCheck size={14} className="text-green-600" />
            <span>কোনো পাসওয়ার্ড লাগবে না</span>
          </div>
        </div>

        {/* 🌟 Top Navigation Menu (TikTok, Instagram & Paid Packages) */}
        <div className="bg-gradient-to-b from-gray-50/80 to-white px-2.5 pb-3 pt-1 border-t border-gray-100/80">
          <div className="max-w-xl mx-auto">
            <div className="p-1.5 bg-gray-200/80 rounded-2xl flex items-center gap-1.5 shadow-inner">
              {SERVICES.map((s) => {
                const isActive = activeTab === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      playClickSound();
                      setActiveTab(s.id as 'tiktok' | 'instagram');
                    }}
                    className={`flex-1 relative flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-black text-xs sm:text-base cursor-pointer transition-all duration-300 select-none ${
                      isActive 
                        ? s.activeBg 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60 bg-transparent'
                    }`}
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/90 p-0.5 shadow-xs flex items-center justify-center shrink-0">
                      <img src={s.icon} alt={s.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="tracking-wide">{s.name}</span>
                    {isActive ? (
                      <span className={`text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-md border ${s.badgeColor}`}>
                        ফ্রি
                      </span>
                    ) : null}
                  </button>
                );
              })}

              {/* Paid Packages Tab */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  setActiveTab('paid');
                }}
                className={`flex-1 relative flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-black text-xs sm:text-base cursor-pointer transition-all duration-300 select-none ${
                  activeTab === 'paid'
                    ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-xl shadow-rose-500/25 ring-2 ring-rose-500'
                    : 'text-amber-800 hover:text-amber-950 hover:bg-white/60 bg-amber-50/70 border border-amber-200/50'
                }`}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/90 p-0.5 shadow-xs flex items-center justify-center shrink-0">
                  <Flame size={16} className="text-amber-500 fill-amber-500/30" />
                </div>
                <span className="tracking-wide">পেইড প্যাক</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border ${
                  activeTab === 'paid' 
                    ? 'bg-yellow-400 text-gray-950 border-yellow-300' 
                    : 'bg-rose-500 text-white border-rose-400 animate-pulse'
                }`}>
                  ১০টি
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 pt-4">
        {activeTab === 'paid' ? (
          <PaidPackagesSection 
            playClickSound={playClickSound}
            initialVideoUrl={urls['tiktok'] || urls['instagram'] || ''}
            onBackToFree={() => {
              playClickSound();
              setActiveTab('tiktok');
            }}
          />
        ) : (
          <>
            {/* Promo Banner to Paid Packages */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                setActiveTab('paid');
              }}
              className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 p-0.5 rounded-3xl mb-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="bg-white rounded-[22px] p-3.5 sm:p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Flame size={20} className="animate-bounce" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-gray-900 group-hover:text-purple-600 transition-colors">
                        ১০টি বিশেষ পেইড সার্ভিস প্যাকেজ!
                      </span>
                      <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                        ৳৬০ থেকে শুরু
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      ৫০০ লাইক + ১৫০০ ভিউ = ৬০৳, ১০০০ লাইক + ৫৫০০ ভিউ = ১০০৳ (হোয়াটসঅ্যাপ অর্ডার)
                    </p>
                  </div>
                </div>

                <div className="hidden xs:flex items-center gap-1 text-xs font-black text-purple-600 shrink-0 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <span>প্যাকেজ দেখুন</span>
                  <span>➔</span>
                </div>
              </div>
            </div>
        
        {/* Active Service Card (Directly Open & Ready to Use) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md shadow-gray-200/60 overflow-hidden mb-6 transition-all">
          
          {/* Card Platform Banner */}
          <div className={`p-5 sm:p-6 text-white ${activeService.gradient} relative overflow-hidden`}>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center">
                  <img src={activeService.icon} alt={activeService.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black tracking-tight">{activeService.name} Tools</h2>
                    <span className="bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/30">
                      সরাসরি সক্রিয়
                    </span>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm font-medium mt-0.5">
                    {activeService.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Actions Area */}
          <div className="p-5 sm:p-6 bg-white">
            
            {/* Link Input Field */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>{activeService.name} ভিডিও / পোস্ট লিঙ্ক:</span>
                <span className="text-[11px] font-normal text-purple-600">পাবলিক লিংক আবশ্যক</span>
              </label>

              <div className="relative flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50 focus-within:bg-white focus-within:border-purple-600 focus-within:ring-4 focus-within:ring-purple-100 transition-all shadow-xs">
                <div className="pl-3.5 text-gray-400">
                  <LinkIcon size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder={activeService.placeholder} 
                  className="w-full py-3.5 px-3 bg-transparent border-none outline-none text-sm sm:text-base font-medium text-gray-800 placeholder:text-gray-400"
                  value={urls[activeService.id] || ''}
                  onChange={(e) => handleUrlChange(activeService.id, e.target.value)}
                />
                
                {urls[activeService.id] ? (
                  <button 
                    onClick={() => handleUrlChange(activeService.id, '')}
                    className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer mr-1"
                    title="মুছে ফেলুন"
                  >
                    ✕
                  </button>
                ) : (
                  <button
                    onClick={() => pasteFromClipboard(activeService.id)}
                    className="mr-2 py-1.5 px-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1 shrink-0"
                    title="ক্লিপবোর্ড থেকে পেস্ট করুন"
                  >
                    <Clipboard size={13} />
                    <span>পেস্ট</span>
                  </button>
                )}
              </div>
            </div>

            {/* Service Action Buttons (2x2 Grid) */}
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                যেকোনো একটি অপশন বেছে নিন (১ ক্লিকে বুস্ট):
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {activeService.actions.map(action => (
                  <button 
                    key={action.id}
                    disabled={isSubmitting || (timers[activeService.id] || 0) > 0}
                    onClick={() => sendRequest(activeService.id, action.id, action.qty)}
                    className={`relative overflow-hidden group border-none p-3.5 rounded-2xl cursor-pointer text-left transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${activeService.gradient} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center">
                        {action.icon}
                      </div>
                      <span className="text-[11px] font-black bg-yellow-400 text-gray-950 px-2 py-0.5 rounded-full shadow-xs">
                        +{action.qty}
                      </span>
                    </div>

                    <div className="mt-1">
                      <div className="font-black text-base tracking-wide flex items-center justify-between">
                        <span>{action.name}</span>
                        <span className="text-[10px] font-bold text-white/70 bg-black/20 px-1.5 py-0.5 rounded-md">
                          {action.badge}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Countdown Timer Display */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${(timers[activeService.id] || 0) > 0 ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}></span>
                <span className="text-xs font-bold text-gray-700">
                  {(timers[activeService.id] || 0) > 0 ? 'পরবর্তী অর্ডারের টাইমার চলছে' : 'সার্ভিস রেডি (Ready to Order)'}
                </span>
              </div>

              <div 
                className="text-base sm:text-lg text-white font-black py-2 px-6 rounded-xl shadow-xs transition-colors"
                style={{ backgroundColor: (timers[activeService.id] || 0) > 0 ? activeService.color : '#059669' }}
              >
                {(timers[activeService.id] || 0) > 0 
                  ? `অপেক্ষা করুন: ${timers[activeService.id]}s` 
                  : 'এখনই ফ্রি বুস্ট নিন (Instant)'}
              </div>

              {(timers[activeService.id] || 0) > 0 && (
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full transition-all duration-1000"
                    style={{ width: `${((180 - (timers[activeService.id] || 0)) / 180) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Quick Platform Switch Suggestion */}
        <div className="bg-purple-50/80 border border-purple-100 rounded-2xl p-3.5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-purple-600 shrink-0" />
            <p className="text-xs text-purple-900 font-semibold">
              {activeTab === 'tiktok' 
                ? 'ইনস্টাগ্রাম বুস্ট করতে উপরের মেনু থেকে "Instagram" নির্বাচন করুন' 
                : 'টিকটক বুস্ট করতে উপরের মেনু থেকে "TikTok" নির্বাচন করুন'}
            </p>
          </div>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab(activeTab === 'tiktok' ? 'instagram' : 'tiktok');
            }}
            className="text-xs font-bold text-purple-700 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-2xs hover:bg-purple-100 transition-all shrink-0 cursor-pointer"
          >
            {activeTab === 'tiktok' ? 'Instagram ➔' : 'TikTok ➔'}
          </button>
        </div>

        {/* Referral System Section (প্রতি রেফারে ৫ টাকা) */}
        <ReferralSection playClickSound={playClickSound} />
        </>
        )}

        {/* Footer */}
        <footer className="text-center py-6 text-gray-400 text-xs font-medium">
          <p>© 2018 freeviral.shop. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="mt-1 text-[11px] text-gray-400">নিরাপদ এবং তাৎক্ষণিক সোশ্যাল মিডিয়া সেবা।</p>
        </footer>

      </main>

      <Analytics />
    </div>
  );
}
