const ls = (localStorage) => {
  let storage = { ...localStorage };
  let isAvailable = false;
  let storageChecked = false;

  (() => {
    if (!storageChecked) {
      if (!storage) {
        isAvailable = false;
      }
      try {
        set('test', 'test');
        remove('test');
        isAvailable = true;
      } catch (e) {
        isAvailable = false;
      }
      storageChecked = true;
    }
  })();

  const set = (key, value) => {
    if (isAvailable) {
      storage.setItem(key, JSON.stringify(value));
    }
  };

  const get = (key) => {
    if (isAvailable) {
      return JSON.parse(storage.getItem(key));
    }
  };

  const remove = (key) => {
    if (isAvailable) {
      storage.removeItem(key);
    }
  };

  return {
    set,
    get,
    remove,
  };
};

export default ls;
