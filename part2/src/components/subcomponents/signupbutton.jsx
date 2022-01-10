import { Button } from "react-materialize";
import { useNavigate } from "react-router-dom";
export default function SignupButton () {
  const nav = useNavigate()
  const handleClick = () => {
    nav('/signup')
  }
  return(<Button onClick={handleClick}>Signup</Button>)
}