const Error = ({children}) => { //Se extrae mensaje con destructuring
  return (
    <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-sm">
        <p>{children}</p>    {/* se pasa la variable del prop */}
    </div>
  )
}

export default Error
