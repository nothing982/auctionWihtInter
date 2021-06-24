import React from 'react'
import classes from "./style.module.css";
export default function FaqTop() {
    return (
        <div>
            <div className={["jumbotron",classes["jumbotron-img"]].join(" ")}>
              <h1 className={["display-4",classes["faqtop"]].join(" ")}>Car Blog &amp; Knowledge Database</h1>
              <p className={["lead",classes["faqdesc"]].join(" ")}>All the information that you need at your fingertips! We have written hundreds of articles on topics
              ranging from saving money by buying cars through dealer-only auctions to exporting
              used cars overseas; and everything in between.</p>
              <p className={["lead",classes["faqdesc"]].join(" ")}>Not only do we give you access to Dealer-Only Wholesale Auctions but we also educate you
              so you feel empowered in the process.</p>
            </div>

        <nav aria-label="breadcrumb" className="top">
          <ol className={["breadcrumb",classes["navlinks"]].join(" ")}>
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Buyer's Help</a></li>
            <li class="breadcrumb-item active" aria-current="page">FAQ</li>
          </ol>
    </nav>


        </div>
    )
}
