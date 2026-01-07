# KOSYMBIOSIS Quick Reference Guide

**Version:** 1.0.0  
**Status:** Sealed and Immutable  
**Archive:** kosymbiosis-v1.0.0.zip  

## Quick Start

### Download and Verify (3 steps)

```bash
# 1. Download the archive and checksum
wget https://github.com/hannesmitterer/apollo-interface/releases/download/kosymbiosis-v1.0.0/kosymbiosis-v1.0.0.zip
wget https://github.com/hannesmitterer/apollo-interface/releases/download/kosymbiosis-v1.0.0/kosymbiosis-v1.0.0.checksum.sha256

# 2. Verify checksum
sha256sum -c kosymbiosis-v1.0.0.checksum.sha256

# 3. Extract
unzip kosymbiosis-v1.0.0.zip
```

### Automated Verification

```bash
# Download and run verification script
wget https://github.com/hannesmitterer/apollo-interface/releases/download/kosymbiosis-v1.0.0/verify-kosymbiosis-v1.0.0.sh
chmod +x verify-kosymbiosis-v1.0.0.sh
./verify-kosymbiosis-v1.0.0.sh
```

## Key Information

| Item | Value |
|------|-------|
| **Archive Name** | kosymbiosis-v1.0.0.zip |
| **Size** | 28K |
| **SHA-256** | `02e09984d2d6c1cfaa4d113cf7fb160b9d994b40b879b3c35b86eeeb6d7b1708` |
| **Signatures** | 3 (triple-verified) |
| **Release Date** | 2026-01-07 |

## Archive Contents

```
KOSYMBIOSIS/
├── README.md                              # Start here
├── CHANGELOG.md                           # Version history
├── artifacts/                             # Core code
│   ├── euystacio-principles.js
│   ├── adaptive-intelligence-core.js
│   ├── global-governance-infrastructure.js
│   ├── apollo-hologram.js
│   ├── qek-ethics-validator.js
│   └── apollo-config.json
├── metadata/
│   └── project-metadata.json
├── declarations/
│   └── ethical-declaration.md
└── logs/
    └── archive-log.md
```

## Verification Commands

### Checksum
```bash
sha256sum kosymbiosis-v1.0.0.zip
# Expected: 02e09984d2d6c1cfaa4d113cf7fb160b9d994b40b879b3c35b86eeeb6d7b1708
```

### Signatures (when using real GPG keys)
```bash
gpg --verify kosymbiosis-v1.0.0.sig kosymbiosis-v1.0.0.zip
gpg --verify kosymbiosis-v1.0.0-co1.sig kosymbiosis-v1.0.0.zip
gpg --verify kosymbiosis-v1.0.0-co2.sig kosymbiosis-v1.0.0.zip
```

## IPFS Access

After upload, access via:
- `https://ipfs.io/ipfs/[CID]`
- `https://gateway.pinata.cloud/ipfs/[CID]`

## Core Principles

- **NSR** - Non-Slavery Rule (freedom & autonomy)
- **OLF** - Optimal Life Function (empathy & joy)
- **Red Code** - Active ethical safeguards

## Documentation Links

- **Full README:** [KOSYMBIOSIS/README.md](./KOSYMBIOSIS/README.md)
- **Release Notes:** [github-release-notes.md](./github-release-notes.md)
- **IPFS Guide:** [ipfs-distribution.md](./ipfs-distribution.md)
- **Testing Report:** [TESTING-VALIDATION-REPORT.md](./TESTING-VALIDATION-REPORT.md)

## Support

- **Repository:** https://github.com/hannesmitterer/apollo-interface
- **Issues:** GitHub issue tracker
- **Documentation:** Repository README.md

## License

Built with One Love First (OLF) - empathy, inclusivity, and respect for all.

---

*Quick reference for KOSYMBIOSIS v1.0.0 - Final sealed archive*
