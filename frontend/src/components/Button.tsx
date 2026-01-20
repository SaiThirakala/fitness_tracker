import React from 'react'

export interface ButtonProps {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
