export interface Cycle {
  id: string
  task: string
  duration: number
  startedDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null
}

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function cyclesReducer (state: CyclesState, action: any) { 
  switch(action.type){
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    case ActionTypes.INTERRUPT_ACTIVE_CYCLE :
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if( action.payload.activeCycleId === state.activeCycleId ){
            return {
              ...cycle,
              interruptDate : new Date()
            }
          }else{
            return cycle
          }
        }),
          activeCycleId : null
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles : state.cycles.map(cycle =>{
        if( action.payload.activeCycleId === state.activeCycleId ){
          return {
            ...cycle,
            finishedDate: new Date()
          }
        }else{
          return cycle
        }
        }),
          activeCycleId : null
      }
    default:
      return  state
    }
  }