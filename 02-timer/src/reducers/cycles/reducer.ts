import { ActionTypes } from "./action"
import { produce } from 'immer'

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

export function cyclesReducer (state: CyclesState, action: any) { 

  switch(action.type){
    case ActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (drafts) => {
        drafts.cycles.push(action.payload.newCycle);
        drafts.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_ACTIVE_CYCLE :{
      const index = state.cycles.findIndex((cycle) =>{
        return cycle.id === state.activeCycleId
      });

      if(index < 0){
        return state
      }
      //meu produce: esta devolvendo tudo para mim, mas eu estou trabalhando ainda com o conceito de imutabilidade.
      return produce(state, (drafts) => {
        drafts.cycles[index].interruptDate = new Date() ;
        drafts.activeCycleId = null;
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:{
      const index = state.cycles.findIndex( cycle => {
        return cycle.id === state.activeCycleId
      })

      if(index < 0){
        return state
      }

      return produce(state, (drafts) => {
        drafts.cycles[index].finishedDate = new Date();
        drafts.activeCycleId = null;
      })
    }
    default:
      return  state
    }
  }