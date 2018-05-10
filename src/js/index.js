/** @prettier */

import m from 'mithril';
import main from './components/main';
import Counter from './models/Counter.js';
import Ripple from './models/Ripple.js';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const counter = Counter.createNew();
    const ripple = Ripple.createNew();
    m.mount(document.body, {
      view: () => {
        return m(main, {
          counter: counter,
          ripple: ripple
        });
      }
    });
  },
  false
);

// Check that service workers are registered
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function(registration) {
        console.info(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      })
      .catch(function(err) {
        console.error('ServiceWorker registration failed: ', err);
      });
  });
}
