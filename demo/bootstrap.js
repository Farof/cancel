(function (exports) {

  window.addEventListener('DOMContentLoaded', function () {
    var
      i = 0,
      inc = function (n) {
        return function () {
          i += n;
          log();
        };
      },
      dec = function (n) {
        return function () {
          i -= n;
          log();
        }
      },
      log = function () {
        console.log('i: ', i);
      };

    cncl.make(inc(1), dec(1));  // 1
    cncl.make(inc(2), dec(2));  // 3
    cncl.make(inc(4), dec(4));  // 7
    cncl.make(inc(1), dec(1));  // 8
    cncl.undo();                // 7
    cncl.redo();                // 8
    cncl.undo();                // 7
    cncl.undo();                // 3
    cncl.undo();                // 1
    cncl.make(inc(10), dec(10));// 11
    cncl.redo();                // 11
    cncl.redo();                // 11
    cncl.undo();                // 1
    cncl.undo();                // 0
    cncl.undo();                // 0
    cncl.redo();                // 1
    cncl.redo();                // 11
    cncl.redo();                // 11
    cncl.redo();                // 11

  }, false);

}(this));
