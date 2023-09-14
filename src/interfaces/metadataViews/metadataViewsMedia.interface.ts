import {
  MetadataViewsFile,
  MetadataViewsHTTPFile,
  MetadataViewsIPFSFile,
} from './metadataViewsFile.interface';

export interface MetadataViewsMedia {
  file: MetadataViewsFile;
  mediaType: string;
}

export interface MetadataViewsHTTPMedia extends MetadataViewsMedia {
  file: MetadataViewsHTTPFile;
}

export interface MetadataViewsIPFSMedia extends MetadataViewsMedia {
  file: MetadataViewsIPFSFile;
}
