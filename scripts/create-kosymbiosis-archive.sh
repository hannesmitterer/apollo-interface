#!/bin/bash
#
# KOSYMBIOSIS Archive Creation Script
# 
# This script creates the final KOSYMBIOSIS archive with checksums and
# prepares for triple-signature verification.
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
KOSYMBIOSIS_DIR="${ROOT_DIR}/KOSYMBIOSIS"
ARCHIVE_NAME="kosymbiosis-v1.0.0"
ARCHIVE_FILE="${ROOT_DIR}/${ARCHIVE_NAME}.zip"
CHECKSUM_FILE="${ROOT_DIR}/${ARCHIVE_NAME}.checksum.sha256"

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         KOSYMBIOSIS ARCHIVE CREATION AND SEALING             ║"
echo "║                    Version 1.0.0                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Phase 1: Verify KOSYMBIOSIS directory exists
echo -e "${BLUE}Phase 1: Verifying KOSYMBIOSIS directory...${NC}"

if [ ! -d "$KOSYMBIOSIS_DIR" ]; then
    echo -e "${RED}✗ KOSYMBIOSIS directory not found at $KOSYMBIOSIS_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}✓ KOSYMBIOSIS directory found${NC}"

# Phase 2: Verify required files
echo -e "\n${BLUE}Phase 2: Verifying required files...${NC}"

REQUIRED_FILES=(
    "README.md"
    "artifacts/euystacio-principles.js"
    "artifacts/adaptive-intelligence-core.js"
    "artifacts/global-governance-infrastructure.js"
    "artifacts/apollo-hologram.js"
    "artifacts/qek-ethics-validator.js"
    "metadata/project-metadata.json"
    "declarations/ethical-declaration.md"
    "logs/archive-log.md"
)

ALL_FILES_PRESENT=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "${KOSYMBIOSIS_DIR}/${file}" ]; then
        echo -e "${GREEN}✓ ${file}${NC}"
    else
        echo -e "${RED}✗ Missing: ${file}${NC}"
        ALL_FILES_PRESENT=false
    fi
done

if [ "$ALL_FILES_PRESENT" = false ]; then
    echo -e "${RED}ERROR: Required files are missing.${NC}"
    exit 1
fi

# Phase 3: Create ZIP archive
echo -e "\n${BLUE}Phase 3: Creating ZIP archive...${NC}"

# Remove old archive if exists
if [ -f "$ARCHIVE_FILE" ]; then
    echo -e "${YELLOW}Removing existing archive...${NC}"
    rm "$ARCHIVE_FILE"
fi

# Create archive
cd "$ROOT_DIR"
zip -r "$ARCHIVE_FILE" KOSYMBIOSIS/ -x "*.DS_Store" "**/.*" > /dev/null

if [ -f "$ARCHIVE_FILE" ]; then
    ARCHIVE_SIZE=$(du -h "$ARCHIVE_FILE" | cut -f1)
    echo -e "${GREEN}✓ Archive created: ${ARCHIVE_NAME}.zip (${ARCHIVE_SIZE})${NC}"
else
    echo -e "${RED}✗ Failed to create archive${NC}"
    exit 1
fi

# Phase 4: Generate SHA-256 checksum
echo -e "\n${BLUE}Phase 4: Generating SHA-256 checksum...${NC}"

CHECKSUM=$(sha256sum "$ARCHIVE_FILE" | awk '{print $1}')
echo "$CHECKSUM  ${ARCHIVE_NAME}.zip" > "$CHECKSUM_FILE"

echo -e "${GREEN}✓ Checksum generated${NC}"
echo -e "   SHA-256: ${CHECKSUM}"

# Phase 5: Prepare signature files (placeholders for GPG signatures)
echo -e "\n${BLUE}Phase 5: Preparing signature files...${NC}"

cat > "${ROOT_DIR}/${ARCHIVE_NAME}.sig" << EOF
-----BEGIN PGP SIGNATURE-----
Comment: KOSYMBIOSIS Archive - Primary Architect Signature
Comment: This is a placeholder signature for demonstration purposes
Comment: In production, replace with actual GPG signature

Archive: ${ARCHIVE_NAME}.zip
SHA-256: ${CHECKSUM}
Date: $(date -u '+%Y-%m-%dT%H:%M:%SZ')
Signer: Primary Architect
Role: Design and Implementation

To generate actual signature, use:
gpg --detach-sign --armor -o ${ARCHIVE_NAME}.sig ${ARCHIVE_NAME}.zip
-----END PGP SIGNATURE-----
EOF

cat > "${ROOT_DIR}/${ARCHIVE_NAME}-co1.sig" << EOF
-----BEGIN PGP SIGNATURE-----
Comment: KOSYMBIOSIS Archive - Ethics Validator Signature
Comment: This is a placeholder signature for demonstration purposes
Comment: In production, replace with actual GPG signature

Archive: ${ARCHIVE_NAME}.zip
SHA-256: ${CHECKSUM}
Date: $(date -u '+%Y-%m-%dT%H:%M:%SZ')
Signer: Ethics Validator
Role: Ethical Compliance Verification

To generate actual signature, use:
gpg --detach-sign --armor -o ${ARCHIVE_NAME}-co1.sig ${ARCHIVE_NAME}.zip
-----END PGP SIGNATURE-----
EOF

cat > "${ROOT_DIR}/${ARCHIVE_NAME}-co2.sig" << EOF
-----BEGIN PGP SIGNATURE-----
Comment: KOSYMBIOSIS Archive - Technical Reviewer Signature
Comment: This is a placeholder signature for demonstration purposes
Comment: In production, replace with actual GPG signature

Archive: ${ARCHIVE_NAME}.zip
SHA-256: ${CHECKSUM}
Date: $(date -u '+%Y-%m-%dT%H:%M:%SZ')
Signer: Technical Reviewer
Role: Security and Quality Verification

To generate actual signature, use:
gpg --detach-sign --armor -o ${ARCHIVE_NAME}-co2.sig ${ARCHIVE_NAME}.zip
-----END PGP SIGNATURE-----
EOF

echo -e "${GREEN}✓ Created signature files:${NC}"
echo -e "   - ${ARCHIVE_NAME}.sig (Primary Architect)"
echo -e "   - ${ARCHIVE_NAME}-co1.sig (Ethics Validator)"
echo -e "   - ${ARCHIVE_NAME}-co2.sig (Technical Reviewer)"

# Phase 6: Create verification script
echo -e "\n${BLUE}Phase 6: Creating verification script...${NC}"

cat > "${ROOT_DIR}/verify-${ARCHIVE_NAME}.sh" << 'VERIFY_SCRIPT_EOF'
#!/bin/bash
#
# KOSYMBIOSIS Archive Verification Script
#

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

ARCHIVE_NAME="kosymbiosis-v1.0.0"

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           KOSYMBIOSIS ARCHIVE VERIFICATION                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if archive exists
if [ ! -f "${ARCHIVE_NAME}.zip" ]; then
    echo -e "${RED}✗ Archive not found: ${ARCHIVE_NAME}.zip${NC}"
    exit 1
fi

# Verify checksum
echo -e "${BLUE}Verifying SHA-256 checksum...${NC}"
if sha256sum -c "${ARCHIVE_NAME}.checksum.sha256" 2>/dev/null; then
    echo -e "${GREEN}✓ Checksum verification PASSED${NC}"
else
    echo -e "${RED}✗ Checksum verification FAILED${NC}"
    exit 1
fi

# Check signature files
echo -e "\n${BLUE}Checking signature files...${NC}"
SIGNATURES=(
    "${ARCHIVE_NAME}.sig"
    "${ARCHIVE_NAME}-co1.sig"
    "${ARCHIVE_NAME}-co2.sig"
)

ALL_SIGS_PRESENT=true
for sig in "${SIGNATURES[@]}"; do
    if [ -f "$sig" ]; then
        echo -e "${GREEN}✓ Found: $sig${NC}"
    else
        echo -e "${RED}✗ Missing: $sig${NC}"
        ALL_SIGS_PRESENT=false
    fi
done

if [ "$ALL_SIGS_PRESENT" = false ]; then
    echo -e "${RED}WARNING: Not all signature files are present${NC}"
fi

# Note about GPG verification
echo -e "\n${BLUE}Note on GPG Signature Verification:${NC}"
echo "The signature files are placeholders for demonstration."
echo "In production, verify with:"
echo "  gpg --verify ${ARCHIVE_NAME}.sig ${ARCHIVE_NAME}.zip"
echo "  gpg --verify ${ARCHIVE_NAME}-co1.sig ${ARCHIVE_NAME}.zip"
echo "  gpg --verify ${ARCHIVE_NAME}-co2.sig ${ARCHIVE_NAME}.zip"

echo -e "\n${GREEN}✓ Verification complete${NC}"
VERIFY_SCRIPT_EOF

chmod +x "${ROOT_DIR}/verify-${ARCHIVE_NAME}.sh"
echo -e "${GREEN}✓ Verification script created: verify-${ARCHIVE_NAME}.sh${NC}"

# Phase 7: Create IPFS upload documentation
echo -e "\n${BLUE}Phase 7: Creating IPFS upload documentation...${NC}"

cat > "${ROOT_DIR}/ipfs-distribution.md" << EOF
# KOSYMBIOSIS IPFS Distribution

## Upload to IPFS

To upload the KOSYMBIOSIS archive to IPFS, use one of the following methods:

### Method 1: Using IPFS Desktop or CLI

\`\`\`bash
# Add the archive to IPFS
ipfs add ${ARCHIVE_NAME}.zip

# Pin the file for persistence
ipfs pin add <CID>
\`\`\`

### Method 2: Using Pinata (Web Interface)

1. Visit https://pinata.cloud
2. Upload ${ARCHIVE_NAME}.zip
3. Note the CID provided

### Method 3: Using web3.storage

\`\`\`bash
# Install w3 CLI
npm install -g @web3-storage/w3cli

# Upload file
w3 up ${ARCHIVE_NAME}.zip
\`\`\`

## IPFS Gateway Access

Once uploaded, the archive will be accessible via multiple IPFS gateways:

- \`https://ipfs.io/ipfs/<CID>\`
- \`https://gateway.pinata.cloud/ipfs/<CID>\`
- \`https://cloudflare-ipfs.com/ipfs/<CID>\`
- \`https://dweb.link/ipfs/<CID>\`

## Updating Documentation

After uploading to IPFS, update the following files with the actual CID:

1. \`KOSYMBIOSIS/README.md\` - Add CID in IPFS Distribution section
2. \`KOSYMBIOSIS/metadata/project-metadata.json\` - Add CID to distribution.ipfs
3. GitHub Release description - Include IPFS CID

## Verification

Verify the IPFS upload by:

\`\`\`bash
# Download from IPFS
ipfs get <CID>

# Verify checksum matches
sha256sum <CID>
\`\`\`

Compare the checksum with the value in ${ARCHIVE_NAME}.checksum.sha256
EOF

echo -e "${GREEN}✓ IPFS documentation created: ipfs-distribution.md${NC}"

# Phase 8: Summary
echo -e "\n${BLUE}══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}ARCHIVE CREATION COMPLETE${NC}"
echo -e "${BLUE}══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Generated files:"
echo "  ✓ ${ARCHIVE_NAME}.zip - Main archive (${ARCHIVE_SIZE})"
echo "  ✓ ${ARCHIVE_NAME}.checksum.sha256 - SHA-256 checksum"
echo "  ✓ ${ARCHIVE_NAME}.sig - Primary Architect signature"
echo "  ✓ ${ARCHIVE_NAME}-co1.sig - Ethics Validator signature"
echo "  ✓ ${ARCHIVE_NAME}-co2.sig - Technical Reviewer signature"
echo "  ✓ verify-${ARCHIVE_NAME}.sh - Verification script"
echo "  ✓ ipfs-distribution.md - IPFS upload guide"
echo ""
echo "Next steps:"
echo "  1. Run verification: ./verify-${ARCHIVE_NAME}.sh"
echo "  2. Upload to IPFS (see ipfs-distribution.md)"
echo "  3. Create GitHub release with all files"
echo "  4. Update documentation with IPFS CID"
echo ""
echo -e "${GREEN}KOSYMBIOSIS archive is ready for distribution!${NC}"
