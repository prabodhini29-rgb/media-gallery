import { useState } from 'react'
import './App.css'
import './index.css'

const IMAGE_DATA = [
  { id: 1, title: 'Dogs', category: 'Animals', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0c3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, title: 'Summer', category: 'Season', url: 'https://plus.unsplash.com/premium_photo-1749544308300-cf3b5cfb0070?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8dnlaY0lzeUh2WjB8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, title: 'Travel', category: 'Adventure', url: 'https://images.unsplash.com/photo-1780503779063-7cd399dfe7b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D' },
  { id: 4, title: 'Skies', category: 'Nature', url: 'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNraWVzfGVufDB8fDB8fHww' },
  { id: 5, title: 'Mountains', category: 'Nature', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW5zfGVufDB8fDB8fHww' },
  { id: 6, title: 'Forest', category: 'Nature', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 7, title: 'Beach', category: 'Adventure', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8' },
  { id: 8, title: 'Cats', category: 'Animals', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 9, title: 'Winter', category: 'Season', url: 'https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyfGVufDB8fDB8fHww' },  
  { id: 10, title: 'Autumn', category: 'Season', url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXV0dW18ZW58MHx8MHx8fDA%3D' },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 
  const [sortType, setSortType] = useState("A-Z");

  const filteredImages = IMAGE_DATA.filter((image) => {
    const matchesCategory = activeCategory === 'All' || image.category === activeCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  filteredImages.sort((a, b) => {
    if (sortType === "A-Z") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const previousImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const previousIndex =
      (currentIndex - 1 + filteredImages.length) %
      filteredImages.length;
    setSelectedImage(filteredImages[previousIndex]);
  };

  return (
    <div className="gallery-container">
      <h1>Media Gallery</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search images by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="sort-dropdown"
        >
          <option value="A-Z">Sort A-Z</option>
          <option value="Z-A">Sort Z-A</option>
        </select>
      </div>

      <div className="tabs-section">
        <button 
        onClick={() => setActiveCategory("All")}
        className={activeCategory === "All" ? "tab-btn active" : "tab-btn"}
        > All </button>

        <button 
        onClick={() => setActiveCategory("Nature")}
        className={activeCategory === "Nature" ? "tab-btn active" : "tab-btn"}
        > Nature </button>

        <button 
        onClick={() => setActiveCategory("Adventure")}
        className={activeCategory === "Adventure" ? "tab-btn active" : "tab-btn"}
        > Adventure </button>
        
        <button 
        onClick={() => setActiveCategory("Animals")}
        className={activeCategory === "Animals" ? "tab-btn active" : "tab-btn"}
        > Animals </button>

        <button 
        onClick={() => setActiveCategory("Season")}
        className={activeCategory === "Season" ? "tab-btn active" : "tab-btn"}
        > Season </button>
      </div>

      <div className="image-grid">
        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            className="image-card"
            onClick={() => setSelectedImage(image)} 
          >
            <img src={image.url} alt={image.title} />
            <div className="image-info">
              <h3>{image.title}</h3>
              <span>{image.category}</span>
            </div>
          </div>
        ))}
        {filteredImages.length === 0 && <p className="no-results">No results found!</p>}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.url} alt={selectedImage.title} className="modal-img" />
            <h2>{selectedImage.title}</h2>
            <p>{selectedImage.category}</p>
            <div className="modal-buttons">
              <button onClick={previousImage}>Previous</button>
              <button onClick={nextImage}>Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
