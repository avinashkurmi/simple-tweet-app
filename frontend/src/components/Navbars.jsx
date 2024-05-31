import React from "react";
import { Link } from "react-router-dom";

const Navbars = ()=>{
    return(
        <nav id="nav-bar"className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Avinash</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">create</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/all">all post</Link>
                </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbars;