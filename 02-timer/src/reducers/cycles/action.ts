import { Cycle } from "./reducer";

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function createNewCycleAction(newCycle: Cycle){
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
      payload: {
        newCycle
      }
  }
}

export function markCurrentCycleAsFinishedAction(){
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function interruptCurrentCycleAction(){
  return {
    type: ActionTypes.INTERRUPT_ACTIVE_CYCLE
  }
}

