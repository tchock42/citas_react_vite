import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => { //importa array pacientes y fn setPAciente

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen md:overflow-scroll"> 
        {/*si existen pacientes y su longitud es mayor a 0 */}
        {pacientes && pacientes.length ? ( // se coloca un parentesis que funciona como un return
          <> {/* y solo puede funcionar con un fragment o un solo elemento hijo */}
            <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>
            {pacientes.map( paciente => ( // toma como argumento temporal paciente y por cada elemento crea un componente PAciente
              <Paciente       //se le pasa dinámicamente los pacientes y la variable temporal paciente y el key
                key = {paciente.id}
                paciente = {paciente}
                setPaciente = {setPaciente}
                eliminarPaciente = {eliminarPaciente}
              />
            ))}
          </>
        ) : ( 
          <>
            <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando tus pacientes {''}
              <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
            </p>
          </>
        )}
        
          
    </div>
  )
}
export default ListadoPacientes
