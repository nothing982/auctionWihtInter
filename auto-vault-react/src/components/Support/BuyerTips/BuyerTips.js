import React from 'react'
import './style.css';
import pic1 from './01.jpg';
import pic2 from './02.jpeg';
import pic3 from './03.jpg';
import classes from "./style.module.css";
import ad1 from './ad1.png';

function BuyerTips() {
    return (
        <div>
            <div className={classes["nav-links"]}>
                <a href="#" className={classes["auto-vault"]}>Auto Vault</a>
                <span> / </span>
                <a href="#" className={classes["buyer-help"]}>Buyer's Help</a>
                <span> / </span>
                <a className={classes["buyer-tip"]}>Buyer Tips</a>
            </div>
            {/* <nav aria-label="breadcrumb">
                <ol className={[["breadcrumb"],classes["nav-links"]]}>
                    <li class="breadcrumb-item"><a href="#">Auto Vault</a></li>
                    <li class="breadcrumb-item"><a href="#">Buyer's Help</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Buyer Tips</li>
                </ol>
            </nav> */}

            <h2 className={classes["heading"]}>Buyer Tips</h2>
            <hr/>

    <div class="card mb-3 mx-4" style={{maxWidth: "42rem"}}>
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src={pic1} class="card-img" alt="..."/>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <a className={[classes["anchor"],"card-title"].join(" ")}>How Bids at Car Auction Work?</a>
                <p class="card-text text-justify">Car auctions have gained much popularity nowadays. Buyers have the opportunity to land great deals on a used car in very good condition. However, not everyone has knowledge about car …</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
        </div>
    </div>

    <div class="card mb-3 mx-4" style={{maxWidth: "42rem"}}>
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src={pic2} class="card-img" alt="..."/>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <a className={[classes["anchor"],"card-title"].join(" ")}>Best Used Cars You Can Buy This Year Under $10,000</a>
                <p class="card-text">The process of buying a used car doesn’t have to be complicated. You can make it easier for you if you have a proper research done and a structured budget. …</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
        </div>
    </div>

    <div class="card mb-3 mx-4" style={{maxWidth: "42rem"}}>
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src={pic3} class="card-img" alt="..."/>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <a className={[classes["anchor"],"card-title"].join(" ")}>How Bids at Car Auction Work?</a>
                <p class="card-text">Car auctions have gained much popularity nowadays. Buyers have the opportunity to land great deals on a used car in very good condition. However, not everyone has knowledge about car …</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
        </div>
    </div>


        </div>
    )
}

export default BuyerTips;