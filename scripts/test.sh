#!/bin/bash
#
# Apollo Hologram Euystacio - Test Script
# 
# Runs basic tests to validate the framework functionality.
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║             APOLLO HOLOGRAM EUYSTACIO TEST SUITE             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

TESTS_PASSED=0
TESTS_FAILED=0

# Test function
run_test() {
    local test_name=$1
    local test_result=$2
    
    if [ $test_result -eq 0 ]; then
        echo -e "${GREEN}✓${NC} PASS: ${test_name}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC} FAIL: ${test_name}"
        ((TESTS_FAILED++))
    fi
}

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js not available. Running limited tests.${NC}"
    echo ""
    
    # File existence tests only
    echo "Running file existence tests..."
    
    [ -f "${ROOT_DIR}/src/core/euystacio-principles.js" ]
    run_test "Euystacio Principles module exists" $?
    
    [ -f "${ROOT_DIR}/src/core/adaptive-intelligence-core.js" ]
    run_test "Adaptive Intelligence Core module exists" $?
    
    [ -f "${ROOT_DIR}/src/core/global-governance-infrastructure.js" ]
    run_test "Global Governance Infrastructure module exists" $?
    
    [ -f "${ROOT_DIR}/src/core/apollo-hologram.js" ]
    run_test "Apollo Hologram integration module exists" $?
    
else
    echo "Running full test suite with Node.js..."
    echo ""
    
    # Create test runner
    cat > /tmp/apollo-test-runner.js << 'EOF'
const path = require('path');

// Set up module paths
const rootDir = process.argv[2];
const coreDir = path.join(rootDir, 'src', 'core');

let testsPassed = 0;
let testsFailed = 0;

function runTest(name, testFn) {
    try {
        testFn();
        console.log(`✓ ${name}`);
        testsPassed++;
    } catch (error) {
        console.log(`✗ ${name}: ${error.message}`);
        testsFailed++;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// Load modules
const { EuystacionPrinciples } = require(path.join(coreDir, 'euystacio-principles.js'));
const { AdaptiveIntelligenceCore } = require(path.join(coreDir, 'adaptive-intelligence-core.js'));
const { GlobalGovernanceInfrastructure } = require(path.join(coreDir, 'global-governance-infrastructure.js'));

console.log('Testing Euystacio Principles...');
console.log('─'.repeat(50));

runTest('EuystacionPrinciples can be instantiated', () => {
    const principles = new EuystacionPrinciples();
    assert(principles !== null);
});

runTest('Principles are correctly defined', () => {
    const principles = new EuystacionPrinciples();
    assert(principles.principles.OLF !== undefined);
    assert(principles.principles.NSR !== undefined);
    assert(principles.principles.RED_CODE !== undefined);
});

runTest('Valid action passes validation', () => {
    const principles = new EuystacionPrinciples();
    const result = principles.validateAction({ type: 'help', target: 'user' });
    assert(result.approved === true);
});

runTest('Harmful action is blocked by Red Code', () => {
    const principles = new EuystacionPrinciples();
    const result = principles.validateAction({ type: 'harm', target: 'user' });
    assert(result.approved === false);
    assert(result.violations.some(v => v.principle === 'RED_CODE'));
});

runTest('Coercive action is blocked by NSR', () => {
    const principles = new EuystacionPrinciples();
    const result = principles.validateAction({ forceCompliance: true });
    assert(result.approved === false);
});

console.log('\nTesting Adaptive Intelligence Core...');
console.log('─'.repeat(50));

runTest('AdaptiveIntelligenceCore can be instantiated', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    assert(aic !== null);
});

runTest('AIC initializes correctly', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    const result = aic.initialize();
    assert(result.status === 'initialized');
    assert(aic.state.mode === 'active');
});

runTest('AIC predictive modeling works', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    aic.initialize();
    const prediction = aic.predictiveModel({ type: 'scenario', alignedWithEuystacio: true });
    assert(prediction.id !== undefined);
    assert(prediction.outcomes.length > 0);
});

runTest('AIC blocks harmful predictions', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    aic.initialize();
    const prediction = aic.predictiveModel({ type: 'harm' });
    assert(prediction.blocked === true);
});

console.log('\nTesting Global Governance Infrastructure...');
console.log('─'.repeat(50));

runTest('GlobalGovernanceInfrastructure can be instantiated', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    const ggi = new GlobalGovernanceInfrastructure(principles, aic);
    assert(ggi !== null);
});

runTest('GGI initializes correctly', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    const ggi = new GlobalGovernanceInfrastructure(principles, aic);
    const result = ggi.initialize();
    assert(result.status === 'initialized');
    assert(result.valuePyramid !== undefined);
});

runTest('GGI Value Pyramid is correctly structured', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    const ggi = new GlobalGovernanceInfrastructure(principles, aic);
    assert(ggi.valuePyramid.apex !== undefined);
    assert(ggi.valuePyramid.foundation !== undefined);
    assert(ggi.valuePyramid.utility !== undefined);
    assert(ggi.valuePyramid.agency !== undefined);
});

runTest('GGI directive review works', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    const ggi = new GlobalGovernanceInfrastructure(principles, aic);
    ggi.initialize();
    const review = ggi.reviewDirective({ type: 'positive', traceable: true });
    assert(review.decision !== undefined);
});

runTest('GGI blocks apex violations', () => {
    const principles = new EuystacionPrinciples();
    const aic = new AdaptiveIntelligenceCore(principles);
    const ggi = new GlobalGovernanceInfrastructure(principles, aic);
    ggi.initialize();
    const review = ggi.reviewDirective({ threatensLifeContinuity: true });
    assert(review.decision.vetoed === true);
});

// Summary
console.log('\n' + '═'.repeat(50));
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsFailed}`);
console.log('═'.repeat(50));

process.exit(testsFailed > 0 ? 1 : 0);
EOF

    node /tmp/apollo-test-runner.js "$ROOT_DIR"
    TEST_RESULT=$?
    
    if [ $TEST_RESULT -eq 0 ]; then
        echo -e "\n${GREEN}All tests passed!${NC}"
    else
        echo -e "\n${RED}Some tests failed.${NC}"
        exit 1
    fi
fi

# Final summary
echo ""
echo -e "${BLUE}══════════════════════════════════════════════════════════════${NC}"
echo "Test Summary: ${TESTS_PASSED} passed, ${TESTS_FAILED} failed"
echo -e "${BLUE}══════════════════════════════════════════════════════════════${NC}"
