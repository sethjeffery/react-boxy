import mockedWindow from 'storage-mock'

const getLocalStorage = () => {
  // Tests if localStorage is available. If not, use a mock.
  // For example, Safari Incognito Mode disables localStorage
  const testKey = 'test', storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return storage
  } catch (error) {
    return mockedWindow.localStorage
  }
}

const storage = getLocalStorage()

export const localStorageMiddleware = store => next => action => {
  // Simple middleware that saves the app state in localStorage
  const output = next(action)
  try {
    storage.setItem('react-todo-app', JSON.stringify(store.getState().app))
  } catch (error) {
    // Possibly we exceeded our quota... for now just ignore it
  }
  return output
}

export const loadStateFromStorage = () => {
  const data = storage.getItem('react-todo-app') || "{}"
  return { app: JSON.parse(data) }
}
