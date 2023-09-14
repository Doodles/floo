export const formatFlowAddress = (
  address: string,
  with0xPrefix: boolean,
): string => {
  if (with0xPrefix && !address.startsWith('0x')) {
    return `0x${address}`;
  }

  if (!with0xPrefix && address.startsWith('0x')) {
    return address.slice(2);
  }

  return address;
};
