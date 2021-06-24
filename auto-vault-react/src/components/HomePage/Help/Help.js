import React from 'react';
import classes from "./Help.module.css";
import { Link } from "react-router-dom";

export default function Help() {
    return (
        <div className={[classes["container"],"jumbotron mb-0"].join(" ")}>
  <h1 className="display-4">Helpful tips</h1>
  <Link to="/" className={classes["link"]}>Buying a Vehicle</Link>
  <Link to="/" className={classes["link"]}>How does an auction work?</Link>
  <Link to="/" className={classes["link"]}>Buying a Savage Car?</Link>  
  <Link to="/" className={classes["link"]}>Import Export & Shipping</Link>
  </div>
    )
}
