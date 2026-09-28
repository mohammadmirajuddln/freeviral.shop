import React, { useState, useEffect } from 'react';
import { 
  Gift, Users, Wallet, Copy, Check, Share2, 
  MessageCircle, Send, Facebook, ArrowUpRight, 
  ShieldCheck, Sparkles, AlertCircle, CheckCircle2, X
} from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../packagesData';

interface Props {
  playClickSound: () => void;
}

export const ReferralSection: React.FC<Props> = ({ playClickSound }) => {
  const [refCode, setRefCode] = useState<string>('');
  const [refCount, setRefCount] = useState<number>(0);
  const [withdrawnAmount, setWithdrawnAmount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawMethod, setWithdrawMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawSuccess, setWithdrawSuccess] = useState<boolean>(false);
  const [withdrawError, setWithdrawError] = useState<string>('');

  // Per referral reward
  const REWARD_PER_REF = 5;

  useEffect(() => {
    // Generate or get existing referral code
    let savedCode = localStorage.getItem('fv_user_ref_code');
    if (!savedCode) {
      savedCode = 'FV' + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('fv_user_ref_code', savedCode);
    }
    setRefCode(savedCode);

    // Load referral counts & withdrawals
    const savedCount = parseInt(localStorage.getItem('fv_user_ref_count') || '0', 10);
    const savedWithdrawn = parseInt(localStorage.getItem('fv_user_ref_withdrawn') || '0', 10);
    setRefCount(savedCount);
    setWithdrawnAmount(savedWithdrawn);

    // Check if visiting from someone else's ref
    const params = new URLSearchParams(window.location.search);
    const incomingRef = params.get('ref');
    if (incomingRef && !localStorage.getItem('fv_joined_ref')) {
      localStorage.setItem('fv_joined_ref', incomingRef);
    }
  }, []);

  const totalEarned = refCount * REWARD_PER_REF;
  const currentBalance = Math.max(0, totalEarned - withdrawnAmount);

  const addTestReferral = () => {
    playClickSound();
    const newCount = refCount + 1;
    setRefCount(newCount);
    localStorage.setItem('fv_user_ref_count', String(newCount));
  };

  const referralLink = `https://freeviral.shop?ref=${refCode}`;

  const copyReferralLink = () => {
    playClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          alert('লিংকটি কপি করুন: ' + referralLink);
        });
    } else {
      alert('লিংকটি কপি করুন: ' + referralLink);
    }
  };

  const shareText = `🔥 freeviral.shop থেকে সম্পূর্ণ ফ্রিতে টিকটক ও ইনস্টাগ্রাম লাইক, ভিউ নিন! এছাড়া বন্ধুদের রেফার করলেই প্রতি রেফারে পাবেন ৫ টাকা ক্যাশ! এখনই জয়েন করুন: ${referralLink}`;

  const shareOnWhatsApp = () => {
    playClickSound();
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    playClickSound();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareOnTelegram = () => {
    playClickSound();
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    playClickSound();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'freeviral.shop রেফার করে আয়',
          text: shareText,
          url: referralLink,
        });
      } catch {
        // User cancelled
      }
    } else {
      copyReferralLink();
    }
  };

  const openWithdrawModal = () => {
    playClickSound();
    setWithdrawError('');
    setWithdrawSuccess(false);
    setWithdrawAmount(currentBalance > 0 ? String(currentBalance) : '50');
    setShowWithdrawModal(true);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setWithdrawError('');

    const amount = parseInt(withdrawAmount, 10);
    if (!phoneNumber || phoneNumber.trim().length < 11) {
      setWithdrawError('সঠিক ১১ ডিজিটের বিকাশ/নগদ/রকেট মোবাইল নম্বর দিন।');
      return;
    }

    if (isNaN(amount) || amount < 50) {
      setWithdrawError('সর্বনিম্ন উত্তোলনের পরিমাণ ৫০ টাকা।');
      return;
    }

    if (amount > currentBalance) {
      setWithdrawError(`আপনার পর্যাপ্ত ব্যালেন্স নেই। বর্তমান ব্যালেন্স: ৳${currentBalance}`);
      return;
    }

    // Process withdrawal via WhatsApp direct message to admin
    const message = `আসসালামু আলাইকুম!
আমি freeviral.shop থেকে রেফার ব্যালেন্স উইথড্র করতে চাই:

🎁 রেফার কোড: ${refCode}
👥 মোট রেফার: ${refCount} জন
💰 উত্তোলনের পরিমাণ: ${amount} টাকা
📱 পেমেন্ট মেথড: ${withdrawMethod}
💳 একাউন্ট নম্বর: ${phoneNumber}

অনুগ্রহ করে পেমেন্ট পাঠিয়ে কনফার্ম করুন। ধন্যবাদ!`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Update local state
    const newWithdrawn = withdrawnAmount + amount;
    setWithdrawnAmount(newWithdrawn);
    localStorage.setItem('fv_user_ref_withdrawn', String(newWithdrawn));

    setWithdrawSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Referral Main Card */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-purple-500/30 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Top Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black">
              <Gift size={14} className="text-emerald-400 animate-bounce" />
              <span>রেফার অ্যান্ড আর্ন প্রোগ্রাম</span>
            </div>
            <div className="bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide">
              প্রতি রেফারে ৳৫
            </div>
          </div>

          {/* Heading */}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            বন্ধুদের রেফার করুন, <span className="bg-gradient-to-r from-emerald-400 via-yellow-300 to-amber-400 text-transparent bg-clip-text">প্রতি রেফারে ৫ টাকা</span> আয় করুন!
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
            আপনার রেফার লিংকে বন্ধু জয়েন করে ফ্রিতে বুস্ট করলেই সাথে সাথে আপনার একাউন্টে যোগ হবে ৫ টাকা। বিকাশ বা নগদে সরাসরি উইথড্র করুন।
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 mt-5">
            {/* Total Referrals */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-300 text-[11px] font-bold mb-1">
                <Users size={13} className="text-cyan-400" />
                <span>মোট রেফার</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-white">
                {refCount} <span className="text-xs font-normal text-gray-300">জন</span>
              </div>
            </div>

            {/* Total Earned */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-300 text-[11px] font-bold mb-1">
                <Sparkles size={13} className="text-yellow-400" />
                <span>মোট আয়</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-yellow-300">
                ৳{totalEarned}
              </div>
            </div>

            {/* Current Balance */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-300 text-[11px] font-bold mb-1">
                <Wallet size={13} className="text-emerald-400" />
                <span>ব্যালেন্স</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-300">
                ৳{currentBalance}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={addTestReferral}
              className="text-[11px] text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 cursor-pointer transition-all flex items-center gap-1 active:scale-95"
              title="রেফারেল টেস্ট করার জন্য ব্যালেন্স যোগ করুন"
            >
              <Sparkles size={12} className="text-yellow-400" />
              <span>+১ রেফারেল টেস্ট (+৳৫)</span>
            </button>

            <button
              onClick={openWithdrawModal}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer active:scale-95"
            >
              <Wallet size={16} />
              <span>টাকা উত্তোলন করুন (Withdraw)</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Referral Link Box */}
          <div className="mt-5 pt-4 border-t border-white/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-300">আপনার ইউনিক রেফার লিংক:</span>
              <span className="text-[11px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-400/30">
                কোড: {refCode}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-2xl p-1.5 pl-3 border border-white/15">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="bg-transparent text-emerald-300 font-mono text-xs w-full outline-hidden select-all truncate"
              />
              <button
                onClick={copyReferralLink}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white py-2 px-3.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-md active:scale-95"
              >
                {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                <span>{copied ? 'কপি হয়েছে!' : 'কপি'}</span>
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center justify-between gap-2 mt-3.5">
              <span className="text-[11px] font-bold text-gray-400">শেয়ার করুন:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={shareOnWhatsApp}
                  className="w-9 h-9 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm"
                  title="WhatsApp-এ শেয়ার করুন"
                >
                  <MessageCircle size={17} />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="w-9 h-9 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm"
                  title="Facebook-এ শেয়ার করুন"
                >
                  <Facebook size={17} />
                </button>
                <button
                  onClick={shareOnTelegram}
                  className="w-9 h-9 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm"
                  title="Telegram-এ শেয়ার করুন"
                >
                  <Send size={17} />
                </button>
                <button
                  onClick={handleNativeShare}
                  className="w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm"
                  title="অন্যান্য অ্যাপে শেয়ার করুন"
                >
                  <Share2 size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => { playClickSound(); setShowWithdrawModal(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-xs">
                <Wallet size={24} />
              </div>
              <h3 className="text-lg font-black text-gray-900">টাকা উত্তোলন (Withdraw)</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                আপনার অর্জিত রেফার বোনাস সরাসরি বিকাশ বা নগদে গ্রহণ করুন
              </p>
            </div>

            {withdrawSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-black text-gray-900 text-base">উইথড্র রিকোয়েস্ট সফল হয়েছে!</h4>
                <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                  আপনার রিকোয়েস্ট WhatsApp-এ পাঠানো হচ্ছে। অ্যাডমিন যাচাই করে আপনার বিকাশ/নগদে টাকা পাঠিয়ে দেবে।
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-md"
                  >
                    ঠিক আছে
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                {/* Available Balance Box */}
                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-600 font-bold">উত্তোলনযোগ্য ব্যালেন্স:</span>
                  <span className="text-base font-black text-emerald-600">৳{currentBalance} টাকা</span>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    পেমেন্ট মেথড বেছে নিন:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['bKash', 'Nagad', 'Rocket'] as const).map(method => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => { playClickSound(); setWithdrawMethod(method); }}
                        className={`py-2 px-3 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                          withdrawMethod === method
                            ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {withdrawMethod} পার্সোনাল নম্বর:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold focus:outline-hidden focus:border-purple-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    টাকার পরিমাণ (সর্বনিম্ন ৫০ ৳):
                  </label>
                  <input
                    type="number"
                    required
                    min="50"
                    placeholder="৫০"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold focus:outline-hidden focus:border-purple-500 focus:bg-white transition-all"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    * সর্বনিম্ন ৫০ টাকা ব্যালেন্স থাকতে হবে
                  </p>
                </div>

                {withdrawError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 cursor-pointer active:scale-95 transition-all"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                  <span>উইথড্র কনফার্ম করুন (WhatsApp)</span>
                </button>

                <p className="text-[11px] text-center text-gray-400">
                  সরাসরি অফিশিয়াল অ্যাডমিন WhatsApp ({WHATSAPP_DISPLAY}) এ রিকোয়েস্ট যাবে।
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
