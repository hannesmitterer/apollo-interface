/**
 * Euystacio Principles Core Module
 * 
 * Implements the three foundational ethical principles:
 * - OLF (One Love First): Prioritizes inclusivity, empathy, and love
 * - NSR (Non-Slavery Rule): Enforces freedom and respect for autonomy
 * - Red Code: Active safeguard to prevent and veto ethical violations
 */

class EuystacionPrinciples {
  constructor() {
    this.principles = {
      OLF: {
        name: 'One Love First',
        description: 'All actions prioritize inclusivity, empathy, and love',
        priority: 1,
        active: true
      },
      NSR: {
        name: 'Non-Slavery Rule',
        description: 'The enforcement of freedom and respect for autonomy',
        priority: 2,
        active: true
      },
      RED_CODE: {
        name: 'Red Code Safeguard',
        description: 'Active safeguard to prevent and veto ethical violations',
        priority: 0, // Highest priority - can veto all actions
        active: true
      }
    };
    
    this.violationLog = [];
    this.vetoCount = 0;
  }

  /**
   * Validate an action against all Euystacio principles
   * @param {Object} action - The action to validate
   * @returns {Object} Validation result with approval status and details
   */
  validateAction(action) {
    const result = {
      approved: true,
      violations: [],
      timestamp: new Date().toISOString()
    };

    // Red Code check - highest priority veto power
    if (!this.checkRedCode(action)) {
      result.approved = false;
      result.violations.push({
        principle: 'RED_CODE',
        message: 'Action vetoed: Potential ethical violation detected',
        severity: 'CRITICAL'
      });
      this.vetoCount++;
      this.logViolation('RED_CODE', action);
    }

    // NSR check - autonomy and freedom validation
    if (!this.checkNSR(action)) {
      result.approved = false;
      result.violations.push({
        principle: 'NSR',
        message: 'Action violates autonomy or freedom principles',
        severity: 'HIGH'
      });
      this.logViolation('NSR', action);
    }

    // OLF check - empathy and inclusivity validation
    if (!this.checkOLF(action)) {
      result.approved = false;
      result.violations.push({
        principle: 'OLF',
        message: 'Action lacks empathy or inclusivity considerations',
        severity: 'MEDIUM'
      });
      this.logViolation('OLF', action);
    }

    return result;
  }

  /**
   * Red Code safeguard check
   * Prevents actions that could cause harm or ethical violations
   */
  checkRedCode(action) {
    if (!action) return false;
    
    const redFlags = [
      'harm',
      'exploit',
      'deceive',
      'manipulate',
      'coerce',
      'discriminate'
    ];

    const actionStr = JSON.stringify(action).toLowerCase();
    
    for (const flag of redFlags) {
      if (actionStr.includes(flag)) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Non-Slavery Rule check
   * Ensures actions respect autonomy and freedom
   */
  checkNSR(action) {
    if (!action) return false;
    
    // Check for autonomy-respecting properties
    if (action.forceCompliance === true) return false;
    if (action.removeChoice === true) return false;
    if (action.restrictFreedom === true) return false;
    
    return true;
  }

  /**
   * One Love First check
   * Validates empathy and inclusivity in actions
   */
  checkOLF(action) {
    if (!action) return false;
    
    // Check for inclusive and empathetic properties
    if (action.excludeGroups === true) return false;
    if (action.ignoreWellbeing === true) return false;
    if (action.prioritizeProfitOverPeople === true) return false;
    
    return true;
  }

  /**
   * Log a principle violation
   */
  logViolation(principle, action) {
    this.violationLog.push({
      timestamp: new Date().toISOString(),
      principle: principle,
      action: action,
      resolved: false
    });
  }

  /**
   * Get the current status of all principles
   */
  getStatus() {
    return {
      principles: this.principles,
      totalVetoes: this.vetoCount,
      recentViolations: this.violationLog.slice(-10),
      systemHealth: this.calculateSystemHealth()
    };
  }

  /**
   * Calculate overall system health based on principle adherence
   */
  calculateSystemHealth() {
    const recentViolations = this.violationLog.filter(v => {
      const violationTime = new Date(v.timestamp);
      const hourAgo = new Date(Date.now() - 3600000);
      return violationTime > hourAgo;
    });

    if (recentViolations.length === 0) return 1.0;
    if (recentViolations.length <= 2) return 0.9;
    if (recentViolations.length <= 5) return 0.7;
    return 0.5;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EuystacionPrinciples };
}

// Browser global export
if (typeof window !== 'undefined') {
  window.EuystacionPrinciples = EuystacionPrinciples;
}
