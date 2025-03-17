import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'
import Image from 'next/image'

jest.mock('./LanguageSelectorDesktop', () => {
  return function MockLanguageSelector() {
    return <div data-testid="language-selector">Language Selector</div>
  }
})

jest.mock('./LanguagesSelectorMobile', () => {
  return function MockLanguageSelectorMobile() {
    return <div data-testid="language-selector-mobile">Mobile Language Selector</div>
  }
})

jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
    return <Image src={src} alt={alt} width={width} height={height} />
  }
})

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('Header Component', () => {
  it('renders the logo with correct props', () => {
    render(<Header />)
    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/Logo.svg')
    expect(logo).toHaveAttribute('width', '100')
    expect(logo).toHaveAttribute('height', '100')
  })

  it('renders the navigation component', () => {
    render(<Header />)
    expect(screen.getByTestId('nav')).toBeInTheDocument()
  })

  it('renders both language selectors', () => {
    render(<Header />)
    expect(screen.getByTestId('language-selector')).toBeInTheDocument()
    expect(screen.getByTestId('language-selector-mobile')).toBeInTheDocument()
  })

  it('renders the hamburger menu button', () => {
    render(<Header />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('rounded-full', 'bg-grayDark', 'text-foreground')
  })

  it('has correct link to homepage', () => {
    render(<Header />)
    const homeLink = screen.getByRole('link')
    expect(homeLink).toHaveAttribute('href', '/')
  })
})