import { FC, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
