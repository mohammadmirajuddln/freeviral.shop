import React, { useState, useRef } from 'react';
import { Copy, Heart, Eye, Share2, Flag, Link as LinkIcon, Sparkles, Rocket, Facebook, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SERVICES = [
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#e1306c',
    gradient: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
    icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png',
    actions: [
      { id: '1', name: 'Like', icon: <Heart size={16} />, qty: '15' },
      { id: '2', name: 'View', icon: <Eye size={16} />, qty: '300' },
      { id: '3', name: 'Share', icon: <Share2 size={16} />, qty: '10' },
      { id: '4', name: 'Report', icon: <Flag size={16} />, qty: '1' },
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#e1306c',
    gradient: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
    actions: [
      { id: '5', name: 'Like', icon: <Heart size={16} />, qty: '15' },
      { id: '6', name: 'View', icon: <Eye size={16} />, qty: '300' },
      { id: '7', name: 'Share', icon: <Share2 size={16} />, qty: '10' },
      { id: '8', name: 'Report', icon: <Flag size={16} />, qty: '1' },
    ]
  },
  {
    id: 'likee',
    name: 'Likee',
    color: '#FF0050',
    gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
    icon: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
    actions: [
      { id: '9', name: 'Like', icon: <Heart size={16} />, qty: '15' },
      { id: '10', name: 'View', icon: <Eye size={16} />, qty: '300' },
      { id: '11', name: 'Share', icon: <Share2 size={16} />, qty: '10' },
      { id: '12', name: 'Report', icon: <Flag size={16} />, qty: '1' },
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

    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
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
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [timers, setTimers] = useState<Record<string, number>>({});
  const intervalsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const togglePanel = (id: string) => {
    playClickSound();
    setOpenPanels(prev => prev[id] ? {} : { [id]: true });
  };

  const handleUrlChange = (id: string, value: string) => {
    setUrls(prev => ({ ...prev, [id]: value }));
  };

  const copyToClipboard = () => {
    playClickSound();
    const link = "https://freeviral.shop";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link)
        .then(() => alert("লিংকটি কপি করা হয়েছে!"))
        .catch(err => console.error('Failed to copy: ', err));
    } else {
      alert("আপনার ব্রাউজার কপি সাপোর্ট করছে না বা সাইটটি HTTPS নয়!");
    }
  };

  const handleNativeShare = async () => {
    playClickSound();
    const shareData = {
      title: 'freeviral.shop',
      text: 'আপনার সোশ্যাল মিডিয়া অ্যাকাউন্ট বুস্ট করুন খুব সহজেই। 100% Free & Secure!',
      url: 'https://freeviral.shop'
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert("আপনার ডিভাইস থেকে সরাসরি শেয়ার সাপোর্ট করছে না। দয়া করে লিংকটি কপি করে শেয়ার করুন।");
    }
  };

  const sendRequest = (serviceId: string, actionId: string, qty: string) => {
    playClickSound();
    const link = urls[serviceId];
    if (!link) {
      alert("লিঙ্ক পেস্ট করুন আগে!");
      return;
    }

    try {
      const apiKey = '49514190f31742df7df997990278043e';
      
      // Create a hidden form to bypass CORS restrictions on GitHub Pages
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://bdlikefollower.com/api/v2';
      form.target = 'hidden_iframe';

      const params: Record<string, string> = {
        key: apiKey,
        action: 'add',
        service: actionId,
        link: link,
        quantity: qty
      };

      for (const key in params) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
      setTimeout(() => {
        document.body.removeChild(form);
      }, 1000);

      alert("অনুরোধ পাঠানো হয়েছে! কিছুক্ষণ অপেক্ষা করুন।");
      
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

    } catch (error) {
      console.error('Error:', error);
      alert("সমস্যা হয়েছে! ইন্টারনেট কানেকশন চেক করুন।");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 font-sans pb-10">
      <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
      {/* Navbar */}
      <div className="bg-white p-5 font-black text-2xl shadow-sm sticky top-0 z-50 relative flex items-center justify-center gap-2">
        <Rocket className="text-purple-600" size={28} />
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">freeviral.shop</span>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"></div>
      </div>

      {/* Hero Section */}
      <div className="bg-white px-4 py-8 mb-6 border-b border-gray-200 text-center shadow-sm">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <span className="text-green-800 font-bold text-sm px-2">100% Free & Secure</span>
        </div>
        <p className="text-gray-500 text-sm mb-2 max-w-xs mx-auto mt-2">
          আপনার সোশ্যাল মিডিয়া অ্যাকাউন্ট বুস্ট করুন খুব সহজেই। কোনো পাসওয়ার্ডের প্রয়োজন নেই!
        </p>
      </div>

      {/* Ad Grid 1 */}
      {/* Services */}
      <div className="px-4">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            className="bg-white my-6 mx-auto w-full max-w-lg rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-8 flex flex-col items-center bg-white">
              <div className="w-20 h-20 rounded-2xl shadow-md p-2 mb-4 bg-white border border-gray-50">
                <img src={service.icon} className="w-full h-full object-contain" alt={service.name} />
              </div>
              <div className="font-black text-2xl" style={{ color: service.color }}>{service.name}</div>
            </div>
            
            <div className="flex justify-center pb-6 bg-white px-6">
              <button 
                onClick={() => togglePanel(service.id)}
                className={`text-white border-none py-4 w-full text-lg font-bold cursor-pointer rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 ${service.gradient}`}
              >
                {openPanels[service.id] ? '▼ Close Tools' : `▶ Open ${service.name} Tools`}
              </button>
            </div>

            {/* Options Area with Animation */}
            <AnimatePresence>
              {openPanels[service.id] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="relative flex items-center border-2 rounded-xl overflow-hidden mb-6 bg-white focus-within:ring-4 focus-within:ring-opacity-20 transition-all" style={{ borderColor: service.color, '--tw-ring-color': service.color } as React.CSSProperties}>
                      <div className="pl-4 text-gray-400">
                        <LinkIcon size={20} />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Paste Link Here" 
                        className="w-full p-4 pl-3 border-none outline-none text-base font-medium text-gray-700"
                        value={urls[service.id] || ''}
                        onChange={(e) => handleUrlChange(service.id, e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {service.actions.map(action => (
                        <button 
                          key={action.id}
                          onClick={() => sendRequest(service.id, action.id, action.qty)}
                          className={`text-white border-none py-3 px-2 rounded-xl cursor-pointer text-sm flex flex-col items-center justify-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${service.gradient}`}
                        >
                          <span className="flex items-center gap-1.5 font-bold text-base">
                            {action.icon} {action.name}
                          </span>
                          <span className="text-[10px] text-white/80 font-bold mt-1 uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">Active</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="text-center mt-6">
                      <span 
                        className="text-sm text-white py-2 px-5 rounded-xl inline-block font-bold transition-colors shadow-sm"
                        style={{ backgroundColor: (timers[service.id] || 0) > 0 ? service.color : '#9ca3af' }}
                      >
                        Countdown: {timers[service.id] || 180}s
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Share Section */}
      <div className="bg-white my-8 mx-auto w-[92%] max-w-lg p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
        <p className="font-bold text-sm text-gray-500 mb-3 uppercase tracking-wider">Share with friends</p>
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-1 pl-4 mb-5">
          <span className="text-purple-600 font-bold text-sm truncate">https://freeviral.shop</span>
          <button 
            onClick={copyToClipboard}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none py-2 px-4 rounded-lg cursor-pointer text-sm font-bold transition-transform active:scale-95 flex items-center gap-2"
          >
            <Copy size={14} /> কপি
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <a 
            href="https://wa.me/?text=আপনার%20সোশ্যাল%20মিডিয়া%20অ্যাকাউন্ট%20বুস্ট%20করুন%20খুব%20সহজেই।%20100%25%20Free%20%26%20Secure!%20https://freeviral.shop" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={playClickSound}
            className="bg-[#25D366] text-white p-3 rounded-full hover:-translate-y-1 transition-transform shadow-md flex items-center justify-center"
            title="Share on WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
          <a 
            href="https://www.facebook.com/sharer/sharer.php?u=https://freeviral.shop" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={playClickSound}
            className="bg-[#1877F2] text-white p-3 rounded-full hover:-translate-y-1 transition-transform shadow-md flex items-center justify-center"
            title="Share on Facebook"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://t.me/share/url?url=https://freeviral.shop&text=আপনার%20সোশ্যাল%20মিডিয়া%20অ্যাকাউন্ট%20বুস্ট%20করুন%20খুব%20সহজেই।%20100%25%20Free%20%26%20Secure!" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={playClickSound}
            className="bg-[#0088cc] text-white p-3 rounded-full hover:-translate-y-1 transition-transform shadow-md flex items-center justify-center"
            title="Share on Telegram"
          >
            <Send size={20} />
          </a>
          <button 
            onClick={handleNativeShare} 
            className="bg-gray-800 text-white p-3 rounded-full hover:-translate-y-1 transition-transform shadow-md flex items-center justify-center"
            title="Share via other apps"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white my-8 mx-auto w-[92%] max-w-lg p-6 rounded-3xl shadow-lg border-t-4 border-green-500 text-center hover:shadow-xl transition-shadow">
        <p className="font-bold mb-4 text-gray-800 leading-relaxed">টিকটক কয়েন দিয়ে ভিডিও প্রমোট করতে যোগাযোগ করুন:</p>
        <a 
          href="https://wa.me/8801866906599" 
          onClick={playClickSound}
          className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white no-underline py-3 px-6 rounded-full text-lg font-bold shadow-md transition-transform hover:-translate-y-1 active:scale-95"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 mr-2" />
          01866906599
        </a>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm font-medium">
        <p>© {new Date().getFullYear()} freeviral.shop. All rights reserved.</p>
        <p className="mt-1 text-xs">Boost your social presence securely.</p>
      </footer>
    </div>
  );
}
