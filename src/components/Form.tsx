    import { categories } from "../data/category"
    import { useState,ChangeEvent, FormEvent, Dispatch, useEffect} from "react"
    import type { Activity } from "../types"
    import { ActiviActions, ActivityState } from "../reducers/activityReducer"
    import {v4 as uuidv4} from 'uuid'

    type FormProps = {
        dispatch : Dispatch<ActiviActions>,
        state:ActivityState
    }

    
    const initialState:Activity= {      
        id: uuidv4(),
        category: 1,
        name: '',
        calories:0
    }
    export default function Form({dispatch, state}:FormProps) {

        //STATE  DE UN OBJETO CON LOS INICIALES VALORES
        const [activity,setActivity] = useState<Activity>(initialState)

        //USE EFECT PARA RELLENAR CUANDO QUIERA EDITAR NUEVAMENTE
        useEffect(() => {
            if (state.activeId) {
            const selecActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selecActivity)
        }
        }, [state.activeId]);

        //FUNCION PARA ONCHANGE
        const handleChange = (e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => { // con target PODEMOS VER QUE ESTA CAMBIANDO
            const isNumberField = ['category','calories'].includes(e.target.id)
            console.log(isNumberField);
            
            setActivity({
                ...activity, //MANTIENE LO QUE YA TENIAMOS
                // TENEMOS EL TERNARIO PARA COMPROBAR SI ES QUE ES NUMERO ENTONCES LE PONEMOS EL + PARA QUE LE PONGA COMO NUMERO
                [e.target.id] : isNumberField? +e.target.value :e.target.value  // id me dice cual cambie y el value me escribe en esa
            })
        }

        //FUNCION 
        const isValidActivity = () =>{
            const {name,calories} = activity
        return name.trim() !== '' && calories > 0
        }

        const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
            e.preventDefault() // PORQUE SE ENVIA POR DEFECTO
            dispatch({type:"save-activity", payload : {newActivity : activity}})
            setActivity({
                ...initialState, 
                id:uuidv4()
            })

        } 
        return (
        <div>
            <form className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}
                >
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Categoria:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        id="category"
                        value={activity.category} // DEBEMOS ACTUALIAAR ESTE STATE PARA QUE SE VEAN LOS CAMBIOS
                        onChange={handleChange}//PARA QUE SE PUEDA CAMBIAR SE PONE
                    >
                        {categories.map(category => (
                            <option
                            key={category.id}
                            value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}//PARA QUE SE PUEDA CAMBIAR SE PONE

                />
                </div>

                <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input 
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="10"
                    value={activity.calories}
                    onChange={handleChange}//PARA QUE SE PUEDA CAMBIAR SE PONE
                />
                </div>


                <input 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"          
                value={activity.category === 1 ? 'Guardar Comida': 'Guardar ejercicio'}
                disabled={!isValidActivity()}
                />

            </form>
        </div>
    )}
