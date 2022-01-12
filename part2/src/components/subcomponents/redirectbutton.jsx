import { Button } from "react-materialize";
import { useNavigate } from "react-router-dom";
/**
 * @author: Scott Donaldson 19019810
 */
export default function RedirectButton (props) {
  // General Redirect Button
  const nav = useNavigate()
  const handleClick = () => {
    nav('/' + props.location)
  }
  return(<Button onClick={handleClick}>{props.name}</Button>)
}