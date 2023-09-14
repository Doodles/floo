import * as fcl from '@onflow/fcl';

import { parseFlowEventName } from '../helpers';
import { FlowEventName } from '../interfaces';

export interface SubscribeFlowEventProps<T> {
  eventName: string | FlowEventName;
  listener: (event: T) => void;
  once?: boolean;
}

export const subscribeFlowEvent = <T>({
  eventName,
  listener,
  once = false,
}: SubscribeFlowEventProps<T>) => {
  let fetchedOnce = false;
  const unsubscribe = fcl
    .events(parseFlowEventName(eventName))
    .subscribe((event: T) => {
      if (once) {
        if (fetchedOnce) {
          return;
        }
        unsubscribe();
        fetchedOnce = true;
      }
      listener(event);
    });
  return unsubscribe;
};
