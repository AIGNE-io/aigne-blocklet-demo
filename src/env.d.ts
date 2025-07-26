declare var blocklet: { prefix: string } | undefined;

interface ServerEnv {
  pathPrefix?: string;
}

interface Blocklet {
  prefix: string;
}

declare global {
  interface Window {
    blocklet: Blocklet;
    env?: ServerEnv;
  }
}

export {};
