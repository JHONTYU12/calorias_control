import type { Activity } from "../types"

export type ActiviActions = 
// TYPE ES LA ACCION

// PLAYLOAD LA INFORMACION QUE MODIFICA EL STATE
    { type: 'save-activity'; payload: { newActivity: Activity } } |
    { type: 'set-activeId'; payload: { id : Activity['id'] } } |
    { type: 'deleteAct'; payload: { id : Activity['id'] } } |
    { type: 'restartApp'}  // no toma payload


export type ActivityState = {
    activities: Activity[],
    activeId:Activity['id']
}

const localStorageA = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : [] // DEVUELVE LO QUE HAY O SINO EL VACIO 
}

export const initialState: ActivityState={
    activities: localStorageA(),
    activeId: '',

} 

    //ACCIONES

export const activityReducer = (
    state: ActivityState = initialState,
    action : ActiviActions
) => {
    if (action.type === 'save-activity') {
        // ESTE CODIGO ES LOGICA PARA MANEJAR EL STATE
        let updateActivities : Activity[] = []
        if (state.activeId) {
            updateActivities = state.activities.map (activity => activity.id === state.activeId ? action.payload.newActivity : activity )
        }else{
            updateActivities = [...state.activities,action.payload.newActivity]
        }
        return  {//RETORNA EL ESTADO ACTUALIZADO
            ...state,
            activities:updateActivities,
            activeId: ''
        }

    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }


    if (action.type === "deleteAct") {
        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restartApp'){
        return{
            activities: [],
            activeId: ''
        }
    }



    return state
} 