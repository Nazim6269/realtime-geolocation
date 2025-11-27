
const ErrorCard = ({message}) => {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-red-500/80 text-white p-4 text-center">
      {message}
    </div>
  )
}

export default ErrorCard