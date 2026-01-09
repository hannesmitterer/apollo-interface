# Important Notes on KOSYMBIOSIS Archive

## Signature Files - Placeholder Status

⚠️ **IMPORTANT:** The signature files included in this repository are **placeholders** for demonstration purposes:

- `kosymbiosis-v1.0.0.sig`
- `kosymbiosis-v1.0.0-co1.sig`
- `kosymbiosis-v1.0.0-co2.sig`

### For Production Use

Before using this archive in a production environment where cryptographic verification is required:

1. **Generate Real GPG Signatures:**
   ```bash
   # Generate keys if needed
   gpg --gen-key
   
   # Sign the archive
   gpg --detach-sign --armor -o kosymbiosis-v1.0.0.sig kosymbiosis-v1.0.0.zip
   ```

2. **Replace Placeholder Files:**
   - Replace the placeholder signature files with actual GPG signatures
   - Ensure each co-creator signs with their own GPG key
   - Distribute public keys so recipients can verify signatures

3. **Update Documentation:**
   - Add GPG key fingerprints to documentation
   - Provide instructions for importing public keys
   - Update verification commands with actual key IDs

### Current Status

The current signature files serve to:
- Demonstrate the triple-signature verification process
- Provide templates for actual signature generation
- Include metadata about signers and their roles
- Show the expected format for GPG signatures

### IPFS CID

The IPFS CID field in documentation is also a placeholder:
- After uploading to IPFS, update all documentation with the actual CID
- Files to update are clearly marked with `[To be added after upload]`
- See `ipfs-distribution.md` for upload instructions

## Archive Integrity

Despite placeholder signatures, the archive integrity can still be verified using:

1. **SHA-256 Checksum:**
   ```bash
   sha256sum -c kosymbiosis-v1.0.0.checksum.sha256
   ```
   Expected: `02e09984d2d6c1cfaa4d113cf7fb160b9d994b40b879b3c35b86eeeb6d7b1708`

2. **Automated Verification:**
   ```bash
   ./verify-kosymbiosis-v1.0.0.sh
   ```

## Questions?

For questions about signature generation or archive verification:
- See `github-release-notes.md` for detailed instructions
- See `KOSYMBIOSIS/README.md` for comprehensive documentation
- File an issue in the GitHub repository

---

*Last updated: 2026-01-07*
