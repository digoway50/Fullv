export interface FeatureDetail {
  id: 'sherwani' | 'fabric' | 'plate' | 'daman' | 'salwar';
  title: string;
  subtitle: string;
  badgeLabel?: string;
  description: string;
  craftsmanshipNote: string;
  specifications: { label: string; value: string }[];
  hotspot: {
    top: string; // percentage
    left: string; // percentage
    label: string;
  };
}

export interface SandalItem {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  color: string;
  material: string;
  sole: string;
  description: string;
  details: string[];
}

export interface CartItem {
  id: string;
  title: string;
  colorway: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  extras?: string[];
}
