#!/bin/bash
#
# Apollo Hologram Euystacio - System Initialization Script
# 
# This script initializes the Apollo Hologram Euystacio framework,
# performs health checks, and prepares the system for operation.
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
LOG_FILE="${ROOT_DIR}/logs/init.log"

# Ensure logs directory exists
mkdir -p "${ROOT_DIR}/logs"

# Logging function
log() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${timestamp} [${level}] ${message}" | tee -a "$LOG_FILE"
}

# Header
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           APOLLO HOLOGRAM EUYSTACIO INITIALIZATION           ║"
echo "║                    Framework Version 1.0.0                    ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Phase 1: Environment Check
log "INFO" "Phase 1: Checking environment..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js detected: ${NODE_VERSION}"
    log "INFO" "Node.js version: ${NODE_VERSION}"
else
    echo -e "${YELLOW}!${NC} Node.js not found (optional for browser-only deployment)"
    log "WARN" "Node.js not installed"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm detected: ${NPM_VERSION}"
    log "INFO" "npm version: ${NPM_VERSION}"
else
    echo -e "${YELLOW}!${NC} npm not found (optional for browser-only deployment)"
    log "WARN" "npm not installed"
fi

# Phase 2: Directory Structure Verification
log "INFO" "Phase 2: Verifying directory structure..."

REQUIRED_DIRS=(
    "src/core"
    "src/modules"
    "src/utils"
    "config"
    "dashboard"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "${ROOT_DIR}/${dir}" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: ${dir}"
    else
        echo -e "${YELLOW}!${NC} Creating directory: ${dir}"
        mkdir -p "${ROOT_DIR}/${dir}"
        log "INFO" "Created directory: ${dir}"
    fi
done

# Phase 3: Core Module Verification
log "INFO" "Phase 3: Verifying core modules..."

CORE_MODULES=(
    "src/core/euystacio-principles.js"
    "src/core/adaptive-intelligence-core.js"
    "src/core/global-governance-infrastructure.js"
    "src/core/apollo-hologram.js"
)

ALL_MODULES_PRESENT=true
for module in "${CORE_MODULES[@]}"; do
    if [ -f "${ROOT_DIR}/${module}" ]; then
        echo -e "${GREEN}✓${NC} Module present: ${module}"
    else
        echo -e "${RED}✗${NC} Module missing: ${module}"
        ALL_MODULES_PRESENT=false
        log "ERROR" "Missing module: ${module}"
    fi
done

if [ "$ALL_MODULES_PRESENT" = false ]; then
    echo -e "${RED}ERROR: Core modules are missing. Please run installation first.${NC}"
    exit 1
fi

# Phase 4: Configuration Check
log "INFO" "Phase 4: Checking configuration..."

if [ -f "${ROOT_DIR}/config/apollo-config.json" ]; then
    echo -e "${GREEN}✓${NC} Configuration file present"
else
    echo -e "${YELLOW}!${NC} Creating default configuration..."
    cat > "${ROOT_DIR}/config/apollo-config.json" << 'EOF'
{
  "name": "Apollo Hologram Euystacio",
  "version": "1.0.0",
  "mode": "interactive",
  "principles": {
    "OLF": { "enabled": true, "priority": 1 },
    "NSR": { "enabled": true, "priority": 2 },
    "RED_CODE": { "enabled": true, "priority": 0 }
  },
  "aic": {
    "learningRate": 0.01,
    "emotionalResonance": true,
    "predictiveModeling": true
  },
  "ggi": {
    "auditEnabled": true,
    "vetoLatency": 3,
    "complianceTracking": true
  },
  "metrics": {
    "TRE_target": 1.5,
    "ISF_target": 0.90,
    "PV_threshold": 10,
    "TAP_target": 100
  }
}
EOF
    log "INFO" "Created default configuration"
fi

# Phase 5: Syntax Validation
log "INFO" "Phase 5: Validating JavaScript syntax..."

if command -v node &> /dev/null; then
    SYNTAX_OK=true
    for module in "${CORE_MODULES[@]}"; do
        if node --check "${ROOT_DIR}/${module}" 2>/dev/null; then
            echo -e "${GREEN}✓${NC} Syntax valid: ${module}"
        else
            echo -e "${RED}✗${NC} Syntax error: ${module}"
            SYNTAX_OK=false
            log "ERROR" "Syntax error in ${module}"
        fi
    done
    
    if [ "$SYNTAX_OK" = false ]; then
        echo -e "${RED}ERROR: Syntax errors detected. Please fix before proceeding.${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}!${NC} Skipping syntax validation (Node.js not available)"
fi

# Phase 6: Generate initialization status
log "INFO" "Phase 6: Generating initialization status..."

INIT_STATUS="${ROOT_DIR}/logs/init-status.json"
cat > "$INIT_STATUS" << EOF
{
  "timestamp": "$(date -u '+%Y-%m-%dT%H:%M:%SZ')",
  "status": "initialized",
  "version": "1.0.0",
  "components": {
    "principles": "ready",
    "aic": "ready",
    "ggi": "ready",
    "nexus": "ready"
  },
  "environment": {
    "node": "${NODE_VERSION:-not_installed}",
    "npm": "${NPM_VERSION:-not_installed}"
  }
}
EOF

echo -e "${GREEN}✓${NC} Initialization status saved"

# Summary
echo ""
echo -e "${BLUE}══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}INITIALIZATION COMPLETE${NC}"
echo -e "${BLUE}══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Apollo Hologram Euystacio is ready."
echo ""
echo "Core Components:"
echo "  • Euystacio Principles (OLF, NSR, Red Code): Active"
echo "  • Adaptive Intelligence Core (AIC): Active"
echo "  • Global Governance Infrastructure (GGI): Active"
echo ""
echo "Next steps:"
echo "  1. Open index.html in a browser for the interactive dashboard"
echo "  2. Use 'npm start' if running a local development server"
echo "  3. Run 'scripts/test.sh' to validate framework functionality"
echo ""
log "INFO" "Initialization completed successfully"
