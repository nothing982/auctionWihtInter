import React from 'react';
import classes from './HomeImage.module.css';
import translate from '../../../i18n/translate';

function homeImage() {
  return (
    <div>
      <div className={classes['image-container']}>
        <br />
        <h1 className={classes.text}>{translate('WantToBuyContainerText')}</h1>
        <br />
        <h2 className={classes.text}>
          {translate('ParticipateContainerText')}
        </h2>
        <br />
        <h1 className={classes.text}>
          {translate('GetVehiclesContainerText')}
        </h1>
        <br></br>
        <h2>{translate('VisitInventoryContainerText')}</h2>
        <br></br>
      </div>
    </div>
  );
}
export default homeImage;
