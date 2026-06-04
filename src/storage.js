// ------------------------------------------------------------
// localStorage-backed shim for the Claude Artifacts `window.storage` API.
//
// The game component (HttydRpg.jsx) was originally authored as a Claude
// Artifact, where a host-provided `window.storage` object offered async
// get/set/delete. That API does not exist in a normal browser, so we
// recreate it here on top of localStorage. The async signatures and the
// `{ value }` return shape are preserved so the component needs no changes.
// ------------------------------------------------------------

const PREFIX = "httyd:";

function installStorageShim() {
  if (typeof window === "undefined") return;
  // Don't clobber a real host-provided implementation if one exists.
  if (window.storage && typeof window.storage.get === "function") return;

  window.storage = {
    async get(key) {
      try {
        const value = window.localStorage.getItem(PREFIX + key);
        return value === null ? null : { value };
      } catch (_) {
        return null;
      }
    },
    async set(key, value) {
      window.localStorage.setItem(PREFIX + key, String(value));
    },
    async delete(key) {
      window.localStorage.removeItem(PREFIX + key);
    },
  };
}

installStorageShim();
