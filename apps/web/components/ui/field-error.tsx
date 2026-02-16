interface FieldErrorProps {
  error?: string
  className?: string
}

export function FieldError({ error, className = "" }: FieldErrorProps) {
  if (!error) return null

  return <p className={`text-sm text-red-600 mt-1 ${className}`}>{error}</p>
}
