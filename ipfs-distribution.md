# KOSYMBIOSIS IPFS Distribution

## Upload to IPFS

To upload the KOSYMBIOSIS archive to IPFS, use one of the following methods:

### Method 1: Using IPFS Desktop or CLI

```bash
# Add the archive to IPFS
ipfs add kosymbiosis-v1.0.0.zip

# Pin the file for persistence
ipfs pin add <CID>
```

### Method 2: Using Pinata (Web Interface)

1. Visit https://pinata.cloud
2. Upload kosymbiosis-v1.0.0.zip
3. Note the CID provided

### Method 3: Using web3.storage

```bash
# Install w3 CLI
npm install -g @web3-storage/w3cli

# Upload file
w3 up kosymbiosis-v1.0.0.zip
```

## IPFS Gateway Access

Once uploaded, the archive will be accessible via multiple IPFS gateways:

- `https://ipfs.io/ipfs/<CID>`
- `https://gateway.pinata.cloud/ipfs/<CID>`
- `https://cloudflare-ipfs.com/ipfs/<CID>`
- `https://dweb.link/ipfs/<CID>`

## Updating Documentation

After uploading to IPFS, update the following files with the actual CID:

1. `KOSYMBIOSIS/README.md` - Add CID in IPFS Distribution section
2. `KOSYMBIOSIS/metadata/project-metadata.json` - Add CID to distribution.ipfs
3. GitHub Release description - Include IPFS CID

## Verification

Verify the IPFS upload by:

```bash
# Download from IPFS
ipfs get <CID>

# Verify checksum matches
sha256sum <CID>
```

Compare the checksum with the value in kosymbiosis-v1.0.0.checksum.sha256
