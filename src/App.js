import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const collageRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages(imageURLs);
  };

  const handleDownload = async () => {
    if (!collageRef.current) return;

    const canvas = await html2canvas(collageRef.current);
    const link = document.createElement('a');
    link.download = 'my-collage.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="App">
      <h1>📸 Pic Collage Maker</h1>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />

      <div className="button-group">
        <button onClick={handleDownload} disabled={images.length === 0}>
          📥 Download Collage
        </button>
      </div>

      <div className="collage" ref={collageRef}>
        {images.map((img, index) => (
          <img key={index} src={img} alt={`uploaded-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
