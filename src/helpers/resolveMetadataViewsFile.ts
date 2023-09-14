import { MetadataViewsFile } from '../interfaces';

export const resolveMetadataViewsFile = (
  file: MetadataViewsFile,
  ipfsGateway?: string,
): string => {
  if (!file) {
    throw new Error('No file provided');
  }

  if ('url' in file) {
    return file.url;
  }
  if ('cid' in file) {
    const cidAndPath = `${file.cid}${file.path ? `/${file.path}` : ''}`;
    if (ipfsGateway) {
      return `${ipfsGateway}${cidAndPath}`;
    }
    return `ipfs://${cidAndPath}`;
  }

  throw new Error('Invalid file type');
};
