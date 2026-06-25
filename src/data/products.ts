/* ============================================================
   DOYEN Group of Companies — Product Catalog Data
   src/data/products.ts
   ============================================================ */

export interface Product {
  name: string;
  type?: string;
  size?: string;
  brand: string;
  warranty: string;
  image: string;
  images: string[];
  desc?: string;
  features?: string[];
  keyFeatures?: string[]; // Used specifically for LPG product features
  specs?: Record<string, string>;
  specsTable?: {
    rows: string[][];
  };
}

export interface Brand {
  id: string;
  name: string;
  desc: string;
  image: string;
}

export interface CategoryData {
  name: string;
  hasBrands: boolean;
  brandProducts?: Record<string, Product[]>;
  products?: Product[];
}

export const brandData: Record<string, Brand[]> = {
  tires: [
    { id: 'compasal',  name: 'Compasal',  desc: 'SUV, performance, and all-terrain tire solutions', image: '/assets/images/Compasal Cover.webp' },
    { id: 'massimo',   name: 'Massimo',   desc: 'Sedan, sport, and mud terrain tires',              image: '/assets/images/Massimo Cover.webp' },
    { id: 'chengshan', name: 'Chengshan', desc: 'Hatchback, sedan, SUV, and crossover tires',       image: '/assets/images/Cover.webp' }
  ],
  battery: [
    { id: 'enerco', name: 'Enerco', desc: 'Reliable AGM and EFB batteries for passenger cars, motorcycles, and commercial vehicles', image: '/assets/images/ENERCO2.webp' }
  ]
};

export const TIRE_GROUPS = [
  { label: 'PRODUCT', span: 1 }, { label: 'PR', span: 1 }, { label: 'LI', span: 1 }, { label: 'SS', span: 1 },
  { label: 'MEASURE RIM', span: 1 }, { label: 'TYPE', span: 1 }, { label: 'MAX LOAD (KG)', span: 2 },
  { label: 'MAX LOAD (LBS)', span: 2 }, { label: 'MAX INFLATION (KPA)', span: 2 }, { label: 'MAX INFLATION (PSI)', span: 2 },
  { label: 'DIMENSION', span: 2 }, { label: 'TREAD DEPTH', span: 2 }, { label: 'VEHICLE', span: 1 }
];

export const TIRE_SUB = [
  'Size','PR','LI','SS','Rim','Type','Single','Dual','Single','Dual','Single','Dual','Single','Dual','Section Width','O.D.','MM','32NDS','Vehicle'
];

export const productData: Record<string, CategoryData> = {
  tires: {
    name: 'Tires',
    hasBrands: true,
    brandProducts: {
      compasal: [
        {
          name: 'BLAZER HP',
          type: 'Highway Terrain',
          size: '175/65R14 82H | 185/65R14 86H | 185/70R14 88H | 195/70R14 91H | 195/65R15 91H | 215/70R15 98H',
          brand: 'Compasal',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/BLAZER HP 185-70R14H_A.webp',
          images: ['/assets/images/BLAZER HP 185-70R14H_A.webp', '/assets/images/BLAZER HP 185-70R14H_B.webp'],
          desc: 'Designed for drivers who want a smooth, quiet, and safe experience on every trip. It balances high-end comfort with the control you need to handle any road condition with ease. Perfect refined driving experience with a tire built for premium comfort and dependable grip.',
          features: [
            'Comfortable Silent Performance — Adopt 5 frequency pattern block, virtual analysis and optimized permutation design, effectively reduce the pattern block noise resonance phenomenon, reduce product noise, improve driving comfort.',
            'Excellent Wetland Performance — Optimization of longitudinal/transverse groove design and the use of the best groove curve, improve the drainage performance of tires in wetlands and greatly improve the safety performance of tires.',
            'Extraordinary Handling Performance — The internal and external asymmetrical shoulder design is adopted to ensure wet performance while improving tire handling performance, bringing driving pleasure.',
            'Excellent Wear Resistance — The optimum sea-land ratio and optimized steel sheet design can prevent the stress concentration when the tire is running, so that all points of the tire are uniformly worn, and the wear performance is improved.'
          ],
          specs: { 'Available Sizes': '175/65R14 82H | 185/65R14 86H | 185/70R14 88H | 195/70R14 91H | 195/65R15 91H | 215/70R15 98H' }
        },
        {
          name: 'BLAZER UHP II',
          type: 'Ultra High Performance',
          size: '225/45ZR17 94W XL',
          brand: 'Compasal',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/BLAZER UHP II 22545ZR 17 94W XL_A.webp',
          images: ['/assets/images/BLAZER UHP II 22545ZR 17 94W XL_A.webp', '/assets/images/BLAZER UHP II 22545ZR 17 94W XL_B.webp'],
          desc: 'Designed for drivers who want a smooth, quiet, and safe experience on every trip. It balances high-end comfort with the control you need to handle any road condition with ease. Perfect refined driving experience with a tire built for premium comfort and dependable grip.',
          features: [
            'Comfortable Silent Performance — Adopt 5 frequency pattern block, virtual analysis and optimized permutation design, effectively reduce the pattern block noise resonance phenomenon, reduce product noise, improve driving comfort.',
            'Excellent Wetland Performance — Optimization of longitudinal/transverse groove design and the use of the best groove curve, improve the drainage performance of tires in wetlands and greatly improve the safety performance of tires.',
            'Extraordinary Handling Performance — The internal and external asymmetrical shoulder design is adopted to ensure wet performance while improving tire handling performance, bringing driving pleasure.',
            'Excellent Wear Resistance — The optimum sea-land ratio and optimized steel sheet design can prevent the stress concentration when the tire is running, so that all points of the tire are uniformly worn, and the wear performance is improved.'
          ],
          specs: { 'Available Sizes': '225/45ZR17 94W XL' }
        },
        {
          name: 'COMMAX II',
          type: 'All-Terrain',
          size: '235/75R15 105S',
          brand: 'Compasal',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/COMMAX II P23575R15 105S_A.webp',
          images: ['/assets/images/COMMAX II P23575R15 105S_A.webp', '/assets/images/COMMAX II P23575R15 105S_B.webp'],
          desc: 'Designed for drivers who want a smooth, quiet, and safe experience on every trip. It balances high-end comfort with the control you need to handle any road condition with ease. Perfect refined driving experience with a tire built for premium comfort and dependable grip.',
          features: [
            'Comfortable Silent Performance — Adopt 5 frequency pattern block, virtual analysis and optimized permutation design, effectively reduce the pattern block noise resonance phenomenon, reduce product noise, improve driving comfort.',
            'Excellent Wetland Performance — Optimization of longitudinal/transverse groove design and the use of the best groove curve, improve the drainage performance of tires in wetlands and greatly improve the safety performance of tires.',
            'Extraordinary Handling Performance — The internal and external asymmetrical shoulder design is adopted to ensure wet performance while improving tire handling performance, bringing driving pleasure.',
            'Excellent Wear Resistance — The optimum sea-land ratio and optimized steel sheet design can prevent the stress concentration when the tire is running, so that all points of the tire are uniformly worn, and the wear performance is improved.'
          ],
          specs: { 'Available Sizes': '235/75R15 105S' }
        },
        {
          name: 'SMACHER',
          type: 'Performance Touring',
          size: '225/55ZR17 101W XL',
          brand: 'Compasal',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/SMACHER 22555ZR17 101W XL_A.webp',
          images: ['/assets/images/SMACHER 22555ZR17 101W XL_A.webp', '/assets/images/SMACHER 22555ZR17 101W XL_B.webp'],
          desc: 'Designed for drivers who want a smooth, quiet, and safe experience on every trip. It balances high-end comfort with the control you need to handle any road condition with ease. Perfect refined driving experience with a tire built for premium comfort and dependable grip.',
          features: [
            'Comfortable Silent Performance — Adopt 5 frequency pattern block, virtual analysis and optimized permutation design, effectively reduce the pattern block noise resonance phenomenon, reduce product noise, improve driving comfort.',
            'Excellent Wetland Performance — Optimization of longitudinal/transverse groove design and the use of the best groove curve, improve the drainage performance of tires in wetlands and greatly improve the safety performance of tires.',
            'Extraordinary Handling Performance — The internal and external asymmetrical shoulder design is adopted to ensure wet performance while improving tire handling performance, bringing driving pleasure.',
            'Excellent Wear Resistance — The optimum sea-land ratio and optimized steel sheet design can prevent the stress concentration when the tire is running, so that all points of the tire are uniformly worn, and the wear performance is improved.'
          ],
          specs: { 'Available Sizes': '225/55ZR17 101W XL' }
        }
      ],
      massimo: [
        {
          name: 'ROCCIA A1',
          type: 'All-Terrain',
          size: '245/70R16',
          brand: 'Massimo',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/ROCCIA AT 24570R16_A.webp',
          images: ['/assets/images/ROCCIA AT 24570R16_A.webp', '/assets/images/ROCCIA AT 24570R16_B.webp'],
          desc: 'This tire is built to keep you safe and comfortable, offering a stable ride whether the roads are bone-dry or soaking wet. It focuses on reliable grip and quiet cabin, making it an excellent choice for everyday driving.',
          features: [
            'A cutting-edge tread pattern enhances the ability to release stones that get trapped.',
            'Due to improved block rigidity within the tread pattern, the tyre\'s durability, handling and weight-carrying ability is increased.',
            'The central rib showcases a staggered, link design that enhances the tyre\'s stability, optimising safety, and straight-line driving.',
            'The configuration of the outside block and shoulder provide increased traction, firmly holding onto wet and dry terrain and boosting performance.'
          ],
          specs: {
            'Available Sizes': '245/70R16',
            'Rim Size': '16"',
            'LI (Load Index)': '107',
            'SR (Speed Rating)': 'T',
            'UTQC': '480AB',
            'RR (Rolling Resistance)': 'D',
            'Wet Grip': 'D'
          }
        },
        {
          name: 'STELLA S1',
          type: 'Mud Terrain',
          size: '245/70R16 | 265/65R17',
          brand: 'Massimo',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/STELLA S1_A.webp',
          images: ['/assets/images/STELLA S1_A.webp', '/assets/images/STELLA S1_B.webp'],
          desc: 'Built to keep you safe and comfortable, offering a stable ride whether the roads are bone-dry or soaking wet. It focuses on reliable grip and a quiet cabin, making it an excellent choice for everyday driving.',
          features: [
            'Outstanding performance and safety on wet roads thanks to the four wide channels in the tread that aid drainage.',
            'Expert handling with low noise thanks to the compact nature of the shoulder design.',
            'The intricate pattern of grooves across the tread makes the tyre grip the road competently and perform excellently in the wet.',
            'Adding sipes to the central rib of the pattern, produces rigidity that aides handling on wet or dry roads whilst aiding the balance of the tyre at high-speed.'
          ],
          specs: {
            'Available Sizes': '245/70R16 | 265/65R17',
            'Rim Size (245/70R16)': '16"',
            'LI (245/70R16)': '107',
            'SR (245/70R16)': 'T',
            'UTQC (245/70R16)': '440AA',
            'RR (245/70R16)': 'D',
            'Wet Grip (245/70R16)': 'C',
            'Noise (245/70R16)': '71 dB',
            'Rim Size (265/65R17)': '17"',
            'LI (265/65R17)': '116',
            'SR (265/65R17)': 'R',
            'UTQC (265/65R17)': '440AA',
            'RR (265/65R17)': 'C',
            'Wet Grip (265/65R17)': 'C',
            'Noise (265/65R17)': '73 dB'
          }
        }
      ],
      chengshan: [
        {
          name: 'CSC112',
          type: 'Heavy-Duty Truck',
          size: '7.00R16LT',
          brand: 'Chengshan',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/CSC112_A.webp',
          images: ['/assets/images/CSC112_A.webp', '/assets/images/CSC112_B.webp'],
          desc: 'A smart design engineered to give you total control and peace of mind, especially when the weather gets unpredictable. It focuses on keeping your vehicle steady and cool to ensure a safe and smooth for any journey.',
          features: [
            'Four zigzag main grooves provide tire excellent directional driving performance.',
            'The design of vertical pattern blocks with horizontal sipes provides excellent anti-hydroplaning.',
            'Special shoulder side design promotes heat dispersion.'
          ],
          specsTable: {
            rows: [
              ['7.00R16LT', '10', '109/105', 'Q', '5.50 F', '-', '1030', '925', '560', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'Heavy-Duty Trucks']
            ]
          }
        },
        {
          name: 'CST27',
          type: 'Heavy-Duty Truck',
          size: '16–20 inch',
          brand: 'Chengshan',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/CST27_A.webp',
          images: ['/assets/images/CST27_A.webp', '/assets/images/CST27_B.webp'],
          desc: 'Engineered for versatility and long-term durability, this tire is built to handle demanding environments without sacrificing performance. Whether you are navigating highways or rugged terrain, its specialized tread design ensures a stable and reliable ride.',
          features: [
            'The three zigzag grooves make tire ideally suited for regional or on/off road condition.',
            'Varied pitches and v-shaped grooves effectively resist stone retention and uneven wear.'
          ],
          specsTable: {
            rows: [
              ['7.50R16LT HD', '14', '122/188', 'L', '6.00 G', 'TT', '1500', '1320', '3305', '2910', '770', '770', '110', '110', '215', '805', '10.5', '14', 'Heavy-Duty Trucks'],
              ['8.25R16LT', '18', '132/128', 'L', '6.50 F', 'TT', '2000', '1800', '4410', '3910', '870', '870', '125', '125', '235', '855', '12', '16', 'Heavy-Duty Trucks'],
              ['8.25R20LT', '16', '139/137', 'K', '6.5', 'TT', '2430', '2300', '5355', '5070', '930', '930', '135', '135', '236', '974', '12', '16', 'Heavy-Duty Trucks'],
              ['9.00R20', '16', '144/142', 'K', '7', 'TT', '2800', '2650', '6170', '5840', '900', '900', '130', '130', '259', '1019', '13', '17', 'Heavy-Duty Trucks'],
              ['10.00R20', '18', '149/146', 'K', '7.5', 'TT', '3250', '3000', '7160', '6610', '930', '930', '135', '135', '278', '1054', '14.5', '19', 'Heavy-Duty Trucks'],
              ['11.00R20', '18', '152/149', 'K', '8', 'TT', '3550', '3250', '7380', '7160', '930', '930', '135', '135', '293', '1085', '15', '19', 'Heavy-Duty Trucks'],
              ['12.00R20', '18', '154/151', 'K', '8.25', 'TT', '3750', '3450', '8270', '7610', '830', '830', '120', '120', '315', '1125', '15.5', '20', 'Heavy-Duty Trucks']
            ]
          }
        },
        {
          name: 'CST78',
          type: 'Heavy-Duty Truck',
          size: '17.5 inch',
          brand: 'Chengshan',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/CST78_A.webp',
          images: ['/assets/images/CST78_A.webp', '/assets/images/CST78_B.webp'],
          desc: 'Designed for consistency and control, built to keep your vehicle steady and your maintenance costs low. It focuses on a smooth, balanced ride that you can rely on day after day.',
          features: [
            'Four straight grooves design provides excellent linear driving performance and uneven wear resistance.'
          ],
          specsTable: {
            rows: [
              ['235/75R17.5', '18', '143/141', 'J', '6.75', 'TL', '2725', '2575', '6005', '5675', '860', '860', '125', '125', '233', '797', '12.5', '16', 'Heavy-Duty Trucks'],
              ['225/80R17.5', '16', '123/122', 'L', '6.75', 'TL', '1550', '1500', '3415', '3305', '825', '825', '120', '120', '226', '805', '11', '14', 'Heavy-Duty Trucks']
            ]
          }
        },
        {
          name: 'CST115A',
          type: 'Heavy-Duty Truck',
          size: '9.5R17.5',
          brand: 'Chengshan',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/CST115A_A.webp',
          images: ['/assets/images/CST115A_A.webp', '/assets/images/CST115A_B.webp'],
          desc: 'Engineered for high-speed efficiency and maximum structural safety, making it an ideal choice for long-haul operations, where reliability is non-negotiable. By combining advanced material science with a reinforced architecture, it offers a smoother, more cost effective ride.',
          features: [
            'New compound of super wear resistance and optimized crown profile offer lower rolling resistance and longer tread life.',
            'Widened tread and optimized belt structure prevent tread separation, thus-high speed durability increased by 11.5%.',
            'Improved bead structure prevents tire & rim decoupling and bead burst and improves bead durability by 15.9%.'
          ],
          specsTable: {
            rows: [
              ['9.5R17.5', '18', '143/141', 'J', '6.25', 'TL', '2725', '2575', '6005', '5675', '875', '875', '125', '125', '240', '842', '12.5', '16', 'Heavy-Duty Trucks']
            ]
          }
        },
        {
          name: 'CST326',
          type: 'Heavy-Duty Truck',
          size: '10.00 R20',
          brand: 'Chengshan',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/CST326_A.webp',
          images: ['/assets/images/CST326_A.webp', '/assets/images/CST326_B.webp'],
          desc: 'Engineered for power and efficiency, making it a reliable choice for drivers who prioritize both performance and long-term value. Its aggressive design ensures your vehicle maintains a firm grip on the road while optimizing your cost per kilometer.',
          features: [
            'Massive lugs provide the tire with excellent traction and driving performance.',
            'Deeper tread offers extended mileage for good economy.',
            'Open shoulder structure provides tire with good water dispersion as well as side slip resistance.'
          ],
          specsTable: {
            rows: [
              ['10.00 R20', '18', '149/146', 'F', '7.5', 'TT', '3250', '3000', '7160', '6610', '930', '930', '135', '135', '278', '1054', '19', '24', 'Heavy-Duty Trucks']
            ]
          }
        },
        {
          name: 'CST327A',
          type: 'Heavy-Duty Truck',
          size: '12.R20',
          brand: 'Chengshan',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/CST327A_A.webp',
          images: ['/assets/images/CST327A_A.webp', '/assets/images/CST327A_B.webp'],
          desc: 'Built for heavy-duty performance and maximum uptime. Designed to thrive in high stress environments, it focuses on structural integrity and material resilience to keep your operations moving.',
          features: [
            'Special high scrib tread compound effectively prevents tire puncture & chunking.',
            'Strengthened belt package & cap strip structure with good load carrying and anti-burst property raise the durability of tire up by 15%.',
            'Newly designed bead profile and material distribution improve bead durability.'
          ],
          specsTable: {
            rows: [
              ['12.R20', '18', '154/151', 'K', '8.5', 'TT', '3750', '3450', '8270', '7610', '830', '830', '120', '120', '315', '1125', '15', '20', 'Heavy-Duty Trucks']
            ]
          }
        },
        {
          name: 'CTH135',
          type: 'Heavy-Duty Truck',
          size: '385/65R22.5',
          brand: 'Chengshan',
          warranty: 'Manufacturer Warranty',
          image: '/assets/images/CTH135_A.webp',
          images: ['/assets/images/CTH135_A.webp', '/assets/images/CTH135_B.webp'],
          desc: 'Built for the long haul, focusing on maximum lifespan and reliable safety in changing weather. By using advanced design technology, it stays cool and remains durable even under heavy use. Whether you are driving through rain or over debris, this tire is designed to stay clean, cool and on the road longer.',
          features: [
            'The highly wear resistant tread compound greatly improves tread durability.',
            'The best profile design with the finite element simulation technology, with lower heat generation and optimum durability.',
            'High wear resistant tread compound combined with lower void ratio provides tire excellent wear performance.',
            'The optimized width ratio of pattern block assures even wear on shoulder.',
            'Zigzag groove with sipe design can cut into water film easily on wet road, ensuring excellent water film easily on wet road, ensuring excellent water dispersion and anti-hydro-planing.',
            'The diamond shape stepped pattern design effectively wear resistance, anti-punctures and self-cleaning performance.'
          ],
          specsTable: {
            rows: [
              ['385/65R22.5', '20', '160', 'K', '11.75', 'TL', '4500', '-', '9920', '-', '900', '-', '130', '-', '389', '1072', '15.5', '20', 'Heavy-Duty Trucks']
            ]
          }
        }
      ]
    }
  },
  battery: {
    name: 'Battery',
    hasBrands: true,
    brandProducts: {
      enerco: [
        { name: 'DIN 44MF', type: 'AGM', size: '12V 44Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/DIN55MF 12V 55AH_OK.webp', images: ['/assets/images/DIN55MF 12V 55AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '44Ah' } },
        { name: 'DIN 55MF', type: 'Heavy Duty', size: '12V 55Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/DIN55MF 12V 55AH_OK.webp', images: ['/assets/images/DIN55MF 12V 55AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '55Ah' } },
        { name: 'DIN 80MF', type: 'AGM Start-Stop', size: '12V 80Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/DIN80MF 12V 80AH_OK.webp', images: ['/assets/images/DIN80MF 12V 80AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '80Ah' } },
        { name: 'DIN 100MF', type: 'AGM', size: '12V 100Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/DIN100MF 12V 100AH_OK.webp', images: ['/assets/images/DIN100MF 12V 100AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '100Ah' } },
        { name: 'N50 ZLMF', type: 'AGM', size: '12V 70Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/N50ZLMF-70AH 12V 70AH_OK.webp', images: ['/assets/images/N50ZLMF-70AH 12V 70AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '70Ah' } },
        { name: 'N70 ZRMF', type: 'AGM', size: '12V 80Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/N70ZRMF-80AH 12V 80AH_OK.webp', images: ['/assets/images/N70ZRMF-80AH 12V 80AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '80Ah' } },
        { name: 'N100LMF', type: 'Mid-Range AGM', size: '12V 100Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/N100LMF 12V 100AH_OK.webp', images: ['/assets/images/N100LMF 12V 100AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '6SM', 'Voltage': '12V', 'Capacity': '100Ah' } },
        { name: 'N120MF', type: 'Premium AGM', size: '12V 120Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/N120MF 12V 120AH_OK.webp', images: ['/assets/images/N120MF 12V 120AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '2D', 'Voltage': '12V', 'Capacity': '120Ah' } },
        { name: 'N150MF', type: 'Heavy Duty AGM', size: '12V 150Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/N150MF 12V 150AH_OK.webp', images: ['/assets/images/N150MF 12V 150AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '4D', 'Voltage': '12V', 'Capacity': '150Ah' } },
        { name: 'N200MF', type: 'EFB Start-Stop', size: '12V 200Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/N200MF 12V 200AH_OK.webp', images: ['/assets/images/N200MF 12V 200AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '8D', 'Voltage': '12V', 'Capacity': '200Ah' } },
        { name: 'NS40LMF', type: 'Compact AGM', size: '12V 36Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/NS40LMF 12V36AH_OK.webp', images: ['/assets/images/NS40LMF 12V36AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '36Ah' } },
        { name: 'NS50L 75D23LMF', type: 'Commercial Heavy Duty', size: '12V 60Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/NS50L 75D23LMF 12V 60AH_OK.webp', images: ['/assets/images/NS50L 75D23LMF 12V 60AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '-', 'Voltage': '12V', 'Capacity': '60Ah' } },
        { name: 'NS70LMF', type: 'AGM', size: '12V 65Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/NS70 LMF 12V 65AH_OK.webp', images: ['/assets/images/NS70 LMF 12V 65AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '2SM', 'Voltage': '12V', 'Capacity': '2SM (65AH)' } },
        { name: 'N70LMF', type: 'AGM', size: '12V 65Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/N70LMF 12V 70AH_OK.webp', images: ['/assets/images/N70LMF 12V 70AH_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '3SM', 'Voltage': '12V', 'Capacity': '70 AH' } },
        { name: 'NS40 RMF', type: 'AGM', size: '12V 65Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/NS40 RMF_OK.webp', images: ['/assets/images/NS40 RMF_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '2SM', 'Voltage': '12V', 'Capacity': '65Ah' } },
        { name: 'NS70', type: 'AGM', size: '12V 65Ah', brand: 'Enerco', warranty: 'Manufacturer Warranty', image: '/assets/images/NS70 LMF_OK.webp', images: ['/assets/images/NS70 LMF_OK.webp'], desc: 'Engineered for absolute reliability that goes beyond the standard, delivering a premium power solution that moves with you. Our brand is built on four core truths that ensure you never have to worry about whats under the hood.', features: ['High performance and low discharge rate', 'Long service lifespan', 'Strong starting performance at low temperature', 'Select high quality raw materials'], specs: { 'Size': '2SM', 'Voltage': '12V', 'Capacity': '65Ah' } }
      ]
    }
  },
  fuel: {
    name: 'Fuel',
    hasBrands: false,
    products: [
      { name: 'BIG TANKER', type: 'Bulk Fuel Tanker', size: 'Large Capacity', brand: 'DOYEN', warranty: 'N/A', image: '/assets/images/BIG TANKER.webp', images: ['/assets/images/BIG TANKER.webp'], desc: 'We remain committed to the promise delivering fuels that is absolutely clean, our premium tanks ensure it stays that way once it\'s on your property.', features: ['Secured Storage Facilities', 'Reliable Fleet Integrity', 'Rigorous Transit Protocols'], specs: { 'Available Volumes': '50,000 Liters / 40,000 Liters / 30,000 Liters / 24,000 Liters' } },
      { name: 'SMALL TANKER', type: 'Fuel Delivery Tanker', size: 'Medium Capacity', brand: 'DOYEN', warranty: 'N/A', image: '/assets/images/SMALL TANKER.webp', images: ['/assets/images/SMALL TANKER.webp'], desc: 'We remain committed to the promise delivering fuels that is absolutely clean, our premium tanks ensure it stays that way once it\'s on your property.', features: ['Secured Storage Facilities', 'Reliable Fleet Integrity', 'Rigorous Transit Protocols'], specs: { 'Available Volumes': '5,000 Liters / 3,300 Liters' } }
    ]
  },
  fuel_storage_tank: {
    name: 'Tank',
    hasBrands: false,
    products: [
      { name: 'Trailer Tank', type: 'Underground UST', size: '10,000 Liters', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/big.webp', images: ['/assets/images/big.webp'], desc: 'Designed for the transportation of bulk liquids including fuels, oil, water and select industrial chemicals compatible for regional or intracity distribution.', features: ['Fabricated Steel Tanks', 'Contamination Resistant Features', 'Reliable Structural Integrity'], specs: { 'Available Storage Capacities': '20,000 Liters / 30,000 Liters / 40,000 Liters / 50,000 Liters' } },
      { name: 'Storage Fuel Tank', type: 'Aboveground AST', size: '20,000 Liters', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/small.webp', images: ['/assets/images/small.webp'], desc: 'Engineered storage tanks that can withstand high demands of heavy industries that is safe and compliant to international standards.', features: ['Fabricated Steel Tanks', 'Contamination Resistant Features', 'Reliable Structural Integrity', 'Flexible Capacities', 'Fast Delivery & Careful Installation Support'], specs: { 'Available Storage Capacities': 'Tailored Upon Client Request' } }
    ]
  },
  fuel_dispenser: {
    name: 'Fuel Dispenser',
    hasBrands: false,
    products: [
      { name: '1 PUMP', type: 'Single Nozzle Dispenser', size: '1 Nozzle / 1 Each Side', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/TK32J110G.webp', images: ['/assets/images/TK32J110G.webp'], desc: 'Internationally produced from a number one fuel dispenser manufacturer that specializes in fuel products. Its precise technology made it as one of the top choice brand in the industry.', features: ['International Solenoid Valve', 'High Performance Price Ratio', 'Stainless Steel Keypad', 'Electronic Volume Display', 'Excellent Quality'], specs: { 'Hose': '1', 'Display': '1 SIDE', 'Volts': '220V', 'Keypad': 'Stainless Steel', 'Nozzle Flowmeter': '1', 'Petrol Products': '1', 'Pump': '1', 'Mainboard': '1' } },
      { name: '2 PUMPS', type: 'Double Nozzle Dispenser', size: '2 Nozzles / 1 Each Side', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/TK32J2220G.webp', images: ['/assets/images/TK32J2220G.webp'], desc: 'Internationally produced from a number one fuel dispenser manufacturer that specializes in fuel products. Its precise technology made it as one of the top choice brand in the industry.', features: ['International Solenoid Valve', 'High Performance Price Ratio', 'Stainless Steel Keypad', 'Electronic Volume Display', 'Excellent Quality'], specs: { 'Hose': '2', 'Display': '2 EACH SIDE', 'Volts': '220V', 'Keypad': 'Stainless Steel', 'Nozzle Flowmeter': '2', 'Petrol Products': '2', 'Pump': '2', 'Mainboard': '2' } },
      { name: '4 PUMPS', type: 'Quad Nozzle Dispenser', size: '4 Nozzles / 2 Each Side', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/TK46J4240G.webp', images: ['/assets/images/TK46J4240G.webp'], desc: 'Internationally produced from a number one fuel dispenser manufacturer that specializes in fuel products. Its precise technology made it as one of the top choice brand in the industry.', features: ['International Solenoid Valve', 'High Performance Price Ratio', 'Stainless Steel Keypad', 'Electronic Volume Display', 'Excellent Quality'], specs: { 'Hose': '4', 'Display': '2 EACH SIDE', 'Volts': '220V / 50Hz', 'Keypad': 'Stainless Steel', 'Nozzle Flowmeter': '4', 'Petrol Products': '2', 'Pump': '2', 'Mainboard': '4' } },
      { name: '6 PUMPS', type: 'Six Nozzle Dispenser', size: '6 Nozzles / 3 Each Side', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/6 DISPENSER.webp', images: ['/assets/images/6 DISPENSER.webp'], desc: 'Internationally produced from a number one fuel dispenser manufacturer that specializes in fuel products. Its precise technology made it as one of the top choice brand in the industry.', features: ['International Solenoid Valve', 'High Performance Price Ratio', 'Stainless Steel Keypad', 'Electronic Volume Display', 'Excellent Quality'], specs: { 'Hose': '6', 'Display': '3 EACH SIDE', 'Volts': '220V / 50Hz', 'Keypad': 'Stainless Steel', 'Nozzle Flowmeter': '6', 'Petrol Products': '3', 'Pump': '3', 'Mainboard': '6' } }
    ]
  },
  lpg: {
    name: 'LPG',
    hasBrands: false,
    products: [
      { name: '11KG LPG', type: 'Household Cylinder', size: '11 kg', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/11KG LPG_1.webp', images: ['/assets/images/11KG LPG_1.webp', '/assets/images/lpg3.webp'], desc: 'Its low-carbon fuel that\'s ideal for commercial and industrial use perfect source energy solution on heating homes and operating equipments. Its excellent standard features include.', keyFeatures: ['Explosion Proof: Safe and worry-free. Petrogreen is built for maximum safety and is guaranteed non-explosive.', 'Cost-Effective: More affordable than other LPG brands. High-quality fuel that helps you save more on every refill.', 'Accurate Weight: Guaranteed full content. We ensure every container is delivered with the exact weight, with no hidden shortages.'], features: ['Know where the gas shut off valve is and how to use it.', 'Store cylinders in an upright position externally in a secure well-ventilated area.', 'Keep storage areas clear of combustible materials and combustible resources.', 'Provide and maintain suitable firefighting equipment.', 'Ensure ventilation in rooms where LPG appliances are used.', 'Turn off cylinder valves at the end of each working day or after you use it.'], specs: { 'Capacity': '11 kg LPG', 'Water Volume': '26.2 Liters', 'Working Pressure': '1.6 MPa', 'Material': 'Carbon Steel', 'Standard': 'PNS / DOE Philippines' } },
      { name: '50KG LPG', type: 'Commercial Cylinder', size: '50 kg', brand: 'DOYEN', warranty: 'Manufacturer Warranty', image: '/assets/images/lpg.webp', images: ['/assets/images/lpg.webp', '/assets/images/lpg1.webp'], desc: 'Its low-carbon fuel that\'s ideal for commercial and industrial use perfect source energy solution on heating homes and operating equipments. Its excellent standard features include.', keyFeatures: ['Explosion Proof: Safe and worry-free. Petrogreen is built for maximum safety and is guaranteed non-explosive.', 'Cost-Effective: More affordable than other LPG brands. High-quality fuel that helps you save more on every refill.', 'Accurate Weight: Guaranteed full content. We ensure every container is delivered with the exact weight, with no hidden shortages.'], features: ['Know where the gas shut off valve is and how to use it.', 'Store cylinders in an upright position externally in a secure well-ventilated area.', 'Keep storage areas clear of combustible materials and combustible resources.', 'Provide and maintain suitable firefighting equipment.', 'Ensure ventilation in rooms where LPG appliances are used.', 'Turn off cylinder valves at the end of each working day or after you use it.'], specs: { 'Capacity': '50 kg LPG', 'Water Volume': '118 Liters', 'Working Pressure': '1.6 MPa', 'Material': 'Carbon Steel', 'Standard': 'PNS / DOE Philippines' } }
    ]
  },
  sinotruk: {
    name: 'Sinotruk',
    hasBrands: false,
    products: [
      { name: 'Boom Truck Homan H3 4X2', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/BOOM TRUCK HOMAN H3 4X2_1.webp', images: ['/assets/images/BOOM TRUCK HOMAN H3 4X2_1.webp', '/assets/images/BOOM TRUCK HOMAN H3 4X2_2.webp', '/assets/images/BOOM TRUCK HOMAN H3 4X2_3.webp'], specs: { 'Engine': 'YC4110', 'Load Capacity': 'XCMG SQ3.2SK2Q', 'Cargo Body Size': '5600*2300*1500MM', 'Front Axle': '3.6 TONS', 'Rear Axle': '10.5 TONS', 'Fuel Tank': '200L', 'Tire': '9.0/R20', 'Transmission': 'DC6J95T' } },
      { name: 'Cargo Truck Homan H3 4X2', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/CARGO TRUCK HOMAN H3 4X2_1.webp', images: ['/assets/images/CARGO TRUCK HOMAN H3 4X2_1.webp', '/assets/images/CARGO TRUCK HOMAN H3 4X2_2.webp', '/assets/images/CARGO TRUCK HOMAN H3 4X2_3.webp'], specs: { 'Engine': 'JE493ZLQ3A ISUZU', 'Front Axle': '130, OIL BREAK', 'Fuel Tank': '80L', 'Tire': '7.00-16LT', 'Transmission': 'WLY145H (5)' } },
      { name: 'Cargo Truck Homan H5 4X2', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/Cargo Truck Homan H5 4X2_A (1).webp', images: ['/assets/images/Cargo Truck Homan H5 4X2_A (1).webp', '/assets/images/Cargo Truck Homan H5 4X2_B (1).webp', '/assets/images/Cargo Truck Homan H5 4X2_C (1).webp'], specs: { 'Engine': 'YC6A260-46', 'Front Axle': '55000', 'Rear Axle': '13000*2', 'Fuel Tank': '300L', 'Tire': '10.00-20 10+1', 'Transmission': 'HW19712' } },
      { name: 'Dump Truck Homan H3 4X2 B', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/DUMP TRUCK HOMAN H3 4X2_A.webp', images: ['/assets/images/DUMP TRUCK HOMAN H3 4X2_A.webp', '/assets/images/DUMP TRUCK HOMAN H3 4X2_B.webp', '/assets/images/DUMP TRUCK HOMAN H3 4X2_C.webp'], specs: { 'Engine': 'YC4D130-48', 'Front Axle': '1090 (1 TONS)', 'Rear Axle': '153AS (9 TONS)', 'Fuel Tank': '120L', 'Tire': '9.00R20', 'Transmission': 'WLY653G (6)' } },
      { name: 'Dump Truck Homan H3 4X2 A', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/DUMP TRUCK HOMAN H3 4X2_A.webp', images: ['/assets/images/DUMP TRUCK HOMAN H3 4X2_A.webp', '/assets/images/DUMP TRUCK HOMAN H3 4X2_B.webp', '/assets/images/DUMP TRUCK HOMAN H3 4X2_C.webp'], specs: { 'Engine': 'YCD41IL-120', 'Front Axle': '1080D (2.8 TONS)', 'Rear Axle': '1080DD (6.5 TONS)', 'Fuel Tank': '120L', 'Tire': '8.25R20', 'Transmission': 'WLY145H (5)' } },
      { name: 'Dump Truck Howo T7 8x4', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/DUMP TRUCK HOWO T7 8X4_A.webp', images: ['/assets/images/DUMP TRUCK HOWO T7 8X4_A.webp', '/assets/images/DUMP TRUCK HOWO T7 8X4_B.webp', '/assets/images/DUMP TRUCK HOWO T7 8X4_C.webp'], specs: { 'Engine': 'D12.42-40 420HP', 'Load Capacity': '300L', 'Cargo Body Size': '8500*2300*1800mm', 'Front Axle': 'HF-9', 'Rear Axle': 'HC16', 'Fuel Tank': '400L', 'Tire': '12.00R20 / 80R22', 'Transmission': 'HW19712' } },
      { name: 'Dump Truck Howo 6x4', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/EURO 4 DUMP TRUCK 6X4_1.webp', images: ['/assets/images/EURO 4 DUMP TRUCK 6X4_1.webp', '/assets/images/EURO 4 DUMP TRUCK 6X4_2.webp', '/assets/images/EURO 4 DUMP TRUCK 6X4_3.webp'], specs: { 'Engine': 'D10.38-40 380 HP', 'Load Capacity': '300L', 'Cargo Body Size': '5600*2300*1500MM', 'Front Axle': 'HF-9', 'Rear Axle': 'HC16', 'Fuel Tank': '300L', 'Tire': '12.99R20', 'Transmission': 'HW19710' } },
      { name: 'Fuel Truck Homan H3 4X2', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/FUEL TRUCK HOMAN H3 4X2_A.webp', images: ['/assets/images/FUEL TRUCK HOMAN H3 4X2_A.webp', '/assets/images/FUEL TRUCK HOMAN H3 4X2_B.webp', '/assets/images/FUEL TRUCK HOMAN H3 4X2_C.webp'], specs: { 'Engine': 'YCD41IL-120', 'Front Axle': '1080DD (2.8 TONS)', 'Rear Axle': '1080DD (6.5 TONS)', 'Fuel Tank': '120L', 'Tire': '8.25R20', 'Transmission': 'WLY145H (5)' } },
      { name: 'Fuel Truck Howo T7 6X4', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/FUEL TRUCK HOWO T7 6X4_A.webp', images: ['/assets/images/FUEL TRUCK HOWO T7 6X4_A.webp', '/assets/images/FUEL TRUCK HOWO T7 6X4_B.webp', '/assets/images/FUEL TRUCK HOWO T7 6X4_C.webp'], specs: { 'Engine': 'D10.38-40 380 HP', 'Front Axle': 'HF-9', 'Rear Axle': 'HC16', 'Fuel Tank': '300L', 'Tire': '295/80R22.5', 'Transmission': 'HW19710' } },
      { name: 'Garbage Truck Homan H3 4X2', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/GARBAGE TRUCK HOMAN H3 4X2_A.webp', images: ['/assets/images/GARBAGE TRUCK HOMAN H3 4X2_A.webp', '/assets/images/GARBAGE TRUCK HOMAN H3 4X2_B.webp', '/assets/images/GARBAGE TRUCK HOMAN H3 4X2_C.webp'], specs: { 'Engine': 'YC4E140-48', 'Front Axle': '3000', 'Rear Axle': '9000', 'Fuel Tank': '150L', 'Tire': '8.25R20' } },
      { name: 'Garbage Truck Homan H5 4X2', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/94.webp', images: ['/assets/images/94.webp', '/assets/images/104.webp', '/assets/images/108.webp'], specs: { 'Engine': 'TC6J200-16', 'Front Axle': '1320', 'Rear Axle': '2380', 'Fuel Tank': '300L', 'Tire': '9.00R20', 'Transmission': 'HW197I' } },
      { name: 'Tractor Truck Howo T7 6X4', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/95.webp', images: ['/assets/images/95.webp', '/assets/images/100.webp', '/assets/images/109.webp'], specs: { 'Engine': 'D12.42-40 380HP', 'Front Axle': 'HF-9', 'Rear Axle': 'HC16', 'Fuel Tank': '400L', 'Tire': '315/80R22.5', 'Transmission': 'HW19712' } },
      { name: 'Transit Mixer Homan H3 4X2 A', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/97.webp', images: ['/assets/images/97.webp', '/assets/images/103.webp', '/assets/images/110.webp'], specs: { 'Engine': 'YC4D130-48', 'Load Capacity': '4 Cubic', 'Fuel Tank': '20 Liters (Iron)', 'Tire': '8.25R20 6+1' } },
      { name: 'Transit Mixer Howo T7 6X4', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/98.webp', images: ['/assets/images/98.webp', '/assets/images/105.webp', '/assets/images/11A.webp'], specs: { 'Engine': 'D.10.38-40', 'Load Capacity': '300L', 'Cargo Body Size': '5600*2300*1500MM', 'Front Axle': 'HF-9', 'Rear Axle': 'HC16', 'Fuel Tank': '300L', 'Tire': '12.00R20', 'Transmission': 'HW19710' } },
      { name: 'Water Truck Homan H3 4X2', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/99.webp', images: ['/assets/images/99.webp', '/assets/images/102.webp', '/assets/images/107.webp'], specs: { 'Engine': 'YC4FA115-40', 'Front Axle': '2000', 'Rear Axle': '3500', 'Fuel Tank': '120L', 'Tire': '7.00R16' } },
      { name: 'Dump Truck T7 6X4 A', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/DUMP TRUCK HOWO T7 8X4_A.webp', images: ['/assets/images/DUMP TRUCK HOWO T7 8X4_A.webp', '/assets/images/DUMP TRUCK HOWO T7 8X4_B.webp', '/assets/images/DUMP TRUCK HOWO T7 8X4_C.webp'], specs: { 'Engine': 'D10.38-40 380 HP', 'Cargo Body Size': '5600*2300*1500MM', 'Front Axle': 'HF-9', 'Rear Axle': 'HC16', 'Fuel Tank': '300L', 'Tire': '12.99R20', 'Transmission': 'HW19712' } },
      { name: 'Tractor Head Howo T7 6X4', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/95.webp', images: ['/assets/images/95.webp', '/assets/images/100.webp', '/assets/images/109.webp'], specs: { 'Engine': 'D.10.38 380HP', 'Load Capacity': '300L', 'Cargo Body Size': '8500*2300*1800mm', 'Front Axle': 'HR7', 'Rear Axle': 'MCY13', 'Fuel Tank': '400L', 'Tire': '315/80R22.5', 'Transmission': 'HW19712L' } },
      { name: 'Aluminum Closed Van', brand: 'Sinotruk', warranty: 'Manufacturer Warranty', image: '/assets/images/Aluminum Truck_A.webp', images: ['/assets/images/Aluminum Truck_A.webp', '/assets/images/Aluminum Truck_B.webp', '/assets/images/Aluminum Truck_C.webp'], specs: { 'Engine': 'YC4D130-33', 'Fuel Tank': '300L', 'Tire': '8.25R20' } }
    ]
  }
};
