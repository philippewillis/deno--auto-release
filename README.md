# Auto GitHub Project Release

Automate your release workflow with GitHub Actions and semantic versioning.

## Prerequisites

1. **Create Release Labels:**  
  In your GitHub repository, add three issue labels:  
  - `major`
  - `minor`
  - `patch`

2. **Configure Versioning:**  
  Ensure your `deno.json` file includes a `version` property.



## Creating Pull Requests

- Open pull requests as usual.
- **Assign a Release Label:**  
  Add one of the release labels (`major`, `minor`, or `patch`) to your PR to indicate the type of release.
- If no label is provided, the `auto-release` GitHub Action will default to a `patch` release.

---

This setup enables automated version bumps and changelog generation based on your PR labels.
