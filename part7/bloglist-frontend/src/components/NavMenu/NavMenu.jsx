import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { logout } from '../../reducers/userReducer.js'
import { NavLink } from 'react-router-dom'

export const NavMenu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logout())
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" variant="tabs">
            <Nav.Link as={NavLink} to="/blogs">blogs</Nav.Link>
            <Nav.Link as={NavLink} to="/users">users</Nav.Link>
          </Nav>

          {user && (
            <Nav className="ms-auto align-items-center">
              <Navbar.Text className="me-2">
                {`${user.name} logged in`}
              </Navbar.Text>
              <Button
                variant="outline-secondary"
                size="sm"
                data-testid="logout"
                onClick={handleLogout}
              >
                logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
