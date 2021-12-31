declare namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: string;
    }
    export interface Global {
      TsDocGenThemeCache: import("../caches/ThemeCache").default;
    }
  }