# **WATQ: OPERATIONS & OBSERVABILITY MANUAL (OPS)**

> **ID & Version:** `WATQ-OPS-08` │ `v1.0.0` │ `LOCKED`  
> **Authority & Owner:** Fauzul (Platform Lead) │ **Standard:** `Google SRE Handbook` │ `SemVer 2.0.0` │ `ISO/IEC/IEEE 12207`  
> **SSOT Domain:** Dual-Branch Git Flow (`dev` ➔ `main`), SemVer 4-Surface Sync, Telemetry, Closed-Loop Incident Triage  
> **Target Code:** [`.github/workflows/`](file:///d:/watq/.github/workflows/) │ [`apps/web/src/instrumentation.ts`](file:///d:/watq/apps/web/src/instrumentation.ts)

---

# **1. DUAL-BRANCH ENTERPRISE GIT ARCHITECTURE (THE "WHY")**

To preserve production stability and commit history immutability, Watq enforces a strict dual-branch Git workflow:

```
  [ FEATURE / FIX ] ──(Commit)──> [ dev Branch ] (Active Staging & Daily Engineering)
                                         │
                                         ▼ (Audit, Test & QA Gates)
                                 [ main Branch ] (Production Release & Vercel Edge)
                                         │
                                         ▼ (Tag SemVer vX.Y.Z)
                                 [ GitHub Release ] (Official Public Landmark)
```

1. **`main` (Production Branch — Public Default):**
   - Serves the live production deployment on Vercel Edge.
   - Direct developer commits are strictly disabled. Code enters `main` exclusively through audited fast-forward merges or release PRs from `dev`.
   - Branch protection rules: `allow_force_pushes: false`, `allow_deletions: false`.
2. **`dev` (Development & Staging Branch):**
   - Active engineering branch where all daily development, feature additions, bug fixes, and agent workflows execute.
   - Automatically tested against linting, typechecking, and unit test suites on push.

---

# **2. RELEASE SYNCHRONIZATION & SEMVER 2.0.0 SOP (THE "WHAT & HOW")**

## **2.1 Semantic Versioning Governance (SemVer 2.0.0)**
* **PATCH (`1.0.0` ➔ `1.0.1`):** Backwards-compatible bug fixes, security hardening, or layout stabilization bundles.
* **MINOR (`1.0.1` ➔ `1.1.0`):** New backwards-compatible user-facing features (e.g., PDF export improvements, bilingual translations).
* **MAJOR (`1.x.x` ➔ `2.0.0`):** Breaking architectural redesigns incompatible with prior sessions.

## **2.2 The 4-Surface Version Synchronization Rule**
Whenever an intentional milestone release is published, the version string **MUST** match identically across all 4 surfaces:
1. **`package.json`**: `"version": "X.Y.Z"` across root and all workspace packages (`@watq/web`, `@watq/app`, etc.).
2. **Documentation Suite (`docs/README.md`)**: `Suite Version: X.Y.Z` and metadata headers across `docs/*.md`.
3. **Root README (`README.md`)**: Release badge `Release-vX.Y.Z`.
4. **GitHub Releases & Git Tag**: Tag `vX.Y.Z` pushed to remote, and official GitHub Release published with `make_latest: true`.

## **2.3 Zero-Bloat Release Protocol**
* **No Disruptive Popups:** Never deploy intrusive modals or "What's New" popups that block user workflows.
* **No On-Screen Changelog Pages:** User-facing screens remain focused on cognitive diagnostics. Detailed release notes are tracked via Git tags and documentation.

---

# **3. RUNTIME OBSERVABILITY & TELEMETRY INFRASTRUCTURE (THE "OBSERVABILITY")**

Watq integrates 3 high-reliability telemetry services maintaining $0 OpEx:

| Telemetry Layer | Service Provider | Free Tier Allocation | Operational Purpose |
| :--- | :--- | :--- | :--- |
| **Error Tracking** | **Sentry** | 5,000 Errors & 10,000 Traces/Mo | Real-time crash monitoring with TypeScript source maps. |
| **Centralized Logging** | **Better Stack (Logtail)** | 1 GB Log Data/Mo Free | Live-tail interactive console; structured SQL query triage. |
| **Uptime Monitoring** | **Better Stack Uptime** | 10 Monitors @ 3-min ping | Immediate notification via Webhook/Email on HTTP anomalies. |
| **Product Analytics** | **PostHog** | 1,000,000 Events/Mo Free | Privacy-preserving assessment completion and drop-off analysis. |

---

# **4. SCIENTIFIC CLOSED-LOOP INCIDENT TRIAGE RUNBOOK (THE "CLOSED-LOOP")**

When a production defect or runtime anomaly is captured by telemetry (Stage 8):

```text
[ 1. CAPTURE & ISOLATE ] ──> Sentry / Better Stack alerts on exception
           │
[ 2. REGRESSION TEST ]   ──> Write failing automated test in Stage 6 (docs/06-stp.md)
           │
[ 3. ROOT CAUSE AUDIT ]  ──> Identify defect origin (PRD, SRS, or Code implementation)
           │
[ 4. REPAIR & VERIFY ]   ──> Apply minimal contiguous patch; verify 27/27 tests pass
           │
[ 5. UPDATE SSOT ]       ──> Record edge case invariant in docs/03-srs.md; release to main
```

> **Certified Operational Standard:** Production stability is preserved through deterministic automated pipelines, zero secret disclosure, and continuous closed-loop feedback.
