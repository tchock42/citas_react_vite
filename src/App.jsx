import {useEffect, useState} from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  
  const [pacientes, setPacientes] = useState([]); //variable pacientes con modificador setPacientes con un valor inicial como []
  const [paciente, setPaciente] = useState({}); //variable paciente con valor inicial objeto vacío para editar el paciente

  //leer lo que haya en localstorage
  useEffect(() => { 
    const obtenerLS = () => { 
      //convierte de string a array
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []; //asegura que haya algo en pacientesLS o sería null
      setPacientes(pacientesLS) //actualiza state pacientes con localstorage
    }
    obtenerLS(); //ejecuta el useeffect una vez
  }, []);

  //sincornizar el state con lo que haya en pacientes
  useEffect(() =>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes)) //convierte el arreglo a string
  }, [pacientes])

  const eliminarPaciente = (id) => { //filtra pacientes diferentes al que se quiere eliminar
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    // console.log(pacientesActualizados)
    setPacientes(pacientesActualizados) //actualiza el estado de pacientes
  }

  return ( 
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes = {pacientes} //se pasa los pacientes a Formulario
          setPacientes = {setPacientes} //pasa setPacientes para crear array de pacientes en Formulario
          paciente = {paciente} //se pasa la función modificadora al formulario cuando se da clic en editar
          setPaciente = {setPaciente} //se pasa para limpiar state paciente desde formulario
        />
        <ListadoPacientes 
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          setPacientes = {setPacientes}
          eliminarPaciente = {eliminarPaciente} // funcion para eliminar pacientes
        /> {/* pasa pacientes como prop */}
      </div>
    </div>
    
  )
}

export default App
