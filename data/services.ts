export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
};

export type ServiceRequest = {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
};

export const services: Service[] = [
  {
    id: '1',
    name: 'Home Cleaning',
    category: 'Cleaning',
    description: 'Professional deep cleaning for your home including all rooms, kitchen, and bathrooms. Our trained cleaners use eco-friendly products.',
    price: '$80 - $150',
    duration: '2-4 hours',
    icon: 'sparkles',
  },
  {
    id: '2',
    name: 'Plumbing Repair',
    category: 'Plumbing',
    description: 'Expert plumbing services for leaks, clogs, pipe repairs, and installations. Licensed and insured plumbers.',
    price: '$60 - $200',
    duration: '1-3 hours',
    icon: 'wrench.fill',
  },
  {
    id: '3',
    name: 'Electrical Work',
    category: 'Electrical',
    description: 'Certified electricians for wiring, outlet installation, lighting fixtures, and electrical troubleshooting.',
    price: '$70 - $250',
    duration: '1-4 hours',
    icon: 'bolt.fill',
  },
  {
    id: '4',
    name: 'Lawn Care',
    category: 'Gardening',
    description: 'Complete lawn maintenance including mowing, edging, trimming, and cleanup. Weekly or one-time service available.',
    price: '$40 - $100',
    duration: '1-2 hours',
    icon: 'leaf.fill',
  },
  {
    id: '5',
    name: 'Painting',
    category: 'Home Improvement',
    description: 'Interior and exterior painting services. Includes surface preparation, priming, and two coats of premium paint.',
    price: '$200 - $800',
    duration: '1-3 days',
    icon: 'paintbrush.fill',
  },
  {
    id: '6',
    name: 'Pest Control',
    category: 'Pest Control',
    description: 'Safe and effective pest elimination for ants, roaches, termites, rodents, and more. Preventive treatments available.',
    price: '$100 - $300',
    duration: '1-2 hours',
    icon: 'ant.fill',
  },
  {
    id: '7',
    name: 'AC Repair',
    category: 'HVAC',
    description: 'Air conditioning repair, maintenance, and installation. Certified HVAC technicians for all brands.',
    price: '$80 - $350',
    duration: '1-3 hours',
    icon: 'snowflake',
  },
  {
    id: '8',
    name: 'Moving Help',
    category: 'Moving',
    description: 'Professional movers for local and long-distance moves. Packing, loading, transport, and unloading services.',
    price: '$150 - $500',
    duration: '3-8 hours',
    icon: 'shippingbox.fill',
  },
];

export const categories = [...new Set(services.map((s) => s.category))];
