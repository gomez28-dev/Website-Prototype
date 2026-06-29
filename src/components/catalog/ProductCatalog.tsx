import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, ChevronRight, ArrowLeft, 
  CheckCircle, Shield, Mail, Phone 
} from 'lucide-react';
import { 
  productData, brandData, TIRE_GROUPS, TIRE_SUB, 
  type Product, type CategoryData 
} from '../../data/products';
import ProductCard from './ProductCard';
import BrandCard from './BrandCard';
import RelatedCard from './RelatedCard';
import SectionNav from './SectionNav';
import EmptyState from './EmptyState';

function matchesSearch(p: Product, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const checkStr = (str?: string) => str ? str.toLowerCase().includes(q) : false;

  if (checkStr(p.name)) return true;
  if (checkStr(p.desc)) return true;
  if (checkStr(p.type)) return true;
  if (checkStr(p.size)) return true;
  if (checkStr(p.brand)) return true;

  if (p.specs) {
    for (const val of Object.values(p.specs)) {
      if (checkStr(val)) return true;
    }
  }

  if (p.specsTable?.rows) {
    for (const row of p.specsTable.rows) {
      for (const cell of row) {
        if (checkStr(cell)) return true;
      }
    }
  }

  if (p.features) {
    for (const f of p.features) {
      if (checkStr(f)) return true;
    }
  }

  if (p.keyFeatures) {
    for (const kf of p.keyFeatures) {
      if (checkStr(kf)) return true;
    }
  }

  return false;
}

export default function ProductCatalog() {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('');
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeProductCategoryName, setActiveProductCategoryName] = useState<string>('');
  const [activeProductBrandName, setActiveProductBrandName] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('detailSpecs');



  // Auto-scroll helper
  const scrollUp = () => {
    const el = document.querySelector('.catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Close modal logic
  const closeModal = () => {
    setActiveProduct(null);
    scrollUp();
  };

  // Open modal logic
  const openModal = (product: Product, catName: string, brandName: string) => {
    setActiveProduct(product);
    setActiveProductCategoryName(catName);
    setActiveProductBrandName(brandName);
    setActiveImageIndex(0);
    setActiveTab('detailSpecs');
    scrollUp();
  };

  // Related products logic
  const getRelatedProducts = (p: Product): Product[] => {
    let sameCatProducts: Product[] = [];
    for (const catKey in productData) {
      const catVal = productData[catKey];
      if (catVal.hasBrands && catVal.brandProducts) {
        for (const brandKey in catVal.brandProducts) {
          const brandProds = catVal.brandProducts[brandKey];
          if (brandProds.some(bp => bp.name === p.name)) {
            sameCatProducts = brandProds.filter(bp => bp.name !== p.name);
            if (sameCatProducts.length < 4) {
              const otherBrandProds = Object.keys(catVal.brandProducts)
                .filter(k => k !== brandKey)
                .flatMap(k => catVal.brandProducts![k])
                .filter(bp => bp.name !== p.name);
              sameCatProducts = sameCatProducts.concat(otherBrandProds);
            }
            break;
          }
        }
      } else {
        if ((catVal.products || []).some(pr => pr.name === p.name)) {
          sameCatProducts = (catVal.products || []).filter(pr => pr.name !== p.name);
        }
      }
      if (sameCatProducts.length > 0) break;
    }

    if (sameCatProducts.length === 0) {
      let allProducts: Product[] = [];
      for (const catKey in productData) {
        const catVal = productData[catKey];
        if (catVal.hasBrands && catVal.brandProducts) {
          for (const brandKey in catVal.brandProducts) {
            allProducts = allProducts.concat(catVal.brandProducts[brandKey]);
          }
        } else {
          allProducts = allProducts.concat(catVal.products || []);
        }
      }
      sameCatProducts = allProducts.filter(prod => prod.name !== p.name);
    }
    return sameCatProducts.slice(0, 4);
  };

  // Handles escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Read category from URL query param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && productData[cat]) {
      setSelectedCategoryKey(cat);
    }
  }, []);

  // Handle category change dropdown
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCategoryKey(val);
    setSelectedBrandId('');
    scrollUp();
  };

  // Reset to initial state
  const resetAll = () => {
    setSelectedCategoryKey('');
    setSelectedBrandId('');
    setSearchTerm('');
    scrollUp();
  };

  const goBackFromProducts = () => {
    const cat = productData[selectedCategoryKey];
    if (cat && cat.hasBrands) {
      setSelectedBrandId('');
    } else {
      resetAll();
    }
    scrollUp();
  };

  // Resolve current active view products (pre-search filtering)
  let activeProductsToDisplay: { p: Product; catName: string; brandName: string }[] = [];
  let showBrandsGrid = false;
  let currentCategoryObj: CategoryData | null = null;

  if (selectedCategoryKey) {
    currentCategoryObj = productData[selectedCategoryKey];
    if (currentCategoryObj.hasBrands) {
      if (selectedBrandId) {
        const products = currentCategoryObj.brandProducts?.[selectedBrandId] || [];
        const brandObj = brandData[selectedCategoryKey]?.find(b => b.id === selectedBrandId);
        activeProductsToDisplay = products.map(p => ({
          p,
          catName: currentCategoryObj!.name,
          brandName: brandObj?.name || p.brand
        }));
      } else {
        showBrandsGrid = true;
      }
    } else {
      activeProductsToDisplay = (currentCategoryObj.products || []).map(p => ({
        p,
        catName: currentCategoryObj!.name,
        brandName: p.brand
      }));
    }
  }

  // Apply search term filtering to the active set of products OR search across all if typing from empty state
  let displayedProducts = [...activeProductsToDisplay];
  const query = searchTerm.toLowerCase().trim();

  if (query) {
    if (selectedCategoryKey) {
      // Filter within the selected view
      if (showBrandsGrid) {
        // If viewing brands list, search across all products in this category instead
        const allCategoryProducts: { p: Product; catName: string; brandName: string }[] = [];
        if (currentCategoryObj && currentCategoryObj.brandProducts) {
          Object.keys(currentCategoryObj.brandProducts).forEach(brandId => {
            const bProducts = currentCategoryObj!.brandProducts![brandId] || [];
            const brandName = brandData[selectedCategoryKey]?.find(b => b.id === brandId)?.name || '';
            bProducts.forEach(p => {
              allCategoryProducts.push({ p, catName: currentCategoryObj!.name, brandName });
            });
          });
        }
        displayedProducts = allCategoryProducts.filter(item => 
          matchesSearch(item.p, query)
        );
        showBrandsGrid = false; // Hide brand selector if search is active
      } else {
        displayedProducts = activeProductsToDisplay.filter(item => 
          matchesSearch(item.p, query)
        );
      }
    } else {
      // Search across ALL categories
      const allGlobalProducts: { p: Product; catName: string; brandName: string }[] = [];
      Object.keys(productData).forEach(catKey => {
        const cat = productData[catKey];
        if (cat.hasBrands && cat.brandProducts) {
          Object.keys(cat.brandProducts).forEach(brandId => {
            const bProducts = cat.brandProducts![brandId] || [];
            const brandName = brandData[catKey]?.find(b => b.id === brandId)?.name || '';
            bProducts.forEach(p => {
              allGlobalProducts.push({ p, catName: cat.name, brandName });
            });
          });
        } else if (cat.products) {
          cat.products.forEach(p => {
            allGlobalProducts.push({ p, catName: cat.name, brandName: p.brand });
          });
        }
      });

      displayedProducts = allGlobalProducts.filter(item => 
        matchesSearch(item.p, query)
      );
    }
  } else if (!selectedCategoryKey) {
    // No category selected and no search — show all products by default
    Object.keys(productData).forEach(catKey => {
      const cat = productData[catKey];
      if (cat.hasBrands && cat.brandProducts) {
        Object.keys(cat.brandProducts).forEach(brandId => {
          const bProducts = cat.brandProducts![brandId] || [];
          const brandName = brandData[catKey]?.find(b => b.id === brandId)?.name || '';
          bProducts.forEach(p => {
            displayedProducts.push({ p, catName: cat.name, brandName });
          });
        });
      } else if (cat.products) {
        cat.products.forEach(p => {
          displayedProducts.push({ p, catName: cat.name, brandName: p.brand });
        });
      }
    });
  }

  // Determine grid container layout class based on selected category
  const getGridClass = () => {
    if (selectedCategoryKey === 'sinotruk') {
      return 'cards-grid-sinotruk fade-in';
    }
    return 'cards-grid-4 fade-in';
  };

  // Determine if specific product modal layout features apply
  const isLPG = activeProductCategoryName.trim().toUpperCase() === 'LPG';
  const isTruck = activeProductCategoryName.trim().toLowerCase() === 'trucks' || activeProductCategoryName.trim().toLowerCase() === 'sinotruk';
  const isFuel = activeProductCategoryName.trim().toLowerCase() === 'fuel';
  const isTank = activeProductCategoryName.trim().toLowerCase() === 'tank' || activeProductCategoryName.trim().toLowerCase() === 'tanks';
  const isBattery = activeProductCategoryName.trim().toLowerCase() === 'battery';
  const isDispenser = activeProductCategoryName.trim().toLowerCase() === 'fuel dispenser';
  const isTires = activeProductCategoryName.trim().toLowerCase() === 'tires';

  // Modal spec tab title
  const getSpecTabLabel = () => {
    if (isLPG) return 'LPG Guidelines';
    if (isFuel) return 'Available Volumes';
    if (isTank) return 'Available Storage Capacities';
    return 'Specifications';
  };

  // Render modal spec content
  const renderModalSpecs = (p: Product) => {
    if (isLPG && p.features && p.features.length) {
      return (
        <ul className="lpg-guidelines-list">
          {p.features.map((f, i) => (
            <li key={i}>
              <Shield size={16} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (p.specsTable) {
      return (
        <div className="rich-specs-wrapper">
          <table className="rich-specs-table">
            <thead>
              <tr className="group-row">
                {TIRE_GROUPS.map((g, i) => (
                  <th key={i} colSpan={g.span}>{g.label}</th>
                ))}
              </tr>
              <tr className="sub-row">
                {TIRE_SUB.map((sh, i) => (
                  <th key={i}>{sh}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.specsTable.rows.map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, cidx) => (
                    <td key={cidx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (p.specs && Object.keys(p.specs).length > 0) {
      return (
        <table className="specs-table">
          <tbody>
            {Object.entries(p.specs).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  // Modal features display list source
  const featSource = isLPG ? (activeProduct?.keyFeatures || []) : (activeProduct?.features || []);
  const showFeaturesSection = (isFuel || isTank || isBattery || isDispenser || isLPG || isTires) && featSource.length > 0;

  // Contact parameters helper
  const getContactUrl = (p: Product) => {
    const categoryQueryName = activeProductCategoryName;
    const brandQueryName = activeProductBrandName || p.brand;
    return `/contact?product=${encodeURIComponent(p.name)}&category=${encodeURIComponent(categoryQueryName)}&brand=${encodeURIComponent(brandQueryName)}`;
  };

  return (
    <div className="catalog-container-inner">
      {activeProduct ? (
        /* FULL-PAGE PRODUCT DETAILS TAKE OVER */
        <div className="detail-view fade-in">
          <div className="modal-close-bar detail-close-bar">
            <button className="back-btn" onClick={closeModal} title="Back to Products" aria-label="Back to Products">
              <ArrowLeft size={14} /> Back to Products
            </button>
          </div>
          <div className="modal-breadcrumb detail-breadcrumb">
            <a href="/">Home</a>
            <ChevronRight size={12} />
            <a href="#" onClick={(e) => { e.preventDefault(); closeModal(); }}>Products</a>
            <ChevronRight size={12} />
            <span className="bc-current">{activeProductCategoryName}</span>
            <ChevronRight size={12} />
            <span className="bc-current">{activeProduct.name}</span>
          </div>

          <div className="product-detail-section detail-section-wrapper">
            <div className="product-detail-grid">
              {/* GALLERY */}
              <div className="product-gallery">
                <div className="gallery-main">
                  <img 
                    src={activeProduct.images[activeImageIndex] || activeProduct.image} 
                    alt={activeProduct.name} 
                  />
                </div>
                {activeProduct.images.length > 1 && (
                  <div className="gallery-thumbs">
                    {activeProduct.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`gallery-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img src={img} alt={`${activeProduct.name} thumb ${idx}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="product-info">
                <span className="product-category-tag">{activeProductCategoryName}</span>
                <h1 className="product-title">{activeProduct.name}</h1>
                
                {/* Hide descriptions for Truck category in details view */}
                {!isTruck && activeProduct.desc && (
                  <p className="product-description">{activeProduct.desc}</p>
                )}

                <div className="product-meta">
                  <div className="meta-item">
                    <span className="meta-label">Brand:</span>
                    <span className="meta-value">{activeProductBrandName || activeProduct.brand}</span>
                  </div>

                  {/* Size metadata logic */}
                  {!isFuel && !isTank && !isLPG && !isTruck && !isDispenser && !isTires && activeProduct.size && (
                    <div className="meta-item">
                      <span className="meta-label">Size/Model:</span>
                      <span className="meta-value">{activeProduct.size}</span>
                    </div>
                  )}

                  {isBattery && activeProduct.specs?.['Voltage'] && (
                    <div className="meta-item">
                      <span className="meta-label">Voltage:</span>
                      <span className="meta-value">{activeProduct.specs['Voltage']}</span>
                    </div>
                  )}

                  {activeProduct.warranty && activeProduct.warranty !== 'N/A' && (
                    <div className="meta-item">
                      <span className="meta-label">Warranty:</span>
                      <span className="meta-value">{activeProduct.warranty}</span>
                    </div>
                  )}

                  <div className="meta-item">
                    <span className="meta-label">Availability:</span>
                    <span className="meta-value stock-in-stock">In Stock</span>
                  </div>
                </div>

                {/* Features display */}
                {showFeaturesSection && (
                  <div className="product-features">
                    <h3 className="features-title">Key Features</h3>
                    <ul className="features-list">
                      {featSource.map((f, i) => (
                        <li key={i}>
                          <CheckCircle size={14} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="product-actions">
                  <a href={getContactUrl(activeProduct)} className="action-btn btn-primary">
                    <Mail size={16} /> Request Quote
                  </a>
                  <a href="/contact" className="action-btn btn-outline">
                    <Phone size={16} /> Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ADDITIONAL INFO TABS */}
          {(activeProduct.specsTable || (activeProduct.specs && Object.keys(activeProduct.specs).length > 0) || (isLPG && activeProduct.features?.length)) && (
            <div className="additional-info-section">
              <div className="info-tabs">
                <div 
                  className={`info-tab ${activeTab === 'detailSpecs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('detailSpecs')}
                >
                  {getSpecTabLabel()}
                </div>
              </div>
              <div className="info-content">
                <div className={`info-panel ${activeTab === 'detailSpecs' ? 'active' : ''}`}>
                  {renderModalSpecs(activeProduct)}
                </div>
              </div>
            </div>
          )}

          {/* RELATED PRODUCTS */}
          <div className="related-section related-section-wrap">
            <h2 className="related-title">Related Products</h2>
            <div className="related-grid">
              {getRelatedProducts(activeProduct).map((relProd, i) => (
                <RelatedCard
                  key={i}
                  product={relProd}
                  onClick={() => {
                    let relCatName = activeProductCategoryName;
                    let relBrandName = activeProductBrandName;
                    
                    for (const catKey in productData) {
                      const catVal = productData[catKey];
                      if (catVal.hasBrands && catVal.brandProducts) {
                        for (const brandKey in catVal.brandProducts) {
                          const brandProds = catVal.brandProducts[brandKey];
                          if (brandProds.some(bp => bp.name === relProd.name)) {
                            relCatName = catVal.name;
                            const brandObj = brandData[catKey]?.find(b => b.id === brandKey);
                            relBrandName = brandObj?.name || relProd.brand;
                            break;
                          }
                        }
                      } else {
                        if ((catVal.products || []).some(pr => pr.name === relProd.name)) {
                          relCatName = catVal.name;
                          relBrandName = relProd.brand;
                          break;
                        }
                      }
                    }

                    setActiveProduct(relProd);
                    setActiveProductCategoryName(relCatName);
                    setActiveProductBrandName(relBrandName);
                    setActiveImageIndex(0);
                    setActiveTab('detailSpecs');
                    scrollUp();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* SELECTION BAR CARD */}
          <div className="category-card fade-in">
            <div className="category-header">
              <ShoppingBag size={24} className="category-header-icon" />
              <h2>Select Product Category</h2>
            </div>
            <div className="category-select-wrap">
              <div className="select-box-wrap">
                <label className="category-label" htmlFor="productSearch">Search Products:</label>
                <div className="search-input-container">
                  <input 
                    type="search" 
                    id="productSearch" 
                    className="category-select" 
                    placeholder="Type to search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="search-icon" size={16} />
                </div>
              </div>
              <div className="select-box-wrap">
                <label className="category-label" htmlFor="categorySelect">Choose Category:</label>
                <select 
                  id="categorySelect" 
                  className="category-select"
                  value={selectedCategoryKey}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a Category</option>
                  <optgroup label="Automotive Products">
                    <option value="tires">Tires</option>
                    <option value="battery">Battery</option>
                    <option value="fuel">Fuel</option>
                  </optgroup>
                  <optgroup label="Equipment &amp; Vehicles">
                    <option value="fuel_storage_tank">Tanks</option>
                    <option value="fuel_dispenser">Fuel Dispenser</option>
                    <option value="lpg">LPG</option>
                    <option value="sinotruk">Trucks</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          {/* BRANDS SELECTION PANEL */}
          {selectedCategoryKey && showBrandsGrid && (
            <div className="section-wrapper">
              <SectionNav
                title={`Select ${productData[selectedCategoryKey]?.name} Brand`}
                onBack={resetAll}
                backLabel="Back"
              />
              <div className="cards-grid-3 fade-in">
                {(brandData[selectedCategoryKey] || []).map((brand) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    onSelectBrand={() => {
                      setSelectedBrandId(brand.id);
                      scrollUp();
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* PRODUCTS DISPLAY PANEL */}
          {selectedCategoryKey && !showBrandsGrid && (
            <div className="section-wrapper">
              <SectionNav
                title={
                  selectedBrandId 
                    ? `${brandData[selectedCategoryKey]?.find(b => b.id === selectedBrandId)?.name} ${productData[selectedCategoryKey]?.name}`
                    : `${productData[selectedCategoryKey]?.name}s`
                }
                onBack={goBackFromProducts}
                backLabel={productData[selectedCategoryKey]?.hasBrands ? 'Back to Brands' : 'Back'}
              />
              
              {displayedProducts.length === 0 ? (
                <EmptyState title="No products found" text="Try adjusting your search criteria" />
              ) : (
                <div className={getGridClass()}>
                  {displayedProducts.map((item, i) => {
                    let cardLayoutClass = 'ix-card';
                    if (selectedCategoryKey === 'fuel_storage_tank') cardLayoutClass += ' fuel-storage-card';
                    else if (selectedCategoryKey === 'fuel') cardLayoutClass += ' fuel-card';
                    else if (selectedCategoryKey === 'fuel_dispenser') cardLayoutClass += ' fuel-dispenser-card';

                    return (
                      <ProductCard
                        key={i}
                        product={item.p}
                        layoutClass={cardLayoutClass}
                        onViewDetails={() => openModal(item.p, item.catName, item.brandName)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SEARCHING ON EMPTY STATE RESETS OR MULTI-CATEGORY VIEW */}
          {!selectedCategoryKey && (
            <div className="section-wrapper">
              <SectionNav
                title={searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
                onBack={searchTerm ? resetAll : undefined}
                backLabel="Clear"
              />

              {displayedProducts.length === 0 ? (
                <EmptyState
                  title="No products match your search"
                  text='Try searching for other terms like "LPG", "Tire", "Howo" or brand names like "Compasal"'
                />
              ) : (
                <div className="cards-grid-4 fade-in">
                  {displayedProducts.map((item, i) => (
                    <ProductCard
                      key={i}
                      product={item.p}
                      categoryName={item.catName}
                      variant="search"
                      onViewDetails={() => openModal(item.p, item.catName, item.brandName)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
