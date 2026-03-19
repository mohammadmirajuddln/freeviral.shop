import React, { useState, useRef } from 'react';
import { Copy, Heart, Eye, Share2, Flag } from 'lucide-react';

const SERVICES = [
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#22c55e',
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
    color: '#22c55e',
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
    color: '#22c55e',
    icon: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
    actions: [
      { id: '9', name: 'Like', icon: <Heart size={16} />, qty: '15' },
      { id: '10', name: 'View', icon: <Eye size={16} />, qty: '300' },
      { id: '11', name: 'Share', icon: <Share2 size={16} />, qty: '10' },
      { id: '12', name: 'Report', icon: <Flag size={16} />, qty: '1' },
    ]
  }
];

export default function App() {
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [timers, setTimers] = useState<Record<string, number>>({});
  const intervalsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const togglePanel = (id: string) => {
    setOpenPanels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUrlChange = (id: string, value: string) => {
    setUrls(prev => ({ ...prev, [id]: value }));
  };

  const copyToClipboard = () => {
    const link = "https://nreer.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link)
        .then(() => alert("লিংকটি কপি করা হয়েছে!"))
        .catch(err => console.error('Failed to copy: ', err));
    } else {
      alert("আপনার ব্রাউজার কপি সাপোর্ট করছে না বা সাইটটি HTTPS নয়!");
    }
  };

  const sendRequest = async (serviceId: string, actionId: string, qty: string) => {
    const link = urls[serviceId];
    if (!link) {
      alert("লিঙ্ক পেস্ট করুন আগে!");
      return;
    }

    try {
      // API call to our secure backend proxy instead of directly to snechfollows
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: actionId, link, quantity: qty })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
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
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      {/* Navbar */}
      <div className="bg-white p-5 border-b-4 border-green-500 font-bold text-2xl text-center shadow-sm sticky top-0 z-50">
        🏠 NREER.COM
      </div>

      {/* Share Section */}
      <div className="bg-green-50 p-4 mb-3 border-b border-green-100 text-center">
        <p className="font-bold text-sm mb-2">আপনার বন্ধুদেরকে লিংকটি শেয়ার করুন:</p>
        <a href="https://nreer.com" className="text-green-600 font-bold block mb-3 break-all">https://nreer.com</a>
        <button 
          onClick={copyToClipboard}
          className="bg-green-500 hover:bg-green-600 text-white border-none py-2 px-4 rounded-lg cursor-pointer text-sm font-bold transition-transform active:scale-95 flex items-center justify-center mx-auto gap-2"
        >
          <Copy size={16} /> লিংক কপি করুন
        </button>

        <div className="flex justify-center gap-5 my-4">
          {SERVICES.map(s => (
            <div key={s.id} className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md bg-white p-1 overflow-hidden">
              <img src={s.icon} alt={s.name} className="w-full h-full object-cover rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Ad Grid 1 */}
      <div className="grid grid-cols-2 gap-3 p-3 max-w-lg mx-auto">
        <div className="bg-white border border-dashed border-gray-300 p-4 rounded-xl text-gray-400 text-xs font-bold text-center">AD 1</div>
        <div className="bg-white border border-dashed border-gray-300 p-4 rounded-xl text-gray-400 text-xs font-bold text-center">AD 2</div>
      </div>

      {/* Services */}
      {SERVICES.map((service) => (
        <div key={service.id} className="bg-white my-4 mx-auto w-[92%] max-w-lg rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-8 flex flex-col items-center bg-white">
            <img src={service.icon} width="80" alt={service.name} />
            <div className="font-black text-2xl mt-3" style={{ color: service.color }}>{service.name}</div>
          </div>
          
          <div className="flex justify-center pb-6 bg-white">
            <button 
              onClick={() => togglePanel(service.id)}
              className="text-white border-none py-4 w-[85%] text-lg font-bold cursor-pointer rounded-2xl transition-all shadow-md active:scale-95"
              style={{ backgroundColor: service.color }}
            >
              ▶ Open {service.name} Tools
            </button>
          </div>

          {/* Options Area */}
          {openPanels[service.id] && (
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="border-2 rounded-xl overflow-hidden mb-5 bg-white" style={{ borderColor: service.color }}>
                <input 
                  type="text" 
                  placeholder="Paste Link Here" 
                  className="w-full p-4 border-none outline-none text-base text-center"
                  value={urls[service.id] || ''}
                  onChange={(e) => handleUrlChange(service.id, e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {service.actions.map(action => (
                  <button 
                    key={action.id}
                    onClick={() => sendRequest(service.id, action.id, action.qty)}
                    className="bg-green-500 hover:bg-green-600 text-white border-none py-3 px-2 rounded-xl cursor-pointer text-sm flex flex-col items-center justify-center transition-colors"
                  >
                    <span className="flex items-center gap-1 font-bold">
                      {action.icon} {action.name}
                    </span>
                    <small className="text-[10px] text-green-100 font-bold mt-1 block">Active</small>
                  </button>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <span 
                  className="text-sm text-white py-1.5 px-4 rounded-lg inline-block font-bold transition-colors"
                  style={{ backgroundColor: (timers[service.id] || 0) > 0 ? '#22c55e' : '#888' }}
                >
                  Countdown: {timers[service.id] || 180}s
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Contact Section */}
      <div className="bg-white my-5 mx-auto w-[92%] max-w-lg p-6 rounded-3xl shadow-lg border-t-4 border-green-500 text-center">
        <p className="font-bold mb-4 text-gray-800 leading-relaxed">টিকটক কয়েন দিয়ে ভিডিও প্রমোট করতে যোগাযোগ করুন:</p>
        <a 
          href="https://wa.me/8801866906599" 
          className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white no-underline py-3 px-6 rounded-full text-lg font-bold shadow-md transition-transform active:scale-95"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 mr-2" />
          01866906599
        </a>
      </div>
    </div>
  );
}
