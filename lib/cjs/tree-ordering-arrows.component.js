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
        disabled: this.isArrowDisabled('up')
      }),
      _react2.default.createElement('button', {
        onClick: this.onDownClick,
        className: 'down-arrow',
        disabled: this.isArrowDisabled('down')
      })
    );
  };

  return OrderingArrows;
}(_react2.default.PureComponent), _class.defaultProps = {
  selectedKeys: [],
  selectedParent: null
}, _temp2);
exports.default = OrderingArrows;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLW9yZGVyaW5nLWFycm93cy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIk9yZGVyaW5nQXJyb3dzIiwib25VcENsaWNrIiwibmV3SXRlbXMiLCJnZXRVcGRhdGVkVHJlZUFmdGVyU2hpZnQiLCJwcm9wcyIsIm9uT3JkZXJCdXR0b25DbGljayIsIm9uRG93bkNsaWNrIiwiZ2V0QXJyYW5nZWRBcnJheSIsIm9yaWdpbmFsIiwiZGlyIiwiZGF0YUxvb2tVcEtleSIsInNlbGVjdGVkS2V5cyIsImlkIiwibW9kaWZpZWQiLCJzbGljZSIsInN0YXJ0SW5kZXgiLCJmaW5kSW5kZXgiLCJpdGVtIiwiZW5kSW5kZXgiLCJsZW5ndGgiLCJzd2FwcGVkIiwiYXJyYXkiLCJ0cmVlRGF0YSIsImRhdGFMb29rVXBDaGlsZHJlbiIsIlR5cGVFcnJvciIsImZvdW5kIiwiZmluZCIsImkiLCJjaGlsZCIsImlzQXJyb3dEaXNhYmxlZCIsInNlbGVjdGVkUGFyZW50IiwicGFyZW50QXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXgiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7Z0tBa0JuQkMsUyxHQUFZLFlBQU07QUFDaEIsVUFBTUMsV0FBVyxNQUFLQyx3QkFBTCxDQUE4QixJQUE5QixDQUFqQjtBQUNBLFlBQUtDLEtBQUwsQ0FBV0Msa0JBQVgsQ0FBOEJILFFBQTlCO0FBQ0QsSyxRQUVESSxXLEdBQWMsWUFBTTtBQUNsQixVQUFNSixXQUFXLE1BQUtDLHdCQUFMLENBQThCLE1BQTlCLENBQWpCO0FBQ0EsWUFBS0MsS0FBTCxDQUFXQyxrQkFBWCxDQUE4QkgsUUFBOUI7QUFDRCxLLFFBUURLLGdCLEdBQW1CLFVBQUNDLFFBQUQsRUFBV0MsR0FBWCxFQUFtQjtBQUFBLHdCQUNJLE1BQUtMLEtBRFQ7QUFBQSxV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UCxnQkFFT0EsYUFGUDtBQUFBLFVBRXNCYSxrQkFGdEIsZ0JBRXNCQSxrQkFGdEI7O0FBSXpCLFVBQUksQ0FBQ1osYUFBYVEsTUFBbEIsRUFBMEIsT0FBTyxJQUFQOztBQUUxQixVQUFNWSxZQUFZQyxNQUFNQyxPQUFOLENBQWNILGNBQWQsSUFDaEJBLGNBRGdCLEdBQ0NBLGVBQWVQLGtCQUFmLENBRG5CO0FBRUEsVUFBTVcsUUFBUUgsVUFBVWYsU0FBVixDQUFvQjtBQUFBLGVBQVFDLEtBQUtQLGFBQUwsTUFBd0JDLGFBQWEsQ0FBYixDQUFoQztBQUFBLE9BQXBCLENBQWQ7O0FBRUEsVUFBSUYsUUFBUSxJQUFaLEVBQWtCLE9BQU95QixVQUFVLENBQWpCO0FBQ2xCLGFBQU9BLFVBQVVILFVBQVVaLE1BQVYsR0FBbUIsQ0FBcEM7QUFDRCxLOzs7QUFoRkQ7Ozs7Ozs7O0FBMEJBOzs7Ozs7OztBQXFDQTs7Ozs7OzsyQkFtQkFnQixNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFDRSxpQkFBUyxLQUFLbEMsU0FEaEI7QUFFRSxtQkFBVSxXQUZaO0FBR0Usa0JBQVUsS0FBSzRCLGVBQUwsQ0FBcUIsSUFBckI7QUFIWixRQURGO0FBTUU7QUFDRSxpQkFBUyxLQUFLdkIsV0FEaEI7QUFFRSxtQkFBVSxZQUZaO0FBR0Usa0JBQVUsS0FBS3VCLGVBQUwsQ0FBcUIsTUFBckI7QUFIWjtBQU5GLEtBREY7QUFjRCxHOzs7RUE3SHlDLGdCQUFNTyxhLFVBYXpDQyxZLEdBQWU7QUFDcEIxQixnQkFBYyxFQURNO0FBRXBCbUIsa0JBQWdCO0FBRkksQztrQkFiSDlCLGMiLCJmaWxlIjoidHJlZS1vcmRlcmluZy1hcnJvd3MuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyaW5nQXJyb3dzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25PcmRlckJ1dHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGRhdGFMb29rVXBLZXk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkYXRhTG9va1VwQ2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZEtleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIHRyZWVEYXRhOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe30pKS5pc1JlcXVpcmVkLFxuICAgIHNlbGVjdGVkUGFyZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7fSksXG4gICAgICBQcm9wVHlwZXMuYXJyYXksXG4gICAgXSksXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgIHNlbGVjdGVkUGFyZW50OiBudWxsLFxuICB9O1xuXG4gIG9uVXBDbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWVBZnRlclNoaWZ0KCd1cCcpO1xuICAgIHRoaXMucHJvcHMub25PcmRlckJ1dHRvbkNsaWNrKG5ld0l0ZW1zKTtcbiAgfTtcblxuICBvbkRvd25DbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtcyA9IHRoaXMuZ2V0VXBkYXRlZFRyZWVBZnRlclNoaWZ0KCdkb3duJyk7XG4gICAgdGhpcy5wcm9wcy5vbk9yZGVyQnV0dG9uQ2xpY2sobmV3SXRlbXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTd2FwcyBhcnJheSBlbGVtZW50c1xuICAgKiBAcGFyYW0gb3JpZ2luYWwgLSBvcmlnaW5hbCBhcnJheVxuICAgKiBAcGFyYW0gZGlyIC0gY2xpY2sgZGlyZWN0aW9uICgndXAvZG93bicpXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0QXJyYW5nZWRBcnJheSA9IChvcmlnaW5hbCwgZGlyKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhTG9va1VwS2V5LCBzZWxlY3RlZEtleXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaWQgPSBzZWxlY3RlZEtleXNbMF07XG4gICAgY29uc3QgbW9kaWZpZWQgPSBvcmlnaW5hbC5zbGljZSgpO1xuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBtb2RpZmllZC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgbGV0IGVuZEluZGV4ID0gc3RhcnRJbmRleDtcblxuICAgIGlmIChkaXIgPT09ICd1cCcgJiYgc3RhcnRJbmRleCA+IDApIHtcbiAgICAgIGVuZEluZGV4IC09IDE7XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdkb3duJyAmJiBzdGFydEluZGV4IDwgbW9kaWZpZWQubGVuZ3RoIC0gMSkge1xuICAgICAgZW5kSW5kZXggKz0gMTtcbiAgICB9XG5cbiAgICBjb25zdCBzd2FwcGVkID0gbW9kaWZpZWRbc3RhcnRJbmRleF07XG4gICAgbW9kaWZpZWRbc3RhcnRJbmRleF0gPSBtb2RpZmllZFtlbmRJbmRleF07XG4gICAgbW9kaWZpZWRbZW5kSW5kZXhdID0gc3dhcHBlZDtcblxuICAgIHJldHVybiBtb2RpZmllZDtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB0cmVlIGFmdGVyIHJlLW9yZGVyaW5nIChhcnJvdyBidXR0b24gY2xpY2spXG4gICAqIEBwYXJhbSBkaXJcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VXBkYXRlZFRyZWVBZnRlclNoaWZ0ID0gKGRpciwgYXJyYXkgPSB0aGlzLnByb3BzLnRyZWVEYXRhKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2VsZWN0ZWRLZXlzLCBkYXRhTG9va1VwS2V5LCBvbk9yZGVyQnV0dG9uQ2xpY2ssIGRhdGFMb29rVXBDaGlsZHJlbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2VsZWN0ZWRLZXlzLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghb25PcmRlckJ1dHRvbkNsaWNrKSB0aHJvdyBUeXBlRXJyb3IoJ1RyZWU6IG9uT3JkZXJCdXR0b25DbGljayBjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gYXJyYXkuc2xpY2UoKTtcbiAgICBjb25zdCBpZCA9IHNlbGVjdGVkS2V5c1swXTtcblxuICAgIC8vIElmIGl0ZW0gaXMgZm91bmQgb24gbWFpbiBsZXZlbDpcbiAgICBsZXQgZm91bmQgPSBuZXdJdGVtcy5maW5kKGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGlmIChmb3VuZCkgcmV0dXJuIHRoaXMuZ2V0QXJyYW5nZWRBcnJheShhcnJheSwgZGlyKTtcblxuICAgIC8vIE90aGVyd2lzZS4uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgaWYgKCFmb3VuZCAmJiBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0pIHtcbiAgICAgICAgZm91bmQgPSAhIWl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXS5maW5kKGNoaWxkID0+IGNoaWxkW2RhdGFMb29rVXBLZXldID09PSBpZCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSA9IHRoaXMuZ2V0QXJyYW5nZWRBcnJheShpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0sIGRpcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSAmJiAhZm91bmQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRoaXMuZ2V0VXBkYXRlZFRyZWVBZnRlclNoaWZ0KGRpciwgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBvcmRlcmluZyBhcnJvdyBkaXNhYmxlZFxuICAgKiBAcGFyYW0gZGlyICgndXAvZG93bicpXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNBcnJvd0Rpc2FibGVkID0gKGRpcikgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkUGFyZW50LCBzZWxlY3RlZEtleXMsIGRhdGFMb29rVXBLZXksIGRhdGFMb29rVXBDaGlsZHJlbixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXNlbGVjdGVkS2V5cy5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgcGFyZW50QXJyID0gQXJyYXkuaXNBcnJheShzZWxlY3RlZFBhcmVudCkgP1xuICAgICAgc2VsZWN0ZWRQYXJlbnQgOiBzZWxlY3RlZFBhcmVudFtkYXRhTG9va1VwQ2hpbGRyZW5dO1xuICAgIGNvbnN0IGluZGV4ID0gcGFyZW50QXJyLmZpbmRJbmRleChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IHNlbGVjdGVkS2V5c1swXSk7XG5cbiAgICBpZiAoZGlyID09PSAndXAnKSByZXR1cm4gaW5kZXggPT09IDA7XG4gICAgcmV0dXJuIGluZGV4ID09PSBwYXJlbnRBcnIubGVuZ3RoIC0gMTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXJpbmctYXJyb3dzXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uVXBDbGlja31cbiAgICAgICAgICBjbGFzc05hbWU9XCJ1cC1hcnJvdyBcIlxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQXJyb3dEaXNhYmxlZCgndXAnKX1cbiAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Eb3duQ2xpY2t9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZG93bi1hcnJvd1wiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNBcnJvd0Rpc2FibGVkKCdkb3duJyl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=