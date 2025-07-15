# Thea's Photo Gallery

A beautiful, responsive photo gallery website showcasing precious moments of Thea's journey. Built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Elegant horizontal scrolling timeline layout
- 📱 Fully responsive design for all devices
- 🎨 Soft, pastel color scheme (baby pink, lavender, mint)
- ✨ Smooth animations and transitions
- 📸 Easy photo management via JSON file
- 🗓️ Chronological sorting by date
- 💝 Beautiful header and footer with personal touches

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd thea-photos
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Adding New Photos

To add new photos to the gallery:

1. **Add the image file** to the `public/images/` folder
2. **Update the `public/photos.json` file** with the new photo information:

```json
{
  "id": 33,
  "image": "/images/your-new-photo.jpg",
  "title": "Your Photo Title",
  "date": "2024-06-15",
  "description": "A beautiful description of this moment"
}
```

### Photo JSON Structure

Each photo entry should include:

- `id`: Unique identifier (number)
- `image`: Path to the image file (relative to public folder)
- `title`: Display title for the photo
- `date`: Date in YYYY-MM-DD format
- `description`: Short description or memory

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  'baby-pink': '#FFB6C1',
  'lavender': '#E6E6FA',
  'mint': '#F0FFF0',
  'off-white': '#FDFDFD',
  'soft-blue': '#E0F2FE',
  'peach': '#FFE4E1',
}
```

### Header and Footer

Edit the following files to customize the header and footer:
- `src/components/Header.tsx` - Change Thea's name and subtitle
- `src/components/Footer.tsx` - Modify the footer message

## Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder that can be deployed to any static hosting service.

## Deployment

The built application can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Intersection Observer API** - Scroll animations
- **CSS Grid & Flexbox** - Layout

## File Structure

```
thea-photos/
├── public/
│   ├── images/          # Photo files
│   └── photos.json      # Photo metadata
├── src/
│   ├── components/      # React components
│   ├── types/          # TypeScript interfaces
│   ├── App.tsx         # Main app component
│   └── index.css       # Global styles
└── tailwind.config.js  # Tailwind configuration
```

## Contributing

This is a personal project, but feel free to use it as a template for your own photo gallery!

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with 💕 for Thea
