# Deployment Guide - Apollo Hologram Euystacio

## Overview

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a build and deployment workflow.

## Live Site

🌐 **Production URL:** https://hannesmitterer.github.io/apollo-interface/

## Deployment Architecture

### Automated Workflow

The deployment is handled by `.github/workflows/deploy.yml` which:

1. **Triggers on:**
   - Push to `main` branch
   - Manual workflow dispatch

2. **Build Process:**
   - Sets up Node.js 20
   - Installs dependencies (`npm ci`)
   - Builds the project using Vite (`npm run build`)
   - Outputs to `dist/` directory

3. **Deployment:**
   - Uploads build artifacts
   - Deploys to GitHub Pages
   - Uses `upload-pages-artifact@v3` and `deploy-pages@v4`

### Technology Stack

- **Build Tool:** Vite 5.0
- **Framework:** React 18.2
- **3D Graphics:** Three.js 0.160, React Three Fiber 8.15
- **Language:** TypeScript 5.3
- **Deployment:** GitHub Pages

## Local Development

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/hannesmitterer/apollo-interface.git
cd apollo-interface

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173/apollo-interface/`

### Build Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Production Build

### Build Configuration

The production build is configured in `vite.config.ts`:

- **Base URL:** `/apollo-interface/` (GitHub Pages repository path)
- **Output Directory:** `dist/`
- **Code Splitting:** Vendor chunks for React and Three.js
- **Asset Optimization:** Minification and tree-shaking enabled

### Build Output

```
dist/
├── index.html              # Entry point
└── assets/
    ├── index-[hash].css    # Main styles
    ├── index-[hash].js     # Application code
    ├── react-vendor-[hash].js   # React & React DOM (~141 KB)
    └── three-vendor-[hash].js   # Three.js libraries (~815 KB)
```

## Deployment Process

### Automatic Deployment

1. Make changes to the code
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Actions automatically builds and deploys
4. Check deployment status in the "Actions" tab
5. Site is live at https://hannesmitterer.github.io/apollo-interface/

### Manual Deployment

To manually trigger a deployment:

1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Deploy to GitHub Pages" workflow
4. Click "Run workflow"
5. Select branch (usually `main`)
6. Click "Run workflow"

## Monitoring Deployment

### GitHub Actions

View deployment status:
- Go to: https://github.com/hannesmitterer/apollo-interface/actions
- Look for "Deploy to GitHub Pages" workflows
- Click on a run to see logs

### Deployment Status

Each deployment shows:
- Build time
- Build logs
- Deployment status
- Live URL

### Common Issues and Solutions

#### Build Fails

**Issue:** Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force
npm install
```

**Issue:** TypeScript errors
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

#### Deployment Fails

**Issue:** Permission denied
- Ensure GitHub Pages is enabled in repository settings
- Verify workflow has proper permissions (set in workflow file)

**Issue:** 404 on deployed site
- Verify base path is `/apollo-interface/` in `vite.config.ts`
- Check that GitHub Pages source is set to "GitHub Actions"

## Repository Settings

### GitHub Pages Configuration

Required settings in GitHub repository:

1. Go to Settings → Pages
2. Source: **GitHub Actions**
3. Custom domain: (optional)

### Workflow Permissions

The workflow requires these permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## Testing Before Deployment

### Local Build Test

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Visit `http://localhost:4173/apollo-interface/` to test the production build locally.

### Validation Checklist

- [ ] All dependencies install without errors
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] All components render correctly
- [ ] 3D hologram visualization works
- [ ] Chat interface is functional
- [ ] Asset paths use correct base URL
- [ ] No console errors in browser

## Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Rebuilding After Changes

After modifying code:
1. Test locally with `npm run dev`
2. Build with `npm run build`
3. Preview with `npm run preview`
4. Commit and push to deploy

## Troubleshooting

### Clear Build Cache

```bash
# Remove build artifacts
rm -rf dist/
rm -rf node_modules/

# Reinstall
npm install
npm run build
```

### Verify Vite Configuration

Check `vite.config.ts` has correct base path:
```typescript
export default defineConfig({
  base: '/apollo-interface/',
  // ...
})
```

### Check GitHub Actions Logs

1. Go to Actions tab
2. Click on failed workflow
3. Expand job steps
4. Review error messages

## Performance Optimization

Current optimizations:
- Code splitting (vendor chunks)
- Asset minification
- Tree shaking
- Lazy loading of components

To further optimize:
- Use dynamic imports for large components
- Optimize images and assets
- Enable compression in hosting

## Security

- Dependencies are audited on installation
- GitHub Actions runs in isolated environment
- No secrets or API keys in code
- All deployments are public (GitHub Pages)

## Support

For issues or questions:
1. Check this deployment guide
2. Review GitHub Actions logs
3. Check repository Issues
4. Consult Vite documentation: https://vitejs.dev

---

**Last Updated:** January 2026
**Maintained by:** Apollo Hologram Euystacio Team
