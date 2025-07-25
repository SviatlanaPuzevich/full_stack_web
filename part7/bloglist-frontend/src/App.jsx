import { useEffect } from 'react'
import { LoginFrom } from './components/LoginForm/LoginFrom.jsx'
import { BlogList } from './components/BlogList/BlogList.jsx'
import { Notification } from './components/Notification/Notification.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from './reducers/blogsReducer.js'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersPage } from './components/UsersPage/UsersPage.jsx'
import { UserBlogList } from './components/UserBlogList/UserBlogList.jsx'
import Blog from './components/Blog/Blog.jsx'
import { NavMenu } from './components/NavMenu/NavMenu.jsx'
import { RequireAuth } from './components/RequireAuth/RequireAuth.jsx'
import { Container, Row, Col } from 'react-bootstrap'

const App = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('Init')
    dispatch(getAllBlogs())
  }, [])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Notification notification={notification}/>
          <RequireAuth>
            <NavMenu/>
          </RequireAuth>
          <Routes>
            <Route path="/login" element={<LoginFrom/>}/>
            <Route
              path="/blogs"
              element={
                <RequireAuth>
                  <BlogList/>
                </RequireAuth>
              }
            />

            <Route
              path="/users"
              element={
                <RequireAuth>
                  <UsersPage/>
                </RequireAuth>
              }
            />
            <Route
              path="/users/:id"
              element={
                <RequireAuth>
                  <UserBlogList/>
                </RequireAuth>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <RequireAuth>
                  <Blog/>
                </RequireAuth>
              }
            />
            <Route path="/" element={<Navigate to={'/blogs'}/>}/>
          </Routes>
        </Col>
      </Row>
    </Container>
  )
}

export default App
