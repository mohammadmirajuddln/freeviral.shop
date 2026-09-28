import React, { useState } from 'react';
import { 
  Heart, Eye, ShieldCheck, Sparkles, Check, 
  MessageCircle, ExternalLink, Zap, Crown, Flame, ArrowRight,
  Clipboard, X, CheckCircle2, ChevronRight
} from 'lucide-react';
import { PREMIUM_PACKAGES, PremiumPackage, createWhatsAppOrderLink, WHATSAPP_DISPLAY } from '../packagesData';

interface Props {
  onBackToFree?: () => void;
  playClickSound: () => void;
  initialVideoUrl?: string;
}

export const PaidPackagesSection: React.FC<Props> = ({ playClickSound, initialVideoUrl = '' }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'budget' | 'mega'>('all');
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [selectedPlatform, setSelectedPlatform] = useState<'TikTok' | 'Instagram' | 'যেকোনো'>('TikTok');
  const [activeModalPackage, setActiveModalPackage] = useState<PremiumPackage | null>(null);

  const filteredPackages = PREMIUM_PACKAGES.filter(pkg => {
    if (selectedFilter === 'popular') return pkg.isPopular || pkg.isBestValue || pkg.price === 450;
    if (selectedFilter === 'budget') return pkg.price <= 300;
    if (selectedFilter === 'mega') return pkg.price >= 450;
    return true;
  });

  const pasteLink = async () => {
    playClickSound();
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setVideoUrl(text.trim());
          return;
        }
      }
      alert("দয়া করে বক্সে পেস্ট করুন।");
    } catch {
      alert("ক্লিপবোর্ড থেকে পেস্ট করা যায়নি। বক্সে লং-প্রেস করে পেস্ট করুন।");
    }
  };

  const handleOrderClick = (pkg: PremiumPackage) => {
    playClickSound();
    setActiveModalPackage(pkg);
  };

  const handleDirectWhatsApp = (pkg: PremiumPackage) => {
    playClickSound();
    const link = createWhatsAppOrderLink(pkg, videoUrl, selectedPlatform);
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6">
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

      {/* Target Video Link Input Bar (Optional convenience) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <Sparkles size={14} className="text-purple-600" />
            <span>আপনার ভিডিও / পোস্ট লিংক (ঐচ্ছিক - আগে দিলে স্বয়ংক্রিয় যুক্ত হবে):</span>
          </label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedPlatform('TikTok')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedPlatform === 'TikTok' 
                  ? 'bg-black text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              TikTok
            </button>
            <button
              onClick={() => setSelectedPlatform('Instagram')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedPlatform === 'Instagram' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Instagram
            </button>
          </div>
        </div>

        <div className="relative flex items-center border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus-within:bg-white focus-within:border-purple-600 focus-within:ring-4 focus-within:ring-purple-100 transition-all">
          <input
            type="text"
            placeholder="https://... টিকটক বা ইনস্টাগ্রাম লিংক পেস্ট করুন"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full py-3 px-3.5 bg-transparent border-none outline-none text-xs sm:text-sm font-medium text-gray-800 placeholder:text-gray-400"
          />
          {videoUrl ? (
            <button
              onClick={() => setVideoUrl('')}
              className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer mr-1"
              title="মুছুন"
            >
              ✕
            </button>
          ) : (
            <button
              onClick={pasteLink}
              className="mr-2 py-1.5 px-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1 shrink-0"
            >
              <Clipboard size={13} />
              <span>পেস্ট</span>
            </button>
          )}
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

            {/* Action Buttons */}
            <div className="p-4 pt-0">
              <div className="flex gap-2">
                <button
                  onClick={() => handleDirectWhatsApp(pkg)}
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-green-500/20 cursor-pointer active:scale-95 transition-all"
                  title="হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4 shrink-0" />
                  <span>অর্ডার করুন (Order Now)</span>
                </button>

                <button
                  onClick={() => handleOrderClick(pkg)}
                  className="px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-bold cursor-pointer transition-all active:scale-95 flex items-center justify-center"
                  title="বিস্তারিত ও লিংক সেট করুন"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
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
          <p>১. যেকোনো প্যাকেজের <strong>&quot;অর্ডার করুন&quot;</strong> বাটনে চাপ দিন।</p>
          <p>২. সরাসরি আমাদের অফিশিয়াল WhatsApp (<strong>{WHATSAPP_DISPLAY}</strong>)-এ চলে যাবেন।</p>
          <p>৩. বিকাশ (bKash), নগদ (Nagad) অথবা রকেটের মাধ্যমে টাকা পরিশোধ করে আপনার ভিডিওর লিংক পাঠান।</p>
          <p>৪. পেমেন্ট নিশ্চিত করার সাথে সাথে সুপার ফাস্ট স্পিডে আপনার লাইক ও ভিউ ডেলিভারি শুরু হবে!</p>
        </div>
      </div>

      {/* Modal for Order Customization */}
      {activeModalPackage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className={`p-5 bg-gradient-to-r ${activeModalPackage.gradient} text-white flex items-center justify-between`}>
              <div>
                <span className="text-xs text-white/80 font-bold block">অর্ডার কনফার্মেশন</span>
                <h3 className="text-xl font-black">{activeModalPackage.name}</h3>
              </div>
              <button
                onClick={() => setActiveModalPackage(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Package Summary */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-bold">প্যাকেজ মূল্য:</span>
                  <span className="text-xl font-black text-gray-900">৳{activeModalPackage.price} টাকা</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 border-t border-gray-200/60 pt-2">
                  <span>লাইক: <strong className="text-rose-600">{activeModalPackage.likes}</strong></span>
                  <span>ভিউ: <strong className="text-cyan-600">{activeModalPackage.views}</strong></span>
                </div>
              </div>

              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">কোন প্ল্যাটফর্মের জন্য?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedPlatform('TikTok')}
                    className={`p-2.5 rounded-xl border text-xs font-black cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                      selectedPlatform === 'TikTok'
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>TikTok</span>
                  </button>
                  <button
                    onClick={() => setSelectedPlatform('Instagram')}
                    className={`p-2.5 rounded-xl border text-xs font-black cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                      selectedPlatform === 'Instagram'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>Instagram</span>
                  </button>
                </div>
              </div>

              {/* Link Input inside Modal */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ভিডিও / পোস্ট লিংক:
                </label>
                <input
                  type="text"
                  placeholder="https://... লিংক পেস্ট করুন"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium focus:border-purple-600 focus:outline-none"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  * লিংক না দিলেও সমস্যা নেই, হোয়াটসঅ্যাপে পাঠাতে পারবেন।
                </p>
              </div>

              {/* Direct WhatsApp Action */}
              <button
                onClick={() => {
                  handleDirectWhatsApp(activeModalPackage);
                  setActiveModalPackage(null);
                }}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 cursor-pointer active:scale-95 transition-all"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                <span>WhatsApp এ অর্ডার নিশ্চিত করুন ➔</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
