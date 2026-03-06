import { Link } from "react-router-dom";

const Button = ({
  buttonText = "Button",
  target = "/",
  className = "",
  icon,
  ...props
}) => {
  return (
    <Link to={target} className={`btn ${className}`} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {buttonText}
    </Link>
  );
};

export default Button;
