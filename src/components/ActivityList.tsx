import { Activity } from '../types'
import {categories} from '../data/category'
import { useMemo, Dispatch} from 'react';
import {PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'
import { ActiviActions } from '../reducers/activityReducer';

type ActivityListProps = {
    activities : Activity[],
    dispatch: Dispatch<ActiviActions>
}

export default function ActivityList({activities, dispatch}:ActivityListProps) {

    const categoryName = useMemo(() => 
    (category:Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
    [activities])

const isEmpty = useMemo(() => activities.length === 0 , [activities])

return (
    <>
    <h2 className='text-4xl font-bold text-sla] text-center'>
        Comida y Actividades
    </h2>

        {isEmpty ? <p className='text-center'>No hay actividades aun ...</p> :
        //Caso contrario
        activities.map(activity => (
            <div key={activity.id} className='shadow-xl px-5 py-10 bg-white mt-5 flex    justify-between'>
                <div className='space-y-2 relative'>
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                        {categoryName(+activity.category)}
                    </p>
                    <p className='text-2xl font-bold pt-5'>{activity.name}</p>
                    <p className='font-black text-4xl text-lime-500'>
                    {activity.calories}{''}
                    <span>Calorias</span>
                    </p>
                </div>

                <div className='flex gap-5 items-center'>
                    <button 
                    onClick={() => dispatch({type: "set-activeId" , payload: {id:activity.id}})}
                    >
                        <PencilSquareIcon
                        className= "h-8 w-8 text-gray-800 "
                        />
                    </button>

                    <button 
                    onClick={() => dispatch({type: "deleteAct" , payload: {id:activity.id}})}
                    >
                        <XCircleIcon className= "h-8 w-8 text-red-700 " />
                    </button>
                </div>
            </div>
        ))}
    </>
)}
