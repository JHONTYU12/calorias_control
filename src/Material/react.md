
# USE REDUCE
- **Alternativa de useState**
- **Hook para manejar el estado**.
- Se usa para transiciones de estado más complejas.
  - **useState** es para estados simples.
  - **useReducer** se utiliza cuando hay múltiples subvalores o varios estados que necesitan actualizarse juntos.

### **Argumentos de useReducer**
1. **Reducer**:
   - Función que maneja el estado actual y una acción para devolver el nuevo estado.
2. **Estado Inicial**:
   - Cómo comienza el estado en el componente.

---

### **Términos importantes**
- **State**:
  - Es el valor actual del estado, cuya lógica se maneja dentro del reducer.
- **Initial State**:
  - Define cómo inicia el estado del componente (por ejemplo, si está vacío o con datos predefinidos).
- **Actions**:
  - Son objetos que definen qué lógica debe ejecutarse para modificar el estado.
  - Contienen un `type` (la acción a realizar) y un `payload` (los datos necesarios para esa acción).
- **Payload**:
  - Es la información extra que se necesita para modificar el estado (por ejemplo, un `id` o un objeto).
- **Dispatch**:
  - Función que manda a llamar las acciones, enviando el `type` y el `payload` al reducer.

---

### **Ejemplo básico de useReducer**

```tsx
import React, { useReducer } from "react";

const initialState = { contador: 0 };

function reducer(state, action) {
    if (action.type === "incrementar") {
        return { contador: state.contador + 1 };
    }
    if (action.type === "resetear") {
        return { contador: 0 };
    }
    return state;
}

function Contador() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <h1>Contador: {state.contador}</h1>
            <button onClick={() => dispatch({ type: "incrementar" })}>
                Incrementar
            </button>
            <button onClick={() => dispatch({ type: "resetear" })}>
                Resetear
            </button>
        </div>
    );
}

export default Contador;
```

---

### **Ejemplo aplicado en un proyecto de actividades**

```typescript
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActiviActions
) => {
    if (action.type === 'save-activity') {
        let updateActivities: Activity[] = [];
        if (state.activeId) {
            updateActivities = state.activities.map(activity => 
                activity.id === state.activeId ? action.payload.newActivity : activity
            );
        } else {
            updateActivities = [...state.activities, action.payload.newActivity];
        }

        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        };
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        };
    }

    if (action.type === "deleteAct") {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        };
    }

    if (action.type === 'restartApp') {
        return {
            activities: [],
            activeId: ''
        };
    }

    return state;
};
```

---

### **Resumen de funciones clave**
1. **Guardar una actividad** (`save-activity`):
   - Si hay una actividad activa (`activeId`), la actualiza.
   - Si no, añade una nueva actividad.
2. **Seleccionar una actividad activa** (`set-activeId`):
   - Cambia el estado para indicar qué actividad está activa.
3. **Eliminar una actividad** (`deleteAct`):
   - Filtra el array de actividades para excluir la seleccionada.
4. **Reiniciar la aplicación** (`restartApp`):
   - Limpia todas las actividades y el estado activo.

---

### **Cómo usar dispatch**
- **`dispatch`** es quien manda a llamar las acciones.
- Ejemplo:
    - Para establecer una actividad activa:
      ```typescript
      dispatch({ type: "set-activeId", payload: { id: activity.id } });
      ```
    - Para eliminar una actividad:
      ```typescript
      dispatch({ type: "deleteAct", payload: { id: activity.id } });
      ```

---

### **Conclusión**
- **`useReducer`** es poderoso para manejar estados complejos.
- El flujo es:
    1. Define el estado inicial.
    2. Escribe las acciones y su lógica en el reducer.
    3. Usa `dispatch` para enviar las acciones.
- Esto permite manejar múltiples cambios de estado de forma ordenada y eficiente.

