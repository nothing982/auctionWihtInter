import React from 'react'
import classes from "./style.module.css";
import pic1 from './01.jpg';
import pic4 from './04.jpg'
import './style.css';

export default function HowBidsAtCarAuctionWork() {
    return (
        <div>
            <div className={classes["nav-links"]}>
                <a href="#" className={classes["auto-vault"]}>Auto Vault</a>
                <span> / </span>
                <a href="#" className={classes["buyer-help"]}>Buyer's Help</a>
                <span> / </span>
                <a className={classes["article-1"]}>How Bids At Car Auction Work</a>
            </div>
            {/* <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li className={[classes["Bitem"],"breadcrumb-item"].join(" ")}><a className={classes.anchor} href="#">Buyer's Help</a></li>
                    <li class={"breadcrumb-item"}><a href="#" className={classes.anchor}>Buyer Tips</a></li>
                    <li className={["breadcrumb-item",classes["current-page"]].join(" ")} aria-current="page">How Bids At Car Auction Work</li>
                </ol>
            </nav> */}

            <button type="button" className={[classes["buyer-btn"],"btn"].join(" ")}><a>Buyer's Tips</a></button>
            
    <div className={[classes["cardone"],"card mb-3 mx-4"].join(" ")} style={{maxWidth: "60rem"}}>
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src={pic1} class="card-img-one image-fluid" alt=""/>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h3 className={[classes["ItemOnes"],"card-title"].join(" ")}>How Bids at <br/> Car Auction Work?<br/><span class="author">BY ODET GARCIA </span> </h3>
            </div>
            </div>
        </div>
    </div>

    <p class="paragraph">Car auctions have gained much popularity nowadays. Buyers have the opportunity to land great deals on a used car in very good condition. However, not everyone has knowledge about car auctions or how they work. Sometimes there’s a bit of confusion when it comes to pricing or the process in general. Since you have to place a bid on the car you’d like to buy, we think it’s important to go over how the bidding process works. Stick around as we show you in this article how bids at car auctions work.</p>
    <h2 class="heading2">Placing Bids at Car Auctions</h2>
    <p class="paragraph">Throughout this article, we’ll focus on buying used cars at online car auctions. We’ve talked about the two types of auctions before: public and dealer auctions. Dealer auctions give you the opportunity to find a used car and save up to 70% of the market price. This is pretty appealing, especially for buyers on a tight budget. Nonetheless, some buyers don’t have experience with auctions and may be overwhelmed by the bidding process.</p>   
    <img className={["image-fluid rounded mx-auto d-block",classes["img"]].join(" ")} src={pic4} />
    <p class="paragraph">Research is crucial before placing bids at car auctions. It will allow you to take care of your budget and find a used car that won’t be faulty. Part of this research must be understanding how the process of placing bids at car auctions work. We’ll go over the steps you should follow to place your bid and know what you’re doing.</p>
    
    
    </div>
    )
}
