export type MetadataViewsFile = MetadataViewsHTTPFile | MetadataViewsIPFSFile;

export interface MetadataViewsHTTPFile {
  url: string;
}

export interface MetadataViewsIPFSFile {
  cid: string;
  path?: string;
}
