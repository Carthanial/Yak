class LocalStorage {
  constructor(storage) {
    this.storage = storage;
    this.isAvailable = false;
    this.storageChecked = false;
    this.checkForLocalStorage();
  }

  set(key, value) {
    if (this.isAvailable) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  get(key) {
    if (this.isAvailable) {
      return JSON.parse(this.storage.getItem(key));
    }
  }

  remove(key) {
    if (this.isAvailable) {
      this.storage.removeItem(key);
    }
  }

  checkForLocalStorage() {
    if (!this.storageChecked) {
      if (!this.storage) {
        this.isAvailable = false;
      }
      try {
        this.set('test', 'test');
        this.remove('test');
        this.isAvailable = true;
      } catch (e) {
        this.isAvailable = false;
      }
      this.storageChecked = true;
    }
  }
}

module.exports = LocalStorage;
