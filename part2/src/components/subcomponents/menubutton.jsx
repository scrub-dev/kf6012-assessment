import { Button } from "react-materialize";
import { useNavigate } from "react-router-dom";
/**
 * @author: Scott Donaldson 19019810
 */
export default function MenuButton () {
  // menu for mobile button redirect
  const nav = useNavigate()
  const handleClick = () => {
    nav('/menu')
  }
  return(<Button onClick={handleClick}>Menu</Button>)
}