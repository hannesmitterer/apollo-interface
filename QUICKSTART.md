# Quick Start Guide

## For Developers

### First Time Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173/apollo-interface/ in your browser.

### Development Workflow

1. **Make changes** to files in `src/`
2. **See changes** immediately (hot reload enabled)
3. **Test locally** before committing
4. **Build** when ready: `npm run build`
5. **Commit and push** to deploy

### Project Structure

```
src/
├── main.tsx          # Entry point
├── App.tsx           # Main application
├── App.css           # Application styles
├── index.css         # Global styles
└── components/
    └── HologramScene.tsx  # 3D hologram visualization
```

### Available Commands

```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Making Changes

1. **Edit React components** in `src/`
2. **Edit styles** in `.css` files
3. **Test locally** with `npm run dev`
4. **Verify build** with `npm run build`
5. **Push to deploy** to GitHub Pages

### Deployment

Deployment is automatic:
- Push to `main` branch → Auto-deploys to GitHub Pages
- View live at: https://hannesmitterer.github.io/apollo-interface/

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment information.

### Need Help?

- 📖 [Full Deployment Guide](./DEPLOYMENT.md)
- 📚 [Main README](./README.md)
- 🔧 [Vite Documentation](https://vitejs.dev)
- ⚛️ [React Documentation](https://react.dev)
