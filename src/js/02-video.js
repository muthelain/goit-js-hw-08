import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const serializatetData = localStorage.getItem('videoplayer-current-time');
const seconds = serializatetData ? JSON.parse(serializatetData).seconds : 0;

player
  .setCurrentTime(seconds)
  .then(function (seconds) {
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

const getTimeOfVideo = data => {
  return localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};

player.on('timeupdate', throttle(getTimeOfVideo, 1000));
