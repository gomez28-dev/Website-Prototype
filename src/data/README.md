# DOYEN Group of Companies — API Swap Integration Contract

This directory contains the core data structures used by the front-end components. Currently, all data is statically declared using TypeScript schemas to support static site generation (SSG) deployment to CDNs (Netlify / Vercel).

When the Hostinger MySQL database and the corresponding REST API are developed, these static data files can be swapped for API calls with minimal front-end changes.

---

## 1. Product Catalog Data Swap

### Interfaces Mapping (`src/data/products.ts`)
The front-end expects product data to conform to the following nested contracts:
- `Product`: Individual product parameters including name, category, brand, and specifications (supports both standard key-value maps and high-detail tires tabular layout).
- `Brand`: Represents a manufacturer brand (e.g., Compasal, Enerco) and holds its name, cover image, and description.
- `CategoryData`: Groups products either by brands (e.g., Tires, Battery) or directly in a product array for brandless categories (e.g., Tanks, LPG, Sinotruk).

### API Swap Strategy
When the API is available, replace the local imports of `productData` and `brandData` in components or pages.

#### 1. Client-Side Hydration (React Island)
If calling the API directly inside the React catalog island:

```typescript
// src/components/catalog/ProductCatalog.tsx

import React, { useState, useEffect } from 'react';
// Remove local static import:
// import { productData } from '../../data/products';

export default function ProductCatalog() {
  const [catalog, setCatalog] = useState<Record<string, CategoryData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.doyenph.com/v1/products')
      .then(res => res.json())
      .then(data => {
        setCatalog(data);
        setLoading(false);
      });
  }, []);

  // ... rest of the catalog filtering logic remains unchanged
}
```

#### 2. Static Build Prefetch (Astro Server-Side)
If pre-rendering the catalog statically at build time (recommended for SEO speed):

```astro
---
// src/pages/products.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import ProductCatalog from '../components/catalog/ProductCatalog';

// Prefetch data on the server during npm run build
const response = await fetch('https://api.doyenph.com/v1/products');
const productData = await response.json();
---
<BaseLayout>
  <!-- Pass prefetched data directly as props to the React island to avoid runtime fetch delays -->
  <ProductCatalog initialData={productData} client:load />
</BaseLayout>
```

---

## 2. Careers Portal Data Swap

### Dynamic Route Setup (`src/pages/careers/[slug].astro`)
Currently, Astro creates dynamic paths at build time using the statically declared jobs list:

```typescript
export async function getStaticPaths() {
  return jobs.map(job => ({ params: { slug: job.slug }, props: { job } }));
}
```

### API Swap Strategy
When job listings are stored in the MySQL database, update the dynamic path generation to request available listings:

```astro
---
// src/pages/careers/[slug].astro

export async function getStaticPaths() {
  const response = await fetch('https://api.doyenph.com/v1/jobs');
  const jobs = await response.json();
  
  return jobs.map(job => ({ 
    params: { slug: job.slug }, 
    props: { job } 
  }));
}

const { job } = Astro.props;
---
<!-- Renders the job detail layout -->
```

---

## 3. Recommended JSON Response Formats

To ensure zero code churn on the front-end, the backend REST endpoints must return payloads matching the local structures.

### GET `/v1/products`
```json
{
  "tires": {
    "name": "Tires",
    "hasBrands": true,
    "brandProducts": {
      "compasal": [
        {
          "name": "BLAZER HP",
          "type": "Highway Terrain",
          "size": "175/65R14 82H",
          "brand": "Compasal",
          "warranty": "Manufacturer Warranty",
          "image": "/assets/images/BLAZER HP.webp",
          "images": ["/assets/images/BLAZER HP.webp"],
          "desc": "Product description...",
          "features": ["Feature A", "Feature B"],
          "specs": {
            "Available Sizes": "175/65R14 82H"
          }
        }
      ]
    }
  },
  "lpg": {
    "name": "LPG",
    "hasBrands": false,
    "products": [
      {
        "name": "11KG LPG",
        "brand": "DOYEN",
        "warranty": "Manufacturer Warranty",
        "image": "/assets/images/11KG.webp",
        "images": ["/assets/images/11KG.webp"],
        "keyFeatures": ["Explosion Proof", "Accurate Weight"],
        "features": ["Store upright", "Ventilate room"],
        "specs": {
          "Capacity": "11 kg LPG",
          "Standard": "PNS / DOE"
        }
      }
    ]
  }
}
```

### GET `/v1/jobs`
```json
[
  {
    "slug": "general-accounting-specialist",
    "title": "General Accounting Specialist",
    "department": "Accounting",
    "location": "Valenzuela City",
    "type": "Full-time",
    "qualification": "Bachelor's Degree",
    "experience": "3+ Years",
    "overview": "Overview...",
    "dutySections": [
      {
        "heading": "Core Duties",
        "items": ["Duty 1", "Duty 2"]
      }
    ],
    "ksas": [
      {
        "title": "Knowledge",
        "description": "Tax principles"
      }
    ],
    "qualifications": [
      "Degree in Finance"
    ]
  }
]
```
