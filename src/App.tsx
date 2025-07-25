import Form from "./components/Form"
import { useReducer, useEffect, useMemo} from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
function App() {

  const[state, dispatch]=useReducer(activityReducer, initialState) //STATE SIEMPRE EL ESTADO DEL REDUCE
  
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities]);

  const canRestarApp = () => useMemo(() => state.activities.length ,[state.activities])

  return (
    
    // RENDER
  <>
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de calorias
        </h1>
        <button className="bg-gray-700 hover:bg-gray-950 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
        disabled={!canRestarApp()} // TE DA TRUE CUANDO NO HAY  ACTIVIDADES
        onClick={() => dispatch({type:'restartApp'})}
        >
          Reiniciar App
        </button>
      </div>
    </header>

    <section className="bg-lime-500 py-20 px-5">
      <div className=" max-w-4xl mx-auto">
        
        <Form
          dispatch = {dispatch}
          state={state}
        />
      </div>
    </section>
  <section className="bg-gray-800 py-10"> 
    <div className="max-w-4xl mx-auto">
      <CalorieTracker
      activities = {state.activities}
      />
    </div>
  </section>


    <section className="p-10 mx-auto max-w-4xl">
      <ActivityList
        activities = {state.activities}
        dispatch={dispatch}
      />
    </section>
  </>      
  )
}

export default App
