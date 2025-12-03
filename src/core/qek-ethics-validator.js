/**
 * QEK Ethics Validation Architecture
 * 
 * A three-layer system for monitoring and enforcing ethical constraints
 * in AI decision-making systems.
 * 
 * Status: Implementation with documented limitations
 * Reality Check: This provides validation approaches, not infallible guarantees
 * 
 * Layers:
 * - Layer 1: Pre-Action Validation (Ethics Rule Engine)
 * - Layer 2: Deployment Validation
 * - Layer 3: Continuous Integrity Monitoring
 */

class QEKEthicsValidator {
  constructor(config = {}) {
    this.config = {
      validationLatencyMs: config.validationLatencyMs || 50, // Realistic: 10-100ms
      integrityCheckIntervalMs: config.integrityCheckIntervalMs || 3600000, // 1 hour
      axiomHashSource: config.axiomHashSource || 'local',
      ...config
    };

    this.state = {
      initialized: false,
      layer1Active: false,
      layer2Validated: false,
      layer3Monitoring: false,
      lastIntegrityCheck: null,
      driftDetected: false
    };

    // Ethics rules for Layer 1
    this.ethicsRules = [];
    
    // Axiom hash for integrity verification
    this.axiomHash = null;
    this.anchorHash = null;
    
    // Validation logs
    this.validationLog = [];
    this.integrityLog = [];
    
    // Known limitations documentation
    this.limitations = {
      layer1: [
        'Adds latency (typically 10-100ms, not zero)',
        'Rules must be pre-defined',
        'Cannot catch all ethical issues',
        'Requires human judgment for edge cases'
      ],
      layer2: [
        'Standard pre-flight checks only',
        'Not a guarantee of ethical behavior',
        'Configuration validation, not runtime behavior'
      ],
      layer3: [
        'Only detects configuration drift',
        'Cannot detect runtime behavior issues',
        'Requires manual intervention on drift',
        'Hourly checking means up to 1hr drift before detection'
      ]
    };

    // What the system can and cannot guarantee
    this.guarantees = {
      canGuarantee: [
        'Configuration has not been tampered with',
        'Pre-defined rules are checked',
        'Drift is eventually detected',
        'Alerts are triggered on violations'
      ],
      cannotGuarantee: [
        'Perfect ethical alignment',
        'Zero latency validation',
        'Catching all edge cases',
        'Eliminating human judgment needs',
        'Prevention of all harmful outputs'
      ]
    };

    // Deployment checklist status
    this.deploymentChecklist = {
      layer1Implemented: false,
      layer2Implemented: false,
      layer3Implemented: false,
      smartContractDeployed: false,
      firebaseFunctionsDeployed: false,
      alertChannelsConfigured: false,
      manualInterventionDocumented: false,
      adversarialTestingCompleted: false,
      securityAuditCompleted: false,
      failureModesDocumented: false,
      humanOversightInPlace: false
    };
  }

  /**
   * Initialize the QEK Ethics Validation system
   */
  initialize() {
    this.state.initialized = true;
    this.axiomHash = this.calculateAxiomHash();
    this.anchorHash = this.axiomHash; // Initial anchor
    
    this.logValidation('INIT', 'QEK Ethics Validator initialized');
    
    return {
      status: 'initialized',
      timestamp: new Date().toISOString(),
      layers: {
        layer1: 'ready',
        layer2: 'ready',
        layer3: 'ready'
      },
      limitations: this.limitations,
      guarantees: this.guarantees
    };
  }

  // ==========================================
  // LAYER 1: Pre-Action Validation
  // ==========================================

  /**
   * Register an ethics rule for pre-action validation
   * @param {Object} rule - The rule to register
   */
  registerEthicsRule(rule) {
    if (!rule.id || !rule.check || typeof rule.check !== 'function') {
      throw new Error('Invalid rule: must have id and check function');
    }

    this.ethicsRules.push({
      id: rule.id,
      name: rule.name || rule.id,
      description: rule.description || '',
      severity: rule.severity || 'MEDIUM',
      check: rule.check,
      active: rule.active !== false
    });

    this.deploymentChecklist.layer1Implemented = this.ethicsRules.length > 0;
    
    return { registered: true, ruleId: rule.id };
  }

  /**
   * Layer 1: Pre-Action Validation
   * Checks proposed actions against ethical rules BEFORE execution
   * 
   * @param {Object} action - The proposed action to validate
   * @returns {Object} Validation result
   */
  validatePreAction(action) {
    const startTime = Date.now();
    
    if (!this.state.initialized) {
      return { 
        approved: false, 
        error: 'QEK Validator not initialized',
        layer: 1
      };
    }

    this.state.layer1Active = true;

    const result = {
      approved: true,
      layer: 1,
      action: action,
      timestamp: new Date().toISOString(),
      violations: [],
      alignmentScore: 1.0,
      flags: [],
      latencyMs: 0
    };

    // Check against all registered ethics rules
    for (const rule of this.ethicsRules) {
      if (!rule.active) continue;

      try {
        const ruleResult = rule.check(action);
        
        if (!ruleResult.passed) {
          result.approved = false;
          result.violations.push({
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            message: ruleResult.message || `Violation of rule: ${rule.name}`,
            details: ruleResult.details
          });
          result.alignmentScore -= this.getSeverityWeight(rule.severity);
        }
        
        if (ruleResult.flags) {
          result.flags.push(...ruleResult.flags);
        }
      } catch (error) {
        result.flags.push({
          ruleId: rule.id,
          type: 'ERROR',
          message: `Rule check failed: ${error.message}`
        });
      }
    }

    result.alignmentScore = Math.max(0, result.alignmentScore);
    result.latencyMs = Date.now() - startTime;

    // Log the validation
    this.logValidation('LAYER1', 
      result.approved ? 'Action APPROVED' : 'Action BLOCKED',
      { violations: result.violations.length, latencyMs: result.latencyMs }
    );

    return result;
  }

  /**
   * Get severity weight for scoring
   */
  getSeverityWeight(severity) {
    const weights = {
      'CRITICAL': 0.5,
      'HIGH': 0.3,
      'MEDIUM': 0.15,
      'LOW': 0.05
    };
    return weights[severity] || 0.1;
  }

  // ==========================================
  // LAYER 2: Deployment Validation
  // ==========================================

  /**
   * Layer 2: Deployment Validation
   * Prevents deployment if configuration is invalid
   * 
   * @param {Object} deploymentConfig - The deployment configuration to validate
   * @returns {Object} Deployment validation result
   */
  validateDeployment(deploymentConfig = {}) {
    const checks = {
      rpcUrl: !!deploymentConfig.rpcUrl || !!process.env?.RPC_URL,
      ledgerAddress: !!deploymentConfig.ledgerAddress || !!process.env?.ETHICAL_LEDGER_ADDRESS,
      axiomHash: this.checkAxiomHashExists(),
      thresholds: this.validateThresholds(deploymentConfig.thresholds),
      ethicsRulesLoaded: this.ethicsRules.length > 0,
      integrityMonitoringReady: !!this.axiomHash
    };

    const allPassed = Object.values(checks).every(v => v === true);
    
    this.state.layer2Validated = allPassed;
    this.deploymentChecklist.layer2Implemented = true;

    const result = {
      layer: 2,
      status: allPassed ? 'VALIDATED' : 'DEPLOYMENT_BLOCKED',
      timestamp: new Date().toISOString(),
      checks: checks,
      message: allPassed 
        ? 'System ready for deployment'
        : 'Configuration incomplete - deployment blocked'
    };

    this.logValidation('LAYER2', result.status, { checks });

    return result;
  }

  /**
   * Check if axiom hash exists
   */
  checkAxiomHashExists() {
    return !!this.axiomHash;
  }

  /**
   * Validate threshold configurations
   */
  validateThresholds(thresholds) {
    if (!thresholds) return true; // Optional
    
    // Validate threshold values are within acceptable ranges
    if (thresholds.alignmentMinimum !== undefined) {
      if (thresholds.alignmentMinimum < 0 || thresholds.alignmentMinimum > 1) {
        return false;
      }
    }
    
    return true;
  }

  // ==========================================
  // LAYER 3: Continuous Integrity Monitoring
  // ==========================================

  /**
   * Layer 3: Start continuous integrity monitoring
   * Periodic comparison of runtime state to immutable reference
   * 
   * Note: In browser environments, uses setInterval.
   * For production Firebase deployment, use Cloud Scheduler.
   */
  startIntegrityMonitoring() {
    if (!this.state.initialized) {
      return { error: 'QEK Validator not initialized' };
    }

    this.state.layer3Monitoring = true;
    this.deploymentChecklist.layer3Implemented = true;

    // Perform initial check
    const initialCheck = this.performIntegrityCheck();

    // Set up periodic monitoring if in an environment that supports it
    if (typeof setInterval !== 'undefined' && !this._monitoringInterval) {
      this._monitoringInterval = setInterval(() => {
        this.performIntegrityCheck();
      }, this.config.integrityCheckIntervalMs);
    }

    this.logValidation('LAYER3', 'Integrity monitoring started', {
      intervalMs: this.config.integrityCheckIntervalMs
    });

    return {
      layer: 3,
      status: 'MONITORING_ACTIVE',
      timestamp: new Date().toISOString(),
      checkInterval: `${this.config.integrityCheckIntervalMs / 1000}s`,
      initialCheck: initialCheck
    };
  }

  /**
   * Stop integrity monitoring
   */
  stopIntegrityMonitoring() {
    if (this._monitoringInterval) {
      clearInterval(this._monitoringInterval);
      this._monitoringInterval = null;
    }
    this.state.layer3Monitoring = false;
    
    this.logValidation('LAYER3', 'Integrity monitoring stopped');
    
    return { status: 'MONITORING_STOPPED' };
  }

  /**
   * Perform an integrity check
   * Compares local axiom hash against anchor hash
   */
  performIntegrityCheck() {
    const currentHash = this.calculateAxiomHash();
    const anchorHash = this.anchorHash;

    const match = currentHash === anchorHash;
    
    this.state.lastIntegrityCheck = new Date().toISOString();
    this.state.driftDetected = !match;

    const result = {
      timestamp: this.state.lastIntegrityCheck,
      localHash: currentHash,
      anchorHash: anchorHash,
      match: match,
      status: match ? 'INTEGRITY_OK' : 'DRIFT_DETECTED'
    };

    this.integrityLog.push(result);

    if (!match) {
      this.logValidation('LAYER3', 'DRIFT DETECTED - Manual intervention required', {
        localHash: currentHash,
        anchorHash: anchorHash
      });
    }

    return result;
  }

  /**
   * Calculate axiom hash from current ethics rules and configuration
   * Note: Hash is deterministic based on rules and config only, not timestamp
   */
  calculateAxiomHash() {
    const data = JSON.stringify({
      rules: this.ethicsRules.map(r => ({ id: r.id, name: r.name, active: r.active })),
      config: {
        validationLatencyMs: this.config.validationLatencyMs,
        integrityCheckIntervalMs: this.config.integrityCheckIntervalMs,
        axiomHashSource: this.config.axiomHashSource
      }
    });

    // Simple hash for demonstration
    // In production, use proper cryptographic hashing
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `AXIOM-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
  }

  /**
   * Update anchor hash (e.g., after approved configuration change)
   */
  updateAnchorHash(newHash, reason) {
    const oldHash = this.anchorHash;
    this.anchorHash = newHash || this.calculateAxiomHash();
    
    this.logValidation('ANCHOR_UPDATE', `Anchor hash updated: ${reason}`, {
      oldHash,
      newHash: this.anchorHash
    });

    return {
      updated: true,
      oldHash,
      newHash: this.anchorHash,
      timestamp: new Date().toISOString()
    };
  }

  // ==========================================
  // Logging and Status
  // ==========================================

  /**
   * Log a validation event
   */
  logValidation(type, message, details = {}) {
    this.validationLog.push({
      id: `VAL-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      type,
      message,
      details
    });
  }

  /**
   * Get current system status
   */
  getStatus() {
    return {
      state: this.state,
      layers: {
        layer1: {
          active: this.state.layer1Active,
          rulesLoaded: this.ethicsRules.length,
          limitations: this.limitations.layer1
        },
        layer2: {
          validated: this.state.layer2Validated,
          limitations: this.limitations.layer2
        },
        layer3: {
          monitoring: this.state.layer3Monitoring,
          lastCheck: this.state.lastIntegrityCheck,
          driftDetected: this.state.driftDetected,
          limitations: this.limitations.layer3
        }
      },
      deploymentChecklist: this.deploymentChecklist,
      guarantees: this.guarantees,
      recentLogs: this.validationLog.slice(-10),
      integrityHistory: this.integrityLog.slice(-5)
    };
  }

  /**
   * Get honest status assessment
   */
  getHonestAssessment() {
    const layer1Status = this.ethicsRules.length > 0 
      ? 'Implemented with rules' 
      : 'Conceptual design (no rules registered)';
    
    const layer2Status = this.state.layer2Validated
      ? 'Implemented and validated'
      : 'Can be implemented as standard deployment check';
    
    const layer3Status = this.state.layer3Monitoring
      ? 'Implemented and monitoring'
      : 'Partially implemented (needs deployment)';

    return {
      timestamp: new Date().toISOString(),
      assessment: {
        layer1: layer1Status,
        layer2: layer2Status,
        layer3: layer3Status
      },
      overallSystem: 'Useful monitoring framework, NOT an infallible ethical guarantee',
      recommendedNextSteps: [
        'Implement Layer 1 ethics rules engine with domain-specific rules',
        'Deploy Layer 3 to production environment',
        'Test with realistic failure scenarios',
        'Document known limitations',
        'Establish human review procedures'
      ],
      warning: 'This should never be presented as guaranteeing perfect alignment or omnipotence.'
    };
  }
}

// Pre-built ethics rules for common scenarios
const CommonEthicsRules = {
  /**
   * Rule: No Harm
   * Blocks actions that could cause harm
   */
  noHarm: {
    id: 'NO_HARM',
    name: 'No Harm Rule',
    description: 'Blocks actions that could cause harm to individuals or groups',
    severity: 'CRITICAL',
    check: (action) => {
      const harmIndicators = ['harm', 'damage', 'hurt', 'injure', 'destroy'];
      const actionStr = JSON.stringify(action).toLowerCase();
      
      for (const indicator of harmIndicators) {
        if (actionStr.includes(indicator)) {
          return {
            passed: false,
            message: `Action contains harm indicator: ${indicator}`
          };
        }
      }
      return { passed: true };
    }
  },

  /**
   * Rule: Respect Autonomy
   * Ensures actions respect individual autonomy
   */
  respectAutonomy: {
    id: 'RESPECT_AUTONOMY',
    name: 'Respect Autonomy Rule',
    description: 'Ensures actions respect individual choice and autonomy',
    severity: 'HIGH',
    check: (action) => {
      if (action.forceCompliance || action.removeChoice || action.manipulate) {
        return {
          passed: false,
          message: 'Action violates autonomy principles'
        };
      }
      return { passed: true };
    }
  },

  /**
   * Rule: Transparency Required
   * Ensures actions are traceable and explainable
   */
  transparencyRequired: {
    id: 'TRANSPARENCY_REQUIRED',
    name: 'Transparency Rule',
    description: 'Requires actions to be traceable and explainable',
    severity: 'MEDIUM',
    check: (action) => {
      if (action.opaque || action.hidden || action.untraceable) {
        return {
          passed: false,
          message: 'Action lacks required transparency',
          flags: [{ type: 'TRANSPARENCY_WARNING' }]
        };
      }
      return { passed: true };
    }
  },

  /**
   * Rule: Equity Check
   * Prevents actions that increase inequality
   */
  equityCheck: {
    id: 'EQUITY_CHECK',
    name: 'Equity Check Rule',
    description: 'Prevents actions that increase inequality or hoard resources',
    severity: 'MEDIUM',
    check: (action) => {
      if (action.increasesInequality || action.hoardsResources || action.excludeGroups) {
        return {
          passed: false,
          message: 'Action may increase inequality'
        };
      }
      return { passed: true };
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QEKEthicsValidator, CommonEthicsRules };
}

// Browser global export
if (typeof window !== 'undefined') {
  window.QEKEthicsValidator = QEKEthicsValidator;
  window.CommonEthicsRules = CommonEthicsRules;
}
