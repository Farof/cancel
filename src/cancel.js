"use strict";

(function (exports) {

  var
    list = [],
    cursor = -1,
    cncl = exports.cncl = {
      make: function (action, undo) {
        var state = {
          action: function () {
            try {
              action();
            } catch (e) {
              console.log('action failed: ', list[cursor])
            }
          },
          undo: function () {
            try {
              undo();
            } catch (e) {
              console.log('undo failed: ', list[cursor])
            }
          }
        };

        list = list.slice(0, cursor + 1);
        state.action();
        cursor += 1;
        list.push(state);
      },

      undo: function () {
        var step = list[cursor];
        if (step) {
          step.undo();
          cursor -= 1;
        }
      },

      redo: function () {
        var step = list[cursor + 1];
        if (step) {
          step.action();
          cursor += 1;
        }
      }
    };

  window.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 90) {
        if (e.metaKey) {
          if (e.shiftKey) {
            cncl.redo();
          } else {
            cncl.undo();
          }
        }
      }
    }, false);
  }, false);

}(this));
