/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedAt?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.cycle],
        activeCycleId: action.payload.cycle.id,
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: [
          state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return {
                ...cycle,
                interruptDate: new Date(),
              }
            } else {
              return cycle
            }
          }),
        ],
        activeCycleId: null,
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: [
          state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return {
                ...cycle,
                finishedAt: new Date(),
              }
            } else {
              return cycle
            }
          }),
        ],
        activeCycleId: null,
      }
    default:
      return state
  }
}
