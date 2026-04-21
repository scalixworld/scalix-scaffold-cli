import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../src/app/page'

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByText('{{project-name}}')
    expect(heading).toBeInTheDocument()
  })

  it('increments count when button is clicked', () => {
    render(<Home />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Count: 0')

    fireEvent.click(button)
    expect(button).toHaveTextContent('Count: 1')

    fireEvent.click(button)
    expect(button).toHaveTextContent('Count: 2')
  })
})
