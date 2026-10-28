import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'frames_auth';
let cached = null;
const listeners = new Set();

export const getToken = () => cached?.token ?? null;

export const loadAuth = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cached = raw ? JSON.parse(raw) : null;
  } catch (e) {
    cached = null;
  }
  return cached;
};

export const saveAuth = async data => {
  cached = data;
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {}
};

export const clearAuth = async () => {
  cached = null;
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {}
};

// http() calls this on a 401; App listens
export const onSessionExpired = fn => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const emitSessionExpired = message =>
  listeners.forEach(fn => fn(message));
