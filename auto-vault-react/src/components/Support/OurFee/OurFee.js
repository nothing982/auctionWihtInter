import React from 'react'
import classes from './OurFee.module.css';
import signup from './signup.PNG';

export default function OurFee() {
    return (
        <div>
            <div className = {classes["container"]}>
                <h1 className={classes["heading"]}>Our Fees</h1>
                <div className={classes["desc"]}>An explanation of the fees associated with buying an auction vehicle from Auto Vault Auction</div> 
                <div className={[classes["fee"]]}>Purchase Price $0 to $3,499 = $249<br/>Purchase Price $3,500+ = $299<br/><br/><strong>Auto Vault Auction Fee</strong></div>
                <div className={[classes["fee"]]}><h2>Varies</h2><br/><strong>Auto Vault Clearing Vehicle Fee</strong></div>
                <div className={[classes["fee"]]}><h2>$75</h2><br/><strong>Auto Vault Documentation Fee</strong></div>
            </div>
            <div className={["jumbotron",classes["container1"]].join(" ")}>
                <h4 className={classes["heading2"]}>*Auction Clearing House Fees</h4>
                <p className={classes["para"]}>The auction clearing house fees are separate charges from the Auto Auction Mall fee. These are buyer’s fees charged by the dealer auction where the car is located. These fees vary based on the final purchase price of the car. Please contact one of our Auction Specialists at 1-800-680-8010 or  info@autoauctionmall.com  for further information about these fees. Each vehicle listing page has a fee calculator which includes an estimate of the auction clearing house fee. This estimate is based on the then current pre-bid of the vehicle. For Buy Now vehicles, to see the exact auction clearing house fee (along with the other fees), just click on the Buy Now button which will set out all the fees in an easy to read pop-up window.</p>
            </div>
            <div className={["jumbotron",classes["container2"]].join(" ")}>
                <div className={classes["signup_img"]}><img src={signup}></img></div>
                <p className={classes["getStarted"]}>Ready to get started?</p>
                <p className={classes["registerLine"]}>Register a free user account and start bidding on your dream car right now!</p>
                <div className={classes["signupButtonDiv"]}><button type="button" className={["btn btn-info",classes["signupButton"]].join(" ")}>Sign up For Free</button></div>
               </div>



            
        </div>
    )
}
