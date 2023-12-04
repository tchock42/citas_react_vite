import { useState, useEffect } from "react" //se importa useState para usar hooks
import Error from "./Error";

const Formulario = ( { pacientes, setPacientes, paciente, setPaciente} ) => { //se usa destructuring para extraer setPAcientes del prop. Se pasa paciente para editar paciente

  //declaracion de variables y funciones, que usan el hook useState para pasarlo a los inputs para editar las propiedades del paciente en los inputs
  const [nombre, setNombre] = useState('') //variable para input con value nombre
  const [propietario, setPropietario] = useState(''); // value propietario
  const [email, setEmail] = useState(''); //value email
  const [fecha, setFecha] = useState('');  //value fecha
  const [sintomas, setSintomas] = useState(''); //value sintomas

  const [error, setError] = useState(false) //variable de state del error

  useEffect( () => { //espera a un cambio en paciente (dar clic en editar y pasar paciente temporal a paciente state y que se pasa como prop) hacer callback (console.log)
    if ( Object.keys(paciente).length > 0){ //si contiene elementos el objeto paciente
      setNombre(paciente.nombre) //actualiza nombre
      setPropietario(paciente.propietario) //actualiza propietario
      setEmail(paciente.email) //actualiza email
      setFecha(paciente.fecha) //actualiza fecha
      setSintomas(paciente.sintomas) //actualiza sintomas
    }
  }, [paciente]) //este paciente se cargó al dar clic en editar

  const generarId = () => {
    const random = Math.random().toString(36).slice(2); //crea un numero random
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  /****funcion cuando se presiona registrar paciente****/
  const handleSubmit = (e) => {
    e.preventDefault(); //evita que se actualice la pagina
    
    //validacion de formulario
    //se crea un array temporal que no altera los valores
    if([nombre, propietario, email, fecha, sintomas].includes('')){ // si incluye un string vacio
      console.log('Hay al menos un campo vacío')
      setError(true) //cambia el estado a true porque hay error
      return; //sale rápido de la funcion handleSubmit
    }
    setError(false)  //cambia el state a false cuando se manda el formulario lleno
    const objetoPaciente = { //envía el formulario y crea objetoPaciente y un id. Cuando se edita estos datos viene  de state paciente
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
      //no se agrega el id porque al editar no debe tener otro
    }

    //Crear o Editar
    if (paciente.id){  //si hay un objeto el id está presente
      // Editando
      objetoPaciente.id = paciente.id; //debe tener el mismo id de antes
      // console.log(objetoPaciente)
      // console.log(paciente)
      //actualiza. Crea un nuevo array de pacientes actualizados iterando sobre pacientes
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState) //si tiene el mismo id es que es el paciente a actualizar y lo actualiza con el objetoPaciente que tiene lo que tecleó el usuario
       
      setPacientes = setPacientes(pacientesActualizados) //actualiza pacientes con el nuevo state
      setPaciente({}) //limpia el objeto para la siguiente edicion o
    }else{
      // Nuevo registro
      objetoPaciente.id = generarId(); //nuevos registros requieren id 
      setPacientes([...pacientes, objetoPaciente]) //guarda los pacientes en pacientes uno tras otro
    }

    // setPacientes([...pacientes, objetoPaciente]) //modifica la variable paciente mediante el modificador con una copia de pacientes y el nuevo objeto del input. Esto hace que se guarden varios pacientes en pacientes
    
    //reiniciar el form despues de enviar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  } 
  /* Termina funcion*/

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5"> 
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {''} 
        <span className='text-indigo-600 font-bold'>Adminístralos</span>
      </p>

      <form 
        onSubmit={handleSubmit} // llama a la funcion cuando se manda el formulario
        className="bg-white shadow-xl rounded-lg py-10 px-5 mb-10"> 
        {/* agrega un div si se presenta un error. lee el state error */}
        {error ? <Error>Todos los campos son obligatorios</Error> : ''} {/*Termina div de error */}

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre de la Mascota</label>
          <input 
            id="mascota"
            type="text"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            placeholder="Nombre de la Mascota"
            value={nombre} //agrega el nombre tecleado al input
            onChange={ (e) => setNombre(e.target.value) }/> {/*agrega un evento que activa el state de setNombre*/}
        </div> 
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold" >Nombre del Propietario</label>
          <input 
            id="propietario"
            type="text"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            placeholder="Nombre del Propietario" 
            value={propietario} //agrega el propietario tecleado al input
            onChange={(e) => setPropietario(e.target.value)} //cambia el input, cambia la variable propietario
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold" >Correo del Propietario</label>
          <input 
            id="email"
            type="email"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            placeholder="Correo del Propietario" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold" >Alta</label>
          <input 
            id="alta"
            type="date"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold" >Sintomas</label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas} 
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? 'Guardar Cambios' : 'Agregar Paciente' } /*cuando se pasa el paciente temporal a state paciente ya tendrá un id*/
        />

      </form>
    </div>
  )
}

export default Formulario
