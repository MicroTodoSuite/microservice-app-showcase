# MicroTodoSuite — Engineering Case Study

A static, single-page technical case study presenting MicroTodoSuite: a five-service
distributed system delivered through a GitOps pipeline onto AWS EKS, with signed and
scanned container supply chain, admission-time policy enforcement, and a three-pillar
observability stack.

This site is a presentation layer only. It contains no application code and makes no
runtime calls into the platform it describes — every claim on the page is sourced from
the specifications, decision records, and status documents in the organization's other
repositories, most directly `microservice-app-docs`.

## Content

- Project context and the five owned services.
- Architecture decision records: the economical/full profile split, build-once/promote-
  by-digest, and GitOps rollback discipline.
- The delivered (economical) architecture, as a diagram.
- The delivery pipeline: reusable SHA-pinned CI/CD workflows, OIDC-only authentication.
- Supply-chain and runtime security: Trivy, Syft, Cosign keyless signing, Kyverno
  admission verification.
- Observability, testing strategy, and engineering practice (Spec-Driven Development,
  trunk-based development, review-gate ownership).
- The Slack approval gateway.
- A verified-state section stating plainly what is currently running, quiesced, or
  designed-but-unapplied, tied to a verification date.

There is deliberately no roadmap or sprint-by-sprint narrative — this is a record of
decisions and delivered capability, not a project timeline.

## Local preview

The site has no build step.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

Published to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`,
using `actions/deploy-pages` with the repository's OIDC token. No static credential is
stored in this repository.

## Updating content

Edit `index.html` and `assets/css/style.css` directly. When a described capability
changes state (for example, the full profile is applied to real infrastructure, or the
economical cluster's verified-state date changes), update the "Verified state" section
and cite the same source document used originally so the claim stays checkable.
