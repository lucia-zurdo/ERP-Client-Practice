interface FormFeedbackProps {
  mensaje?: string
  error?: string
}

export function FormFeedback({ mensaje, error }: FormFeedbackProps) {
  return (
    <>
      {mensaje && (
        <p className="text-center text-green-400 font-bold mb-4">{mensaje}</p>
      )}
      {error && (
        <div className="text-center text-red-400 font-bold mb-4">
          {error.split(', ').map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}
    </>
  )
}