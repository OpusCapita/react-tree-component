'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderingArrows = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(OrderingArrows, _React$PureComponent);

  function OrderingArrows() {
    var _temp, _this, _ret;

    _classCallCheck(this, OrderingArrows);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onUpClick = function () {
      var newItems = _this.getUpdatedTreeAfterShift('up');
      _this.props.onOrderButtonClick(newItems);
    }, _this.onDownClick = function () {
      var newItems = _this.getUpdatedTreeAfterShift('down');
      _this.props.onOrderButtonClick(newItems);
    }, _this.getArrangedArray = function (original, dir) {
      var _this$props = _this.props,
          dataLookUpKey = _this$props.dataLookUpKey,
          selectedKeys = _this$props.selectedKeys;

      var id = selectedKeys[0];
      var modified = original.slice();
      var startIndex = modified.findIndex(function (item) {
        return item[dataLookUpKey] === id;
      });
      var endIndex = startIndex;

      if (dir === 'up' && startIndex > 0) {
        endIndex -= 1;
      } else if (dir === 'down' && startIndex < modified.length - 1) {
        endIndex += 1;
      }

      var swapped = modified[startIndex];
      modified[startIndex] = modified[endIndex];
      modified[endIndex] = swapped;

      return modified;
    }, _this.getUpdatedTreeAfterShift = function (dir) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.treeData;
      var _this$props2 = _this.props,
          selectedKeys = _this$props2.selectedKeys,
          dataLookUpKey = _this$props2.dataLookUpKey,
          onOrderButtonClick = _this$props2.onOrderButtonClick,
          dataLookUpChildren = _this$props2.dataLookUpChildren;

      if (selectedKeys.length !== 1) return false;
      if (!onOrderButtonClick) throw TypeError('Tree: onOrderButtonClick callback is not defined');
      var newItems = array.slice();
      var id = selectedKeys[0];

      // If item is found on main level:
      var found = newItems.find(function (item) {
        return item[dataLookUpKey] === id;
      });
      if (found) return _this.getArrangedArray(array, dir);

      // Otherwise..
      for (var i = 0; i < newItems.length; i += 1) {
        var item = newItems[i];
        if (!found && item[dataLookUpChildren]) {
          found = !!item[dataLookUpChildren].find(function (child) {
            return child[dataLookUpKey] === id;
          });
          if (found) {
            item[dataLookUpChildren] = _this.getArrangedArray(item[dataLookUpChildren], dir);
            break;
          }
          if (item[dataLookUpChildren] && !found) {
            found = _this.getUpdatedTreeAfterShift(dir, item[dataLookUpChildren]);
          }
        }
      }
      if (!found) return false;
      return newItems;
    }, _this.isArrowDisabled = function (dir) {
      var _this$props3 = _this.props,
          selectedParent = _this$props3.selectedParent,
          selectedKeys = _this$props3.selectedKeys,
          dataLookUpKey = _this$props3.dataLookUpKey,
          dataLookUpChildren = _this$props3.dataLookUpChildren;

      if (!selectedKeys.length) return true;

      var parentArr = Array.isArray(selectedParent) ? selectedParent : selectedParent[dataLookUpChildren];
      var index = parentArr.findIndex(function (item) {
        return item[dataLookUpKey] === selectedKeys[0];
      });

      if (dir === 'up') return index === 0;
      return index === parentArr.length - 1;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Swaps array elements
   * @param original - original array
   * @param dir - click direction ('up/down')
   * @returns {*}
   */


  /**
   * Returns a new tree after re-ordering (arrow button click)
   * @param dir
   * @param array
   * @returns {*}
   */


  /**
   * Is ordering arrow disabled
   * @param dir ('up/down')
   * @returns {boolean}
   */


  OrderingArrows.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'ordering-arrows' },
      _react2.default.createElement('button', {
        onClick: this.onUpClick,
        className: 'up-arrow ',
        disabled: this.isArrowDisabled('up'),
        type: 'button'
      }),
      _react2.default.createElement('button', {
        onClick: this.onDownClick,
        className: 'down-arrow',
        disabled: this.isArrowDisabled('down'),
        type: 'button'
      })
    );
  };

  return OrderingArrows;
}(_react2.default.PureComponent), _class.defaultProps = {
  selectedKeys: [],
  selectedParent: null
}, _temp2);
exports.default = OrderingArrows;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLW9yZGVyaW5nLWFycm93cy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIk9yZGVyaW5nQXJyb3dzIiwib25VcENsaWNrIiwibmV3SXRlbXMiLCJnZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQiLCJwcm9wcyIsIm9uT3JkZXJCdXR0b25DbGljayIsIm9uRG93bkNsaWNrIiwiZ2V0QXJyYW5nZWRBcnJheSIsIm9yaWdpbmFsIiwiZGlyIiwiZGF0YUxvb2tVcEtleSIsInNlbGVjdGVkS2V5cyIsImlkIiwibW9kaWZpZWQiLCJzbGljZSIsInN0YXJ0SW5kZXgiLCJmaW5kSW5kZXgiLCJpdGVtIiwiZW5kSW5kZXgiLCJsZW5ndGgiLCJzd2FwcGVkIiwiYXJyYXkiLCJ0cmVlRGF0YSIsImRhdGFMb29rVXBDaGlsZHJlbiIsIlR5cGVFcnJvciIsImZvdW5kIiwiZmluZCIsImkiLCJjaGlsZCIsImlzQXJyb3dEaXNhYmxlZCIsInNlbGVjdGVkUGFyZW50IiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7Z0tBa0JuQkMsUyxHQUFZLFlBQU07QUFDaEIsVUFBTUMsV0FBVyxNQUFLQyx3QkFBTCxDQUE4QixJQUE5QixDQUFqQjtBQUNBLFlBQUtDLEtBQUwsQ0FBV0Msa0JBQVgsQ0FBOEJILFFBQTlCO0FBQ0QsSyxRQUVESSxXLEdBQWMsWUFBTTtBQUNsQixVQUFNSixXQUFXLE1BQUtDLHdCQUFMLENBQThCLE1BQTlCLENBQWpCO0FBQ0EsWUFBS0MsS0FBTCxDQUFXQyxrQkFBWCxDQUE4QkgsUUFBOUI7QUFDRCxLLFFBUURLLGdCLEdBQW1CLFVBQUNDLFFBQUQsRUFBV0MsR0FBWCxFQUFtQjtBQUFBLHdCQUNJLE1BQUtMLEtBRFQ7QUFBQSxV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UCxnQkFFT0EsYUFGUDtBQUFBLFVBRXNCYSxrQkFGdEIsZ0JBRXNCQSxrQkFGdEI7O0FBSXpCLFVBQUksQ0FBQ1osYUFBYVEsTUFBbEIsRUFBMEIsT0FBTyxJQUFQOztBQUUxQixVQUFNWSxZQUFZQyxNQUFNQyxPQUFOLENBQWNILGNBQWQsSUFDaEJBLGNBRGdCLEdBQ0NBLGVBQWVQLGtCQUFmLENBRG5CO0FBRUEsVUFBTVcsUUFBUUgsVUFBVWYsU0FBVixDQUFvQjtBQUFBLGVBQVFDLEtBQUtQLGFBQUwsTUFBd0JDLGFBQWEsQ0FBYixDQUFoQztBQUFBLE9BQXBCLENBQWQ7O0FBRUEsVUFBSUYsUUFBUSxJQUFaLEVBQWtCLE9BQU95QixVQUFVLENBQWpCO0FBQ2xCLGFBQU9BLFVBQVVILFVBQVVaLE1BQVYsR0FBbUIsQ0FBcEM7QUFDRCxLOzs7QUFoRkQ7Ozs7Ozs7O0FBMEJBOzs7Ozs7OztBQXFDQTs7Ozs7OzsyQkFtQkFnQixNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFDRSxpQkFBUyxLQUFLbEMsU0FEaEI7QUFFRSxtQkFBVSxXQUZaO0FBR0Usa0JBQVUsS0FBSzRCLGVBQUwsQ0FBcUIsSUFBckIsQ0FIWjtBQUlFLGNBQUs7QUFKUCxRQURGO0FBT0U7QUFDRSxpQkFBUyxLQUFLdkIsV0FEaEI7QUFFRSxtQkFBVSxZQUZaO0FBR0Usa0JBQVUsS0FBS3VCLGVBQUwsQ0FBcUIsTUFBckIsQ0FIWjtBQUlFLGNBQUs7QUFKUDtBQVBGLEtBREY7QUFnQkQsRzs7O0VBL0h5QyxnQkFBTU8sYSxVQWF6Q0MsWSxHQUFlO0FBQ3BCMUIsZ0JBQWMsRUFETTtBQUVwQm1CLGtCQUFnQjtBQUZJLEM7a0JBYkg5QixjIiwiZmlsZSI6InRyZWUtb3JkZXJpbmctYXJyb3dzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlcmluZ0Fycm93cyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXHJcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSkuaXNSZXF1aXJlZCxcclxuICAgIHNlbGVjdGVkUGFyZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHt9KSxcclxuICAgICAgUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgXSksXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHNlbGVjdGVkS2V5czogW10sXHJcbiAgICBzZWxlY3RlZFBhcmVudDogbnVsbCxcclxuICB9O1xyXG5cclxuICBvblVwQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWVBZnRlclNoaWZ0KCd1cCcpO1xyXG4gICAgdGhpcy5wcm9wcy5vbk9yZGVyQnV0dG9uQ2xpY2sobmV3SXRlbXMpO1xyXG4gIH07XHJcblxyXG4gIG9uRG93bkNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlQWZ0ZXJTaGlmdCgnZG93bicpO1xyXG4gICAgdGhpcy5wcm9wcy5vbk9yZGVyQnV0dG9uQ2xpY2sobmV3SXRlbXMpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFN3YXBzIGFycmF5IGVsZW1lbnRzXHJcbiAgICogQHBhcmFtIG9yaWdpbmFsIC0gb3JpZ2luYWwgYXJyYXlcclxuICAgKiBAcGFyYW0gZGlyIC0gY2xpY2sgZGlyZWN0aW9uICgndXAvZG93bicpXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICovXHJcbiAgZ2V0QXJyYW5nZWRBcnJheSA9IChvcmlnaW5hbCwgZGlyKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIHNlbGVjdGVkS2V5cyB9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGlkID0gc2VsZWN0ZWRLZXlzWzBdO1xyXG4gICAgY29uc3QgbW9kaWZpZWQgPSBvcmlnaW5hbC5zbGljZSgpO1xyXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IG1vZGlmaWVkLmZpbmRJbmRleChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcclxuICAgIGxldCBlbmRJbmRleCA9IHN0YXJ0SW5kZXg7XHJcblxyXG4gICAgaWYgKGRpciA9PT0gJ3VwJyAmJiBzdGFydEluZGV4ID4gMCkge1xyXG4gICAgICBlbmRJbmRleCAtPSAxO1xyXG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdkb3duJyAmJiBzdGFydEluZGV4IDwgbW9kaWZpZWQubGVuZ3RoIC0gMSkge1xyXG4gICAgICBlbmRJbmRleCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3YXBwZWQgPSBtb2RpZmllZFtzdGFydEluZGV4XTtcclxuICAgIG1vZGlmaWVkW3N0YXJ0SW5kZXhdID0gbW9kaWZpZWRbZW5kSW5kZXhdO1xyXG4gICAgbW9kaWZpZWRbZW5kSW5kZXhdID0gc3dhcHBlZDtcclxuXHJcbiAgICByZXR1cm4gbW9kaWZpZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIG5ldyB0cmVlIGFmdGVyIHJlLW9yZGVyaW5nIChhcnJvdyBidXR0b24gY2xpY2spXHJcbiAgICogQHBhcmFtIGRpclxyXG4gICAqIEBwYXJhbSBhcnJheVxyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqL1xyXG4gIGdldFVwZGF0ZWRUcmVlQWZ0ZXJTaGlmdCA9IChkaXIsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzZWxlY3RlZEtleXMsIGRhdGFMb29rVXBLZXksIG9uT3JkZXJCdXR0b25DbGljaywgZGF0YUxvb2tVcENoaWxkcmVuLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAoc2VsZWN0ZWRLZXlzLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFvbk9yZGVyQnV0dG9uQ2xpY2spIHRocm93IFR5cGVFcnJvcignVHJlZTogb25PcmRlckJ1dHRvbkNsaWNrIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XHJcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XHJcbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkS2V5c1swXTtcclxuXHJcbiAgICAvLyBJZiBpdGVtIGlzIGZvdW5kIG9uIG1haW4gbGV2ZWw6XHJcbiAgICBsZXQgZm91bmQgPSBuZXdJdGVtcy5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xyXG4gICAgaWYgKGZvdW5kKSByZXR1cm4gdGhpcy5nZXRBcnJhbmdlZEFycmF5KGFycmF5LCBkaXIpO1xyXG5cclxuICAgIC8vIE90aGVyd2lzZS4uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcclxuICAgICAgaWYgKCFmb3VuZCAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pIHtcclxuICAgICAgICBmb3VuZCA9ICEhaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcclxuICAgICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IHRoaXMuZ2V0QXJyYW5nZWRBcnJheShpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIGRpcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcclxuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQoZGlyLCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIG9yZGVyaW5nIGFycm93IGRpc2FibGVkXHJcbiAgICogQHBhcmFtIGRpciAoJ3VwL2Rvd24nKVxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzQXJyb3dEaXNhYmxlZCA9IChkaXIpID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2VsZWN0ZWRQYXJlbnQsIHNlbGVjdGVkS2V5cywgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuLFxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAoIXNlbGVjdGVkS2V5cy5sZW5ndGgpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRQYXJlbnQpID9cclxuICAgICAgc2VsZWN0ZWRQYXJlbnQgOiBzZWxlY3RlZFBhcmVudFtkYXRhTG9va1VwQ2hpbGRyZW5dO1xyXG4gICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gc2VsZWN0ZWRLZXlzWzBdKTtcclxuXHJcbiAgICBpZiAoZGlyID09PSAndXAnKSByZXR1cm4gaW5kZXggPT09IDA7XHJcbiAgICByZXR1cm4gaW5kZXggPT09IHBhcmVudEFyci5sZW5ndGggLSAxO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXJpbmctYXJyb3dzXCI+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgb25DbGljaz17dGhpcy5vblVwQ2xpY2t9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ1cC1hcnJvdyBcIlxyXG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBcnJvd0Rpc2FibGVkKCd1cCcpfVxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRG93bkNsaWNrfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZG93bi1hcnJvd1wiXHJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0Fycm93RGlzYWJsZWQoJ2Rvd24nKX1cclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19