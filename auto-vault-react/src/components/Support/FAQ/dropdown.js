import React from 'react'
import classes from "./style.module.css";
import translate from '../../../i18n/translate';

export default function Dropdown() {
    return (
        <div>
            <h3 className={classes["user"]}>{translate('UserAccounts')} &amp; {translate('Registration')}</h3>
            <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
      {translate('WhyShouldIRegisterWithAutoVault')} &#43;
      </button>
    <div class="collapse" id="collapse1">
      <div class="card card-body">
         {translate('ThereAreSeveralBenefitsToRegisteringWithAutoAuctionMall')}<br/><br/>
         {translate('1.YoucametoAutoAuctionMallToAttendADealerOnlyCarAuctionSoThatYouCouldSaveThousandsOnYourCarPurchase')}
           <br/>
          {translate('InOrderToBidnAnd/orBuyAnyCarOnOurSiteYouMustFirstRegisterHere.')}
          <br/><br/>
          {translate('2.RegistrationIs100%FreeAndDoesNotRequireAnyCreditCardorOtherPaymentInformation.')}
         
          <br/><br/>{translate('point3')}
      </div>
    </div>


    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapseExample">
   {translate('2Main')} &#43;
      </button>
    <div class="collapse" id="collapse2">
      <div class="card card-body">
     {translate('2Main1')} <br/>{translate('2Main2')}<br/><br/>
    {translate('2Main3')}<br/>
    {translate('2Main4')}<br/>
    {translate('2Main5')}<br/><br/>
    {translate('2Main6')} <a>{translate('2Main7')}</a>    
         </div>
    </div>

    
    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapseExample">
    {translate('3Main')}
      </button>
    <div class="collapse" id="collapse3">
      <div class="card card-body">
      {translate('3Main1')}<br/>
    {translate('3Main2')}<br/><br/>
    {translate('3Main3')}<br/>
      {translate('3Main4')}
         </div>
    </div>

    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapseExample">
    {translate('4Main')} &#43;
      </button>
    <div class="collapse" id="collapse4">
      <div class="card card-body">
      {translate('4Main1')} <br/>{translate('4Main2')}
             </div>
    </div>

    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapseExample">
    {translate('5Main')} &#43;
      </button>
    <div class="collapse" id="collapse5">
      <div class="card card-body">
      {translate('5Main1')}
      </div>
    </div>

    {/* **************Auction Process &amp; Bidding******************** */}
    <h3 className={classes["user"]}>{translate('Registration')} &amp; {translate('Bidding')}</h3>
    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse6" aria-expanded="false" aria-controls="collapseExample">
    {translate('6Main')} &#43;
     </button>
    <div class="collapse" id="collapse6">
      <div class="card card-body">
      {translate('6Main1')}
        <br/><br/>
        {translate('6Main2')}
        <br/><br/>
        {translate('6Main3')}
      </div>
    </div>

    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse7" aria-expanded="false" aria-controls="collapseExample">
    {translate('7Main')} &#43;
     </button>
    <div class="collapse" id="collapse7">
      <div class="card card-body">
      {translate('7Main1')}
        </div>
    </div>

    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse8" aria-expanded="false" aria-controls="collapseExample">
    {translate('8Main')} &#43;
     </button>
    <div class="collapse" id="collapse8">
      <div class="card card-body">
      {translate('8Main1')}
        </div>
    </div>

    <button className={["btn",classes["btn-secondary1"]].join(" ")} type="button" data-toggle="collapse" data-target="#collapse9" aria-expanded="false" aria-controls="collapseExample">
    {translate('9Main')}
     </button>
    <div class="collapse" id="collapse9">
      <div class="card card-body">
      {translate('9Main1')}  </div>
    </div>


        </div>
    )
}
