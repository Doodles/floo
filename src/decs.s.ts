declare module '@onflow/types';
declare module '@onflow/sdk';
declare module '@onflow/flow-cadut';
declare module 'elliptic';
declare module 'raw-loader!*' {
  const contents: string;
  export = contents;
}

declare module '*.cdc' {
  const content: string;
  export default content;
}
