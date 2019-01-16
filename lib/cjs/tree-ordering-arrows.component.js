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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLW9yZGVyaW5nLWFycm93cy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIk9yZGVyaW5nQXJyb3dzIiwib25VcENsaWNrIiwibmV3SXRlbXMiLCJnZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQiLCJwcm9wcyIsIm9uT3JkZXJCdXR0b25DbGljayIsIm9uRG93bkNsaWNrIiwiZ2V0QXJyYW5nZWRBcnJheSIsIm9yaWdpbmFsIiwiZGlyIiwiZGF0YUxvb2tVcEtleSIsInNlbGVjdGVkS2V5cyIsImlkIiwibW9kaWZpZWQiLCJzbGljZSIsInN0YXJ0SW5kZXgiLCJmaW5kSW5kZXgiLCJpdGVtIiwiZW5kSW5kZXgiLCJsZW5ndGgiLCJzd2FwcGVkIiwiYXJyYXkiLCJ0cmVlRGF0YSIsImRhdGFMb29rVXBDaGlsZHJlbiIsIlR5cGVFcnJvciIsImZvdW5kIiwiZmluZCIsImkiLCJjaGlsZCIsImlzQXJyb3dEaXNhYmxlZCIsInNlbGVjdGVkUGFyZW50IiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7Z0tBa0JuQkMsUyxHQUFZLFlBQU07QUFDaEIsVUFBTUMsV0FBVyxNQUFLQyx3QkFBTCxDQUE4QixJQUE5QixDQUFqQjtBQUNBLFlBQUtDLEtBQUwsQ0FBV0Msa0JBQVgsQ0FBOEJILFFBQTlCO0FBQ0QsSyxRQUVESSxXLEdBQWMsWUFBTTtBQUNsQixVQUFNSixXQUFXLE1BQUtDLHdCQUFMLENBQThCLE1BQTlCLENBQWpCO0FBQ0EsWUFBS0MsS0FBTCxDQUFXQyxrQkFBWCxDQUE4QkgsUUFBOUI7QUFDRCxLLFFBUURLLGdCLEdBQW1CLFVBQUNDLFFBQUQsRUFBV0MsR0FBWCxFQUFtQjtBQUFBLHdCQUNJLE1BQUtMLEtBRFQ7QUFBQSxV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UCxnQkFFT0EsYUFGUDtBQUFBLFVBRXNCYSxrQkFGdEIsZ0JBRXNCQSxrQkFGdEI7O0FBSXpCLFVBQUksQ0FBQ1osYUFBYVEsTUFBbEIsRUFBMEIsT0FBTyxJQUFQOztBQUUxQixVQUFNWSxZQUFZQyxNQUFNQyxPQUFOLENBQWNILGNBQWQsSUFDZEEsY0FEYyxHQUNHQSxlQUFlUCxrQkFBZixDQURyQjtBQUVBLFVBQU1XLFFBQVFILFVBQVVmLFNBQVYsQ0FBb0I7QUFBQSxlQUFRQyxLQUFLUCxhQUFMLE1BQXdCQyxhQUFhLENBQWIsQ0FBaEM7QUFBQSxPQUFwQixDQUFkOztBQUVBLFVBQUlGLFFBQVEsSUFBWixFQUFrQixPQUFPeUIsVUFBVSxDQUFqQjtBQUNsQixhQUFPQSxVQUFVSCxVQUFVWixNQUFWLEdBQW1CLENBQXBDO0FBQ0QsSzs7O0FBaEZEOzs7Ozs7OztBQTBCQTs7Ozs7Ozs7QUFxQ0E7Ozs7Ozs7MkJBbUJBZ0IsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxpQkFBZjtBQUNFO0FBQ0UsaUJBQVMsS0FBS2xDLFNBRGhCO0FBRUUsbUJBQVUsV0FGWjtBQUdFLGtCQUFVLEtBQUs0QixlQUFMLENBQXFCLElBQXJCLENBSFo7QUFJRSxjQUFLO0FBSlAsUUFERjtBQU9FO0FBQ0UsaUJBQVMsS0FBS3ZCLFdBRGhCO0FBRUUsbUJBQVUsWUFGWjtBQUdFLGtCQUFVLEtBQUt1QixlQUFMLENBQXFCLE1BQXJCLENBSFo7QUFJRSxjQUFLO0FBSlA7QUFQRixLQURGO0FBZ0JELEc7OztFQS9IeUMsZ0JBQU1PLGEsVUFhekNDLFksR0FBZTtBQUNwQjFCLGdCQUFjLEVBRE07QUFFcEJtQixrQkFBZ0I7QUFGSSxDO2tCQWJIOUIsYyIsImZpbGUiOiJ0cmVlLW9yZGVyaW5nLWFycm93cy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJpbmdBcnJvd3MgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbk9yZGVyQnV0dG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGF0YUxvb2tVcEtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRhdGFMb29rVXBDaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgdHJlZURhdGE6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7fSkpLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRQYXJlbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnNoYXBlKHt9KSxcbiAgICAgIFByb3BUeXBlcy5hcnJheSxcbiAgICBdKSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgc2VsZWN0ZWRQYXJlbnQ6IG51bGwsXG4gIH07XG5cbiAgb25VcENsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQoJ3VwJyk7XG4gICAgdGhpcy5wcm9wcy5vbk9yZGVyQnV0dG9uQ2xpY2sobmV3SXRlbXMpO1xuICB9O1xuXG4gIG9uRG93bkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gdGhpcy5nZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQoJ2Rvd24nKTtcbiAgICB0aGlzLnByb3BzLm9uT3JkZXJCdXR0b25DbGljayhuZXdJdGVtcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFN3YXBzIGFycmF5IGVsZW1lbnRzXG4gICAqIEBwYXJhbSBvcmlnaW5hbCAtIG9yaWdpbmFsIGFycmF5XG4gICAqIEBwYXJhbSBkaXIgLSBjbGljayBkaXJlY3Rpb24gKCd1cC9kb3duJylcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRBcnJhbmdlZEFycmF5ID0gKG9yaWdpbmFsLCBkaXIpID0+IHtcbiAgICBjb25zdCB7IGRhdGFMb29rVXBLZXksIHNlbGVjdGVkS2V5cyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkS2V5c1swXTtcbiAgICBjb25zdCBtb2RpZmllZCA9IG9yaWdpbmFsLnNsaWNlKCk7XG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IG1vZGlmaWVkLmZpbmRJbmRleChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBsZXQgZW5kSW5kZXggPSBzdGFydEluZGV4O1xuXG4gICAgaWYgKGRpciA9PT0gJ3VwJyAmJiBzdGFydEluZGV4ID4gMCkge1xuICAgICAgZW5kSW5kZXggLT0gMTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ2Rvd24nICYmIHN0YXJ0SW5kZXggPCBtb2RpZmllZC5sZW5ndGggLSAxKSB7XG4gICAgICBlbmRJbmRleCArPSAxO1xuICAgIH1cblxuICAgIGNvbnN0IHN3YXBwZWQgPSBtb2RpZmllZFtzdGFydEluZGV4XTtcbiAgICBtb2RpZmllZFtzdGFydEluZGV4XSA9IG1vZGlmaWVkW2VuZEluZGV4XTtcbiAgICBtb2RpZmllZFtlbmRJbmRleF0gPSBzd2FwcGVkO1xuXG4gICAgcmV0dXJuIG1vZGlmaWVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IHRyZWUgYWZ0ZXIgcmUtb3JkZXJpbmcgKGFycm93IGJ1dHRvbiBjbGljaylcbiAgICogQHBhcmFtIGRpclxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQgPSAoZGlyLCBhcnJheSA9IHRoaXMucHJvcHMudHJlZURhdGEpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZEtleXMsIGRhdGFMb29rVXBLZXksIG9uT3JkZXJCdXR0b25DbGljaywgZGF0YUxvb2tVcENoaWxkcmVuLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzZWxlY3RlZEtleXMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFvbk9yZGVyQnV0dG9uQ2xpY2spIHRocm93IFR5cGVFcnJvcignVHJlZTogb25PcmRlckJ1dHRvbkNsaWNrIGNhbGxiYWNrIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBhcnJheS5zbGljZSgpO1xuICAgIGNvbnN0IGlkID0gc2VsZWN0ZWRLZXlzWzBdO1xuXG4gICAgLy8gSWYgaXRlbSBpcyBmb3VuZCBvbiBtYWluIGxldmVsOlxuICAgIGxldCBmb3VuZCA9IG5ld0l0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgaWYgKGZvdW5kKSByZXR1cm4gdGhpcy5nZXRBcnJhbmdlZEFycmF5KGFycmF5LCBkaXIpO1xuXG4gICAgLy8gT3RoZXJ3aXNlLi5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3SXRlbXNbaV07XG4gICAgICBpZiAoIWZvdW5kICYmIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSkge1xuICAgICAgICBmb3VuZCA9ICEhaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLmZpbmQoY2hpbGQgPT4gY2hpbGRbZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dID0gdGhpcy5nZXRBcnJhbmdlZEFycmF5KGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSwgZGlyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dICYmICFmb3VuZCkge1xuICAgICAgICAgIGZvdW5kID0gdGhpcy5nZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQoZGlyLCBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIG9yZGVyaW5nIGFycm93IGRpc2FibGVkXG4gICAqIEBwYXJhbSBkaXIgKCd1cC9kb3duJylcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0Fycm93RGlzYWJsZWQgPSAoZGlyKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRQYXJlbnQsIHNlbGVjdGVkS2V5cywgZGF0YUxvb2tVcEtleSwgZGF0YUxvb2tVcENoaWxkcmVuLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghc2VsZWN0ZWRLZXlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCBwYXJlbnRBcnIgPSBBcnJheS5pc0FycmF5KHNlbGVjdGVkUGFyZW50KVxuICAgICAgPyBzZWxlY3RlZFBhcmVudCA6IHNlbGVjdGVkUGFyZW50W2RhdGFMb29rVXBDaGlsZHJlbl07XG4gICAgY29uc3QgaW5kZXggPSBwYXJlbnRBcnIuZmluZEluZGV4KGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gc2VsZWN0ZWRLZXlzWzBdKTtcblxuICAgIGlmIChkaXIgPT09ICd1cCcpIHJldHVybiBpbmRleCA9PT0gMDtcbiAgICByZXR1cm4gaW5kZXggPT09IHBhcmVudEFyci5sZW5ndGggLSAxO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvcmRlcmluZy1hcnJvd3NcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25VcENsaWNrfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInVwLWFycm93IFwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBcnJvd0Rpc2FibGVkKCd1cCcpfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAvPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkRvd25DbGlja31cbiAgICAgICAgICBjbGFzc05hbWU9XCJkb3duLWFycm93XCJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0Fycm93RGlzYWJsZWQoJ2Rvd24nKX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==