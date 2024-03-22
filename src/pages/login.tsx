import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

interface FormData {
  login: string;
  password: string;
}

const Login = ({ token, setToken }: any) => {
  const navigate = useNavigate()

  // redirect straight away of tokin is found
  useEffect(() => {
    if (sessionStorage.getItem('token')) navigate('/backend')
  }, [])

  const [formData, setFormData] = useState<FormData>({ login: '', password: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // calls supabase login with the form data
    const { data, error } = await supabase.auth.signInWithPassword({ // add error handling
      email: formData.login,
      password: formData.password
    })
    if (!error) {
      setToken(data)
      navigate('/backend')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="login" name="login" onChange={handleChange} />
        <input placeholder="password" name="password" type="password" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Login
