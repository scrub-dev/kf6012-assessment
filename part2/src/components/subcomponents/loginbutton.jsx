import { Button } from "react-materialize";
import { useNavigate } from "react-router-dom";
/**
 * @author: Scott Donaldson 19019810
 */
export default function LoginButton () {
  // login button redirect
  const nav = useNavigate()
  const handleClick = () => {
    nav('/login')
  }
  return(<Button onClick={handleClick}>Login</Button>)
}