import { FlowEventName } from '../interfaces';

export const parseFlowEventName = (
  eventName: string | FlowEventName,
): string => {
  if (typeof eventName === 'string') {
    return eventName;
  }

  if (eventName.contractAddress.startsWith('0x')) {
    eventName.contractAddress = eventName.contractAddress.slice(2);
  }

  return `A.${eventName.contractAddress}.${eventName.contractName}.${eventName.eventName}`;
};
