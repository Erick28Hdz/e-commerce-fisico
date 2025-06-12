'use client'

import { FC, ReactNode, useState, useRef, useEffect } from 'react'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
}

const DropdownComponent: FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-52 rounded-md shadow-lg z-20"
          style={{
            backgroundColor: 'var(--color-bg-light)',
            border: '1px solid var(--color-accent)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.050rem',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  danger?: boolean
}

const DropdownItem: FC<DropdownItemProps> = ({ children, onClick, href, danger = false }) => {
  const baseClass =
    'block px-4 py-2 text-sm w-full text-left transition-colors duration-200'
  const className = `${baseClass} ${
    danger
      ? 'text-red-600 hover:bg-red-100'
      : 'hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-principal)]'
  }`

  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export const Dropdown = Object.assign(DropdownComponent, {
  Item: DropdownItem,
})
