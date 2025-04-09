AFRAME.registerComponent('start-mindar', {
    init: function () {
      const sceneEl = this.el;
      sceneEl.addEventListener('loaded', () => {
        sceneEl.components['mindar-image'].start();
      });
    }
  });