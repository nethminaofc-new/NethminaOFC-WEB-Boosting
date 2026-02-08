import { PlatformId, BoostType, PlatformConfig } from './types';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Video, // Using generic video icon for TikTok to avoid library issues if specific icon missing
} from 'lucide-react';

// Using a custom SVG for TikTok since Lucide might not have it in all versions, 
// but for this structure we use Lucide's Video as a placeholder or specific import if available.
// We will just use 'Video' for TikTok in this demo context or a specific mapping.

export const PLATFORMS: PlatformConfig[] = [
  {
    id: PlatformId.TIKTOK,
    name: 'TikTok',
    icon: Video,
    color: '#000000',
    gradient: 'from-pink-500 to-cyan-500',
    allowedBoosts: [BoostType.FOLLOWERS, BoostType.LIKES, BoostType.VIEWS, BoostType.COMMENTS, BoostType.FAVOURITES],
  },
  {
    id: PlatformId.YOUTUBE,
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    gradient: 'from-red-600 to-red-400',
    allowedBoosts: [BoostType.FOLLOWERS, BoostType.LIKES, BoostType.VIEWS, BoostType.COMMENTS],
  },
  {
    id: PlatformId.INSTAGRAM,
    name: 'Instagram',
    icon: Instagram,
    color: '#E1306C',
    gradient: 'from-purple-500 via-pink-500 to-orange-500',
    allowedBoosts: [BoostType.FOLLOWERS, BoostType.LIKES, BoostType.VIEWS, BoostType.COMMENTS],
  },
  {
    id: PlatformId.FACEBOOK,
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    gradient: 'from-blue-600 to-blue-400',
    allowedBoosts: [BoostType.FOLLOWERS, BoostType.LIKES, BoostType.VIEWS, BoostType.COMMENTS],
  },
];

export const QUANTITY_OPTIONS = {
  [BoostType.LIKES]: ['1k', '2k', '3k', '4k', '5k', '10k', '50k', '100k'],
  [BoostType.VIEWS]: ['1k', '2k', '3k', '4k', '5k', '10k', '50k', '100k', '500k', '1M'],
  [BoostType.COMMENTS]: ['10', '20', '50', '100', '300', '500', '1k'],
  [BoostType.FOLLOWERS]: ['100', '500', '1k', '2k', '5k', '10k'], // Generic fallback
  [BoostType.FAVOURITES]: ['100', '200', '500', '600', '1k', '2k'],
};

// Simple price multiplier mock
const PRICE_BASE = {
  [BoostType.LIKES]: 5,     // $5 per 1k
  [BoostType.VIEWS]: 2,     // $2 per 1k
  [BoostType.COMMENTS]: 15, // $15 per 100
  [BoostType.FOLLOWERS]: 10,// $10 per 1k
  [BoostType.FAVOURITES]: 4,// $4 per 100
};

export const calculatePrice = (type: BoostType | null, qtyString: string | null): number => {
  if (!type || !qtyString) return 0;
  
  let qty = 0;
  if (qtyString.includes('M')) qty = parseFloat(qtyString) * 1000000;
  else if (qtyString.includes('k')) qty = parseFloat(qtyString) * 1000;
  else qty = parseInt(qtyString);

  const base = PRICE_BASE[type];
  
  // Normalize based on unit
  if (type === BoostType.COMMENTS || type === BoostType.FAVOURITES) {
      // Base price is per 100
      return (qty / 100) * base;
  } else {
      // Base price is per 1000
      return (qty / 1000) * base;
  }
};
