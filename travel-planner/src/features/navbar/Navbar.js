import { useHistory } from "react-router-dom";

export default function Navbar() {
    const history = useHistory();

     const handleOnClick = (location) => {
        history.push("/" + location);
     }

    return (
        <div className="navbar">
            <button onClick={() => handleOnClick("home")}>Home</button>
            <button onClick={() => handleOnClick("criteria")}>Criteria</button>
        </div>
    );
}