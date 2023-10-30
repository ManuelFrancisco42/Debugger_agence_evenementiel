import { useEffect, useState, Fragment } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Changed the sorting logic to sort events in descending order by date,
  // so that events with later dates come first in the sorted array.
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // The condition checks if byDateDesc is defined before executing nextCard.
    if (byDateDesc) {
      setTimeout(
        // length - 1, after displaying the last image, the index will be reset to 0.
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className='SlideCardList'>
      {byDateDesc?.map((event, idx) => (
        // Adding a unique key to the Fragment component.
        <Fragment key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? 'display' : 'hide'
            }`}
          >
            <img src={event.cover} alt='forum' />
            <div className='SlideCard__descriptionContainer'>
              <div className='SlideCard__description'>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className='SlideCard__paginationContainer'>
            <div className='SlideCard__pagination'>
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Adding a unique key.
                  key={_.date}
                  type='radio'
                  name='radio-button'
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Slider;
