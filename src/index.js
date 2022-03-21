import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation
} from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/myapps' element={<Navigate replace to='/learn' />} />
        <Route path='/learn' element={<Learn />} >
          <Route path='course' element={<Course />} >
            <Route path=':courseid' element={<CourseId />} />
          </Route>
          <Route path='bundle' element={<Bundle />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);





function Home() {
  return (
    <div>
      <h1> Home Route</h1>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1> Learn Route</h1>
      <h4>All course are lsited here</h4>
      <Link className='btn btn-success' to="/learn/course"> Courses </Link> |
      <Link className='btn btn-primary' to="/learn/bundle"> Bundle </Link>
      <Outlet />
    </div>
  )
}


function Bundle() {
  return (
    <div>
      <h1> Bundle Route</h1>
    </div>
  )
}

function Course() {

  const courseList = ['React', 'Angular', 'Vue', 'Nodejs']
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)]

  return (
    <div>
      <h1> Course Route</h1>

      <NavLink
        style={({ isActive }) => ({
          backgroundColor: isActive ? 'green' : 'yellow',
        })}
        to={`/learn/course/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>

      <Outlet />
    </div >
  )
}

function CourseId() {
  const navigate = useNavigate()
  const { courseid } = useParams()
  return (
    <div>
      <h1> URL Param is : {courseid}</h1>
      <button 
      onClick={ () => {
        navigate('/dashboard', {state : {name:'parth'}})
      }}
      className='btn btn-warning'>Price</button>

    <Link to='/dashboard' state={'Nodejs'} className='btn btn-primary'> Price</Link>      
    </div>
  )
}

function Dashboard() {
  const location = useLocation()
  console.log(location)
  return (
    <div>
      <h1> Dashboard {location.state.name}</h1>
    </div>
  )
}



reportWebVitals();


