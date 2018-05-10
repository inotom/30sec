/** @prettier */

import m from 'mithril';
import styles from '../../sass/main.scss';

export default {
  view: vnode => {
    const { counter, ripple } = vnode.attrs;

    return m(
      'div',
      {
        class: styles.root,
        style: {
          backgroundColor: `hsl(${counter.hue()}, 90%, 85%)`
        },
        onclick: e => {
          ripple.enable(e);

          setTimeout(() => {
            ripple.disable();
            m.redraw();
          }, 750);

          counter.action(m.redraw);
        }
      },
      [
        m(
          'div',
          {
            class: styles.count
          },
          counter.get()
        ),
        m(
          'div',
          {
            class: styles.total
          },
          counter.getTotal()
        ),
        m('div', {
          class: ripple.getState() ? styles.rippleAnim : styles.ripple,
          style: {
            left: ripple.getLeft(),
            top: ripple.getTop()
          }
        })
      ]
    );
  }
};
