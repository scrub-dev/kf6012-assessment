import { Button } from "react-materialize";
import { useNavigate } from "react-router-dom";
/**
 * @author: Scott Donaldson 19019810
 */
export default function SignupButton () {
  // signup button redirect
  const nav = useNavigate()
  const handleClick = () => {
    nav('/signup')
  }
  return(<Button onClick={handleClick}>Signup</Button>)
}