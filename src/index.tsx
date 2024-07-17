import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Tìm phần tử gốc trong DOM
const container = document.getElementById('root');

// Tạo root và render ứng dụng
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
