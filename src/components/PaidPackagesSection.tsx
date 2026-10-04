import React, { useState } from 'react';
import { 
  Heart, Eye, ShieldCheck, Zap, Crown, Flame, 
  MessageCircle, CheckCircle2 
} from 'lucide-react';
import { PREMIUM_PACKAGES, PremiumPackage, createWhatsAppOrderLink, WHATSAPP_DISPLAY } from '../packagesData';

interface Props {
  onBackToFree?: () => void;
  playClickSound: () => void;
  initialVideoUrl?: string;
}

export const PaidPackagesSection: React.FC<Props> = ({ playClickSound }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'budget' | 'mega'>('all');

  const filteredPackages = PREMIUM_PACKAGES.filter(pkg => {
    if (selectedFilter === 'popular') return pkg.isPopular || pkg.isBestValue || pkg.price === 450;
    if (selectedFilter === 'budget') return pkg.price <= 300;
    if (selectedFilter === 'mega') return pkg.price >= 450;
    return true;
  });

  const handleDirectWhatsApp = (e: React.MouseEvent, pkg: PremiumPackage) => {
    e.stopPropagation();
    playClickSound();
    const link = createWhatsAppOrderLink(pkg);
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 p-6 sm:p-7 text-white shadow-xl border border-purple-500/20">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-3">
            <Flame size={14} className="text-amber-400 animate-pulse" />
            <span>১০টি এক্সক্লুসিভ পেইড সার্ভিস প্যাকেজ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            টাকা দিয়ে কিনুন <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 text-transparent bg-clip-text">রিয়েল লাইক ও ভিউ</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-lg">
            মাত্র ৳৬০ থেকে শুরু! যেকোনো প্যাকেজ নির্বাচন করে সরাসরি আমাদের WhatsApp-এ অর্ডার কনফার্ম করুন। কোনো পাসওয়ার্ড প্রয়োজন নেই।
          </p>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10 text-[11px] text-gray-200">
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/10">
              <Zap size={14} className="text-amber-400 shrink-0" />
              <span>ইনস্ট্যান্ট প্রসেসিং</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>১০০% নন-ড্রপ ও সেফ</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/10">
              <Crown size={14} className="text-pink-400 shrink-0" />
              <span>হাই-কোয়ালিটি প্রোফাইল</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/10">
              <MessageCircle size={14} className="text-emerald-400 shrink-0" />
              <span>হোয়াটসঅ্যাপে ২৪/৭ সাপোর্ট</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => { playClickSound(); setSelectedFilter('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
            selectedFilter === 'all'
              ? 'bg-gray-900 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          সব প্যাকেজ (১০টি)
        </button>
        <button
          onClick={() => { playClickSound(); setSelectedFilter('popular'); }}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
            selectedFilter === 'popular'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          🔥 সর্বাধিক বিক্রিত
        </button>
        <button
          onClick={() => { playClickSound(); setSelectedFilter('budget'); }}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
            selectedFilter === 'budget'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          💰 বাজেট ফ্রেন্ডলি (৳৬০ - ৳৩০০)
        </button>
        <button
          onClick={() => { playClickSound(); setSelectedFilter('mega'); }}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
            selectedFilter === 'mega'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          🚀 মেগা ভাইরাল (৳৪৫০+)
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${pkg.borderHover}`}
          >
            {/* Header */}
            <div>
              <div className={`p-4 bg-gradient-to-r ${pkg.gradient} text-white relative`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider block">
                      প্যাকেজ #{pkg.id}
                    </span>
                    <h3 className="text-lg font-black tracking-tight">{pkg.name}</h3>
                  </div>
                  {pkg.badge && (
                    <span className="bg-white/20 backdrop-blur-xs text-white border border-white/30 text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap">
                      {pkg.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Highlight Stats */}
              <div className="p-4 border-b border-gray-100 bg-slate-50/50">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900 tracking-tight">৳{pkg.price}</span>
                    <span className="text-xs font-bold text-gray-500">টাকা</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                    তাৎক্ষণিক শুরু
                  </span>
                </div>

                {/* Like + View Tag Chips */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-rose-50 border border-rose-100/80 text-rose-700">
                    <Heart size={16} className="text-rose-500 fill-rose-500/20 shrink-0" />
                    <div>
                      <span className="text-[10px] text-rose-600/80 font-bold block leading-none">লাইক</span>
                      <span className="text-xs font-black">{pkg.likes}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-cyan-50 border border-cyan-100/80 text-cyan-800">
                    <Eye size={16} className="text-cyan-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-cyan-600/80 font-bold block leading-none">ভিউ</span>
                      <span className="text-xs font-black">{pkg.views}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="p-4 space-y-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">প্যাকেজের সুবিধাসমূহ:</p>
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button - 1 click direct to WhatsApp */}
            <div className="p-4 pt-0">
              <button
                onClick={(e) => handleDirectWhatsApp(e, pkg)}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-green-500/20 cursor-pointer active:scale-95 transition-all"
                title="হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 shrink-0" />
                <span>অর্ডার করুন (Order Now)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Information Box */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-5 border border-emerald-100">
        <h4 className="font-black text-gray-900 text-sm flex items-center gap-2 mb-2">
          <span>💳 পেমেন্ট পদ্ধতি ও অর্ডার নিয়ম:</span>
        </h4>
        <div className="text-xs text-gray-700 space-y-1.5 leading-relaxed">
          <p>১. যেকোনো প্যাকেজের <strong>&quot;অর্ডার করুন (Order Now)&quot;</strong> বাটনে চাপ দিন।</p>
          <p>২. সরাসরি আমাদের অফিশিয়াল WhatsApp (<strong>{WHATSAPP_DISPLAY}</strong>)-এ অর্ডার ডিটেইলসহ মেসেজ চলে যাবে।</p>
          <p>৩. বিকাশ (bKash), নগদ (Nagad) অথবা রকেটের মাধ্যমে টাকা পরিশোধ করে আপনার ভিডিওর লিংক হোয়াটসঅ্যাপে পাঠিয়ে দিন।</p>
          <p>৪. পেমেন্ট নিশ্চিত করার সাথে সাথে সুপার ফাস্ট স্পিডে আপনার লাইক ও ভিউ ডেলিভারি শুরু হবে!</p>
        </div>
      </div>
    </div>
  );
};
