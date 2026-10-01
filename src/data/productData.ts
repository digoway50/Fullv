import { FeatureDetail, SandalItem } from '../types';

export const FEATURES_DATA: FeatureDetail[] = [
  {
    id: 'sherwani',
    title: 'Sherwani',
    subtitle: 'Style',
    description: 'Sherwani: High-collar refinement. Modern fit options for contemporary men.',
    craftsmanshipNote: 'Structured 1.2-inch Mandarin bandhgala collar reinforced with lightweight Japanese horsehair canvas, preventing collar collapse while maintaining all-day throat comfort.',
    specifications: [
      { label: 'Collar Height', value: '1.25 inches (Standard Ban)' },
      { label: 'Closure', value: 'Concealed loop & horn buttons' },
      { label: 'Stitch Gauge', value: '18 stitches per inch' },
    ],
    hotspot: {
      top: '25%',
      left: '48.5%',
      label: 'Sherwani Collar & Ban',
    },
  },
  {
    id: 'fabric',
    title: 'Kurte Bund Kurte',
    subtitle: 'Fabric',
    badgeLabel: 'bund kufe',
    description: 'Kurte Bund Kurte: A unique blend of fine linen and cotton, for a soft, breathable touch.',
    craftsmanshipNote: 'Hand-selected long-staple Giza cotton spun with Normandy linen (65% cotton / 35% flax), woven at 140 GSM with a gentle enzyme stone wash for silky handfeel and natural wrinkle resistance.',
    specifications: [
      { label: 'Composition', value: '65% Egyptian Cotton, 35% Belgian Linen' },
      { label: 'Weight', value: '140 GSM (Featherweight Summer Weave)' },
      { label: 'Breathability', value: 'Hydrophilic moisture-wicking' },
    ],
    hotspot: {
      top: '43%',
      left: '39%',
      label: 'Kurte Bund Fabric & Cuffs',
    },
  },
  {
    id: 'plate',
    title: 'Plate',
    subtitle: 'Fit & Detail',
    description: 'Plate: A distinctive central pleat that ensures a tailored look with superior comfort.',
    craftsmanshipNote: 'Micro-stitched central placket (patti) engineered with twin side-box pleats that provide chest expansion during movement while retaining a razor-sharp vertical silhouette.',
    specifications: [
      { label: 'Placket Width', value: '1.1 inches (Modern Slim)' },
      { label: 'Buttonholes', value: 'Hand-sewn milanese cordonnet' },
      { label: 'Pleat Depth', value: '4mm recessed expansion fold' },
    ],
    hotspot: {
      top: '34.5%',
      left: '50.5%',
      label: 'Plate Pleat & Placket',
    },
  },
  {
    id: 'daman',
    title: 'Daman Colal',
    subtitle: 'Finish',
    badgeLabel: 'daman colal',
    description: 'Daman Colal: The finely finished hemline, adding a clean, distinct end to the Kurta.',
    craftsmanshipNote: 'Double-blind turned edge hemline with triangular bar-tacked side chaak reinforcements, calibrated to fall precisely 2 inches above the knee cap for traditional grace.',
    specifications: [
      { label: 'Hem Cut', value: 'Clean straight cut with soft rounded corners' },
      { label: 'Side Slit (Chaak)', value: '14-inch mobility vents' },
      { label: 'Bottom Fold', value: '1.5-inch weighted inner tape' },
    ],
    hotspot: {
      top: '70%',
      left: '52%',
      label: 'Daman Colal Hemline',
    },
  },
  {
    id: 'salwar',
    title: 'Salwar Ghar',
    subtitle: 'Style',
    badgeLabel: 'salwar ghar',
    description: 'Salwar Ghar: Complementing the look with a perfectly loose-fitting salwar for authentic comfort.',
    craftsmanshipNote: 'Generous 48-inch ghera circumference tapering gracefully into 8.5-inch reinforced paincha cuffs. Cut with bias grain drape to allow effortless lounging and walking.',
    specifications: [
      { label: 'Ghera Volume', value: '48 inches traditional perimeter' },
      { label: 'Waistband', value: 'Dual-drawstring (Azarband) casing' },
      { label: 'Ankle Paincha', value: 'Fused multi-row stitched cuffs (8.5")' },
    ],
    hotspot: {
      top: '80%',
      left: '42%',
      label: 'Salwar Ghar Pleat & Drape',
    },
  },
];

export const SANDALS_DATA: SandalItem[] = [
  {
    id: 'sandal-1',
    name: 'Peshawari Chappal - Classic Dark Tan',
    type: 'Traditional Leather Footwear',
    image: '/src/assets/images/sandal_left_1790884658576.jpg',
    price: 68,
    color: 'Rich Walnut Tan',
    material: '100% Full-Grain Vegetable Tanned Calfskin',
    sole: 'Recycled Aircraft Tyre Rubber Tread (Non-slip & resilient)',
    description: 'Hand-sewn by master mochis in Peshawar. Features a classic semicircular toe strap and adjustable brass buckled ankle support for regal traditional stride.',
    details: [
      'Hand-molded leather arch support',
      'Double contrast welt stitching',
      'Weather-sealed edges and moisture-absorbing goat leather insole',
    ],
  },
  {
    id: 'sandal-2',
    name: 'Kaptaan Chappal - Cognac Norozi',
    type: 'Bespoke Aristocrat Slide',
    image: '/src/assets/images/sandal_right_1790884674124.jpg',
    price: 74,
    color: 'Burnished Cognac Brown',
    material: 'Aniline Dyed Pull-up Cowhide Leather',
    sole: 'Dual-density leather midsole with rubber traction pods',
    description: 'A distinguished high-instep crossover silhouette engineered for ceremonial wear. Hand-burnished edges create deep patina that matures beautifully over time.',
    details: [
      'Cross-strap ergonomic instep lockdown',
      'Cushioned memory-foam insole lining',
      'Antique gold-finish buckle hardware',
    ],
  },
];

export const GLOSSARY_TERMS = [
  {
    term: 'Sherwani Collar / Ban (بین)',
    pronunciation: 'bān / sher-wā-nī',
    meaning: 'The dignified stand-up mandarin collar with a slight front gap, favored by royal courts of Delhi and Awadh.',
  },
  {
    term: 'Kurte Bund Kurte (کُرتہ بند)',
    pronunciation: 'koor-tah bund',
    meaning: 'A bespoke tailoring technique using high-density tightly spun warp-and-weft linen-cotton blend that holds structural shape without stiffness.',
  },
  {
    term: 'Plate / Patti (پٹی)',
    pronunciation: 'plēt / pat-tī',
    meaning: 'The reinforced front button placket. The central pleat stabilizes the button line and offers ease during prayer or movement.',
  },
  {
    term: 'Daman Colal (دامن)',
    pronunciation: 'dā-man ko-lāl',
    meaning: 'The bottom perimeter hemline of the long tunic. Fleex garments feature a weighted blind-stitch daman that prevents rolling.',
  },
  {
    term: 'Salwar Ghar (شلوار گھر)',
    pronunciation: 'shal-wār ghar',
    meaning: 'The roomy traditional gathers ("ghar") that generate the sweeping drape of authentic South Asian trousers.',
  },
  {
    term: 'Peshawari Chappal (پشاوری چپل)',
    pronunciation: 'pesh-ā-war-ī chap-pal',
    meaning: 'Iconic open-toed leather sandal with rounded front vamp and cross ankle sling, the quintessential footwear for Kurta-Shalwar.',
  },
];
