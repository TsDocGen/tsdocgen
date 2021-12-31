import ThemeCache from "../caches/ThemeCache";

function getThemeCache(): ThemeCache {
  const _globalThis = globalThis as any;

  if (!_globalThis.TsDocGenThemeCache) {
    _globalThis.TsDocGenThemeCache = new ThemeCache();
  }

  return _globalThis.TsDocGenThemeCache
}

export default getThemeCache;
