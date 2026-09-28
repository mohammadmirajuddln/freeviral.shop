export interface PremiumPackage {
  id: number;
  name: string;
  nameEn: string;
  likes: string;
  views: string;
  price: number;
  badge?: string;
  badgeColor?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  features: string[];
  gradient: string;
  borderHover: string;
}

export const PREMIUM_PACKAGES: PremiumPackage[] = [
  {
    id: 1,
    name: 'স্টার্টার প্যাক',
    nameEn: 'Starter Pack',
    likes: '500 Like',
    views: '1,500 View',
    price: 60,
    badge: 'শুরু করার জন্য সেরা',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    features: [
      '৫০০ হাই কোয়ালিটি লাইক',
      '১,৫০০ সুপার ভিউ',
      'ইনস্ট্যান্ট শুরু (০-৩০ মিনিট)',
      'পাসওয়ার্ডের প্রয়োজন নেই',
      '১০০% নিরাপদ ও সুরক্ষিত'
    ],
    gradient: 'from-emerald-500 to-teal-600',
    borderHover: 'hover:border-emerald-400'
  },
  {
    id: 2,
    name: 'বেসিক গ্রোথ প্যাক',
    nameEn: 'Basic Growth',
    likes: '1,000 Like',
    views: '5,500 View',
    price: 100,
    badge: 'বেস্ট ভ্যালু 🔥',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    isBestValue: true,
    features: [
      '১,০০০ রিয়েল প্রোফাইল লাইক',
      '৫,৫০০ সুপার ফাস্ট ভিউ',
      'লাইফটাইম নন-ড্রপ গ্যারান্টি',
      'পাসওয়ার্ড ছাড়াই প্রমোট',
      'বিকাশ / নগদ / রকেটে পেমেন্ট'
    ],
    gradient: 'from-amber-500 to-orange-600',
    borderHover: 'hover:border-amber-400'
  },
  {
    id: 3,
    name: 'স্ট্যান্ডার্ড প্যাক',
    nameEn: 'Standard Pack',
    likes: '2,000 Like',
    views: '12,000 View',
    price: 180,
    badge: 'বাজেট ফ্রেন্ডলি',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    features: [
      '২,০০০ অ্যাক্টিভ লাইক',
      '১২,০০০ ইনস্ট্যান্ট ভিউ',
      'অ্যালগরিদম র‍্যাংকিং পুশ',
      'দ্রুত ডেলিভারি শুরু',
      '২৪/৭ কাস্টমার সাপোর্ট'
    ],
    gradient: 'from-blue-500 to-indigo-600',
    borderHover: 'hover:border-blue-400'
  },
  {
    id: 4,
    name: 'পপুলার ভাইরাল প্যাক',
    nameEn: 'Popular Viral',
    likes: '3,500 Like',
    views: '25,000 View',
    price: 300,
    badge: 'সর্বাধিক জনপ্রিয় 🌟',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    isPopular: true,
    features: [
      '৩,৫০০ প্রিমিয়াম লাইক',
      '২৫,০০০ হাই-স্পিড ভিউ',
      'ফর ইউ পেজ (FYP) পুশ সম্ভাবনা',
      'অর্গানিক অডিয়েন্স রিচ',
      '১০০% নিরাপদ ডেলিভারি'
    ],
    gradient: 'from-purple-600 to-pink-600',
    borderHover: 'hover:border-purple-400'
  },
  {
    id: 5,
    name: 'সুপার বুস্টার প্যাক',
    nameEn: 'Super Booster',
    likes: '5,000 Like',
    views: '50,000 View',
    price: 450,
    badge: 'সেরা ডিল 💎',
    badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    features: [
      '৫,০০০ প্রিমিয়াম লাইক',
      '৫০,০০০ হাই কোয়ালিটি ভিউ',
      'সুপার ফাস্ট ডেলিভারি স্পিড',
      'পাবলিক প্রোফাইলের জন্য নিরাপদ',
      'হোয়াটসঅ্যাপে ভিআইপি সাপোর্ট'
    ],
    gradient: 'from-rose-500 to-red-600',
    borderHover: 'hover:border-rose-400'
  },
  {
    id: 6,
    name: 'প্রো ইনফ্লুয়েন্সার প্যাক',
    nameEn: 'Pro Influencer',
    likes: '8,000 Like',
    views: '90,000 View',
    price: 700,
    badge: 'ইনফ্লুয়েন্সার চয়েস 👑',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    features: [
      '৮,০০০ রিয়েল অ্যাক্টিভ লাইক',
      '৯০,০০০ ভাইরাল ভিউ',
      'ভিডিও র‍্যাংকিং পাওয়ারফুল বুস্ট',
      'নো ড্রপ প্রটেকশন',
      'লাইভ ট্র্যাকিং আপডেট'
    ],
    gradient: 'from-indigo-600 to-violet-700',
    borderHover: 'hover:border-indigo-400'
  },
  {
    id: 7,
    name: 'আল্ট্রা মেগা প্যাক',
    nameEn: 'Ultra Mega Pack',
    likes: '12,000 Like',
    views: '150,000 View',
    price: 1000,
    badge: 'মেগা ভ্যালু 🚀',
    badgeColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
    features: [
      '১২,০০০ হাই রিচ লাইক',
      '১,৫০,০০০ আল্ট্রা ফাস্ট ভিউ',
      'প্রোফাইল অথরিটি বৃদ্ধি',
      'সব ভিডিওর জন্য প্রযোজ্য',
      'প্রাইওরিটি কিউ ডেলিভারি'
    ],
    gradient: 'from-cyan-600 to-blue-700',
    borderHover: 'hover:border-cyan-400'
  },
  {
    id: 8,
    name: 'সেলিব্রিটি প্যাক',
    nameEn: 'Celebrity Pack',
    likes: '20,000 Like',
    views: '300,000 View',
    price: 1650,
    badge: 'সেলিব্রিটি চয়েস ✨',
    badgeColor: 'bg-fuchsia-500/10 text-fuchsia-700 border-fuchsia-500/20',
    features: [
      '২০,০০০ প্রিমিয়াম লাইক',
      '৩,০০,০০০ সুপার ভাইরাল ভিউ',
      'ন্যাচারাল স্পিডে বুস্ট',
      'সম্পূর্ণ অ্যাকাউন্ট গ্রোথ সাপোর্ট',
      'ডেডিকেটেড একাউন্ট ম্যানেজার'
    ],
    gradient: 'from-fuchsia-600 to-pink-700',
    borderHover: 'hover:border-fuchsia-400'
  },
  {
    id: 9,
    name: 'কিং ভাইরাল প্যাক',
    nameEn: 'King Viral Pack',
    likes: '35,000 Like',
    views: '600,000 View',
    price: 2750,
    badge: 'কিং ভাইরাল 🏆',
    badgeColor: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    features: [
      '৩৫,০০০ রিয়েল একাউন্ট লাইক',
      '৬,০০,০০০ ট্রেন্ডিং ভিউ',
      'গ্যারান্টেড এক্সপ্লোরেশন রিচ',
      'লাইফটাইম নন-ড্রপ ব্যাকআপ',
      '২৪/৭ প্রায়োরিটি সহায়তা'
    ],
    gradient: 'from-yellow-600 to-amber-700',
    borderHover: 'hover:border-yellow-400'
  },
  {
    id: 10,
    name: 'আলটিমেট ভিআইপি প্যাক',
    nameEn: 'Ultimate VIP Pack',
    likes: '50,000 Like',
    views: '1,000,000 View (১ মিলিয়ন)',
    price: 3900,
    badge: '১ মিলিয়ন ভিউ অফার 👑🔥',
    badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
    features: [
      '৫০,০০০ রিয়েল কোয়ালিটি লাইক',
      '১,০০০,০০০ (১ মিলিয়ন) মেগা ভিউ',
      'ট্রেন্ডিং পেজ ও FYP গ্যারান্টি',
      'ভিআইপি ইনস্ট্যান্ট প্রসেসিং',
      'পার্সোনাল হোয়াটসঅ্যাপ সাপোর্ট'
    ],
    gradient: 'from-rose-600 via-purple-700 to-indigo-800',
    borderHover: 'hover:border-rose-400'
  }
];

export const WHATSAPP_NUMBER = '8801866906599';
export const WHATSAPP_DISPLAY = '01866906599';

export const createWhatsAppOrderLink = (
  pkg: PremiumPackage,
  videoUrl?: string,
  platform: 'TikTok' | 'Instagram' | 'যেকোনো' = 'যেকোনো'
) => {
  const linkText = videoUrl && videoUrl.trim() ? videoUrl.trim() : 'লিংকটি হোয়াটসঅ্যাপে দিচ্ছি';
  
  const message = `আসসালামু আলাইকুম!
আমি freeviral.shop থেকে একটি পেইড প্যাকেজ অর্ডার করতে চাই:

📦 প্যাকেজ: ${pkg.name} (${pkg.nameEn})
❤️ লাইক: ${pkg.likes}
👁️ ভিউ: ${pkg.views}
💰 মূল্য: ${pkg.price} টাকা
📱 প্ল্যাটফর্ম: ${platform}
🔗 ভিডিও লিংক: ${linkText}

দয়া করে পেমেন্টের নম্বর (বিকাশ/নগদ/রকেট) ও পরবর্তী নিয়ম জানিয়ে দিন। ধন্যবাদ!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
