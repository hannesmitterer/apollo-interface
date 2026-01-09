#!/bin/bash
#
# KOSYMBIOSIS Archive Verification Script
#
# This script verifies the integrity of the KOSYMBIOSIS archive by:
# 1. Checking SHA-256 checksum
# 2. Verifying presence of all signature files
# 3. Providing instructions for GPG signature verification
#
# Usage: ./verify-kosymbiosis-v1.0.0.sh
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
