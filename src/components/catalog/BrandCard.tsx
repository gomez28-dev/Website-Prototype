import React from 'react';
import type { Brand } from '../../data/products';

interface BrandCardProps {
  brand: Brand;
  onSelectBrand: () => void;
}

export default function BrandCard({ brand, onSelectBrand }: BrandCardProps) {
  return (
    <div className="ix-card">
      <div className="ix-card-image">
        <img src={brand.image} alt={brand.name} loading="lazy" />
      </div>
      <div className="ix-card-info">
        <h3 className="ix-card-title">{brand.name}</h3>
        <p className="ix-card-desc">{brand.desc}</p>
        <div className="ix-card-actions">
          <button className="ix-btn ix-btn-light" onClick={onSelectBrand}>
            View Products
          </button>
          <a href={`/contact?brand=${encodeURIComponent(brand.name)}`} className="ix-btn ix-btn-primary">
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}
