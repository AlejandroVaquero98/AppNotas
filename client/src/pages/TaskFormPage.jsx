import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createTask, deleateTask, updateTask, getTask } from '../api/tasks.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';


export function TaskFormPage() {

  const {register, handleSubmit, formState: {errors}, setValue} = useForm (); // el register recoge los datos y entre parentesis pone el nombre de la variable

  const navigate = useNavigate(); // para redirigir 
  const params = useParams(); //para coger parametros de la URL 

  const onSubmit = handleSubmit ( async data => {

    // si params.id existe (tiene la id en la url), quiere decir que esta editando, si no, se esta creando una tarea
    if(params.id){ 
      await updateTask(params.id, data) //peticion al backend para actualizar los datos, le envia la id y los datos actualizar
      toast.success("Tarea Actualizada" , {
        // position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
          fontSize: "30px"
        }
      }
      ) // funcion toast que muestra una notificacion cuando se realiza una acción 
      
    }else{
      const res = await createTask(data);
      toast.success("Tarea Creada" , {
        // position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
          fontSize: "30px"
        }
      }
      ) // funcion toast que muestra una notificacion cuando se realiza una acción 
    }

    navigate("/tasks") //cuaando se crear la tarea te redirecciona a la home
     
  })

  useEffect(() => {

    //funcion para buscar una tarea con la id, si se esta editando, y se llene el formulario con la informacion de la tarea
    async function loadTask(){
      if(params.id){
        console.log("Obteniendo datos")
        const {data : {title, description}}= await getTask(params.id); //peticion al backend para buscar la tarea con esa id 
        setValue('title', title)
        setValue('description', description)
      }
    }

    loadTask();
  }, [])

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input  className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" type="text" placeholder="Title" {...register("title", { required: true })} /> 
        {errors.title && <span>El titulo es requerido</span>}


        <textarea className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" rows="3" placeholder="Description" {...register("description", { required: true })}></textarea>
        {errors.description && <span>La description es requerida</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>

      {params.id &&(
        <div className="flex justify-end">
          <button  className="bg-red-500 p-3 rounded-lg w-48 mt-3" onClick={async () => {
            const accepted = window.confirm('Estas seguro?')
            if(accepted){ 
              await deleateTask(params.id) // llama a la peticion del backend enviado laa id para eliminar 
              navigate("/tasks") 
              toast.success("Tarea Eliminada" , {
                // position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#fff",
                  fontSize: "30px"
                }
              }
              ) // funcion toast que muestra una notificacion cuando se realiza una acción 
            }
          }}>Delete</button>
        </div>
      ) }  
    </div>
    // si params.id existe en la URL, significa que se esta editando una nota, entonces aparece el botón de eliminar 
  )
}

