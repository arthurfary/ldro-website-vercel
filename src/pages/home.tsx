import { Link } from "react-router-dom"
import Calendar from "../components/calendar/Calendar"

const Home = () => {
  return (
    <>
      <h1>Hello World!</h1>
      <Calendar />
      <Link to={'/login'}>Login</Link>
    </>
  )
}

export default Home
