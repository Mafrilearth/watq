# **WATQ: SECURITY, CRYPTOGRAPHY & GOVERNANCE POLICY (SEC)**

> **ID & Version:** `WATQ-SEC-07` │ `v1.0.0` │ `LOCKED`  
> **Authority & Owner:** Fauzul (Platform Lead) │ **Standard:** `OWASP Top 10 (2021)` │ `ISO/IEC 27001` │ `GDPR Art. 17/20`  
> **SSOT Domain:** Salted `scrypt` Cryptography (`timingSafeEqual`), Strict 2-Role RBAC, HTTP Security Headers  
> **Target Code:** [`packages/security/src/index.ts`](file:///d:/watq/packages/security/src/index.ts) │ [`apps/web/next.config.ts`](file:///d:/watq/apps/web/next.config.ts)

---

# **1. CRYPTOGRAPHIC ARCHITECTURE (THE "WHY")**

## **1.1 One-Way Salted Cryptographic Hashing (`scrypt`)**
To guarantee bank-grade user credential protection, Watq rejects weak legacy hashes (MD5, SHA-1, plain SHA-256) and enforces **Node.js `scryptSync` with unique 16-byte cryptographically secure pseudorandom salts**:

1. **Salt Generation:** Each password hash utilizes `randomBytes(16).toString("hex")` to ensure rainbow table immunity.
2. **Key Derivation Cost Parameters:** CPU/memory cost parameter $N=16384$, block size $r=8$, parallelization $p=1$, and output length $L=64\text{ bytes}$.
3. **Storage Format:** Stored persistently in PostgreSQL as `salt:derivedKeyHex`.
4. **Timing-Attack Immunity:** Password verification strictly uses `crypto.timingSafeEqual` between two buffers of identical length, preventing side-channel execution timing leakage.

```typescript
// Production Cryptographic Proof (packages/security/src/index.ts)
export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = scryptSync(password, salt, 64);
  return timingSafeEqual(keyBuffer, derivedKey);
}
```

## **1.2 Universal W3C Web Cryptography Suite (`crypto.subtle`)**
For edge runtime portability (Cloudflare Workers, Vercel Edge Runtime, and modern browsers without Node.js runtime bindings), Watq implements a universal cryptographic primitives suite in [`packages/security/src/webcrypto.ts`](file:///d:/watq/packages/security/src/webcrypto.ts):

1. **CSPRNG High-Entropy Tokens:** `generateSecureToken(byteLength)` powered by `globalThis.crypto.getRandomValues(new Uint8Array(byteLength))` guaranteeing cryptographically uniform entropy for enterprise auth sessions and CSRF tokens.
2. **Deterministic RFC 4122 v4 UUIDs:** `generateUUID()` utilizing native hardware-accelerated `crypto.randomUUID()`.
3. **NIST FIPS 180-4 Digests:** `sha256(data)` and `sha512(data)` via asynchronous `crypto.subtle.digest()`.
4. **Hardware-Accelerated Message Authentication:** `signHmacSha256(data, secret)` and `verifyHmacSha256(data, signature, secret)` utilizing `crypto.subtle.sign` and `crypto.subtle.verify` with built-in timing-attack immunity.
5. **Authenticated Symmetric Encryption:** `encryptAesGcm(plainText, keyHex)` and `decryptAesGcm(cipherText, keyHex)` utilizing AES-256-GCM with unique 96-bit random IVs and integrated GHASH authentication tags, preventing padding oracle vulnerabilities.
6. **Universal Constant-Time Byte Verification:** `timingSafeEqualWeb(a, b)` for platform-independent XOR byte comparison resistant to side-channel execution analysis.


---

# **2. STRICT 2-ROLE ENTERPRISE RBAC GOVERNANCE (THE "WHAT & HOW")**

The platform enforces a deterministic, zero-bypass Role-Based Access Control (RBAC) hierarchy:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      ENTERPRISE RBAC HIERARCHY                         │
├──────────────────────────┬─────────────────────────────────────────────┤
│ 1. ROLE: ADMIN           │ • Dedicated Platform Authority: Fauzul      │
│                          │ • Full access to Administration Studio      │
│                          │ • Member Directory Governance & Audit       │
│                          │ • Role Promotion/Demotion: MEMBER ↔ ADMIN   │
│                          │ • Account Termination & Access Revocation   │
│                          │ • System Health & Operational Telemetry     │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 2. ROLE: MEMBER          │ • Authenticated Enterprise User             │
│                          │ • Access to Member Workspace (apps/app)     │
│                          │ • Execute 24-Item Diagnostic Assessment     │
│                          │ • Retain & Sync Historical Dossiers in DB   │
│                          │ • Print / Export Executive PDF Dossier      │
│                          │ • STRICTLY BLOCKED from Admin Studio        │
└──────────────────────────┴─────────────────────────────────────────────┘
```

## **2.1 Zero-Backdoor & Anti-Demo Policy**
* **Zero Hardcoded Accounts:** No pre-baked passwords, mock bypass buttons, or simulated admin shortcuts exist in the codebase.
* **Database Authenticated Truth:** Every user session is verified against live records in Neon Serverless PostgreSQL.
* **HttpOnly Session Cookies:** Session tokens are stored in tamper-proof, browser-inaccessible cookies with `SameSite=Lax` and `Secure=true`.

---

# **3. HTTP SECURITY HEADERS & DEFENSIVE HARDENING (THE "DEFENSE")**

Application servers serve enterprise defensive headers on all routes (`apps/web/next.config.ts`):

| Security Header | Configured Value | Protective Mechanism |
| :--- | :--- | :--- |
| **Strict-Transport-Security (HSTS)** | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS strictly for 2 full years; immune to SSL stripping attacks. |
| **X-Content-Type-Options** | `nosniff` | Blocks MIME-type sniffing and malicious script execution. |
| **X-Frame-Options** | `DENY` | Prevents iframe embedding and clickjacking attacks. |
| **X-XSS-Protection** | `1; mode=block` | Activates browser cross-site scripting filters. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Protects private URL parameters during cross-origin requests. |
| **Content-Security-Policy (CSP)** | `default-src 'self'; script-src 'self' 'unsafe-inline' ...` | Prevents unauthorized third-party code injection. |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` | Strips unnecessary device hardware sensor access. |
| **X-Powered-By** | `false` (Header Stripped) | Eliminates Next.js technology stack fingerprinting. |

---

# **4. SUPPLY-CHAIN SECURITY & RESPONSIBLE DISCLOSURE (THE "WHERE")**

1. **GitHub Secret Scanning & Push Protection:** Permanently enabled across `Mafrilearth/watq`. Any commit containing API keys or private credentials is automatically rejected at the Git push level.
2. **Dependabot Automated Security Updates:** Monitored via `.github/dependabot.yml` for automated CVE vulnerability alerts across npm dependencies.
3. **Responsible Vulnerability Disclosure SLA:**
   - **Reporting Channel:** Private GitHub Security Advisory or `security@watq.app`.
   - **Initial Response SLA:** Guaranteed within **48 hours**.
   - **Remediation Target:** Critical CVE patches deployed within **7 calendar days**.
