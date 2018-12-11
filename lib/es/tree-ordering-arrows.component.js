var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

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
    return React.createElement(
      'div',
      { className: 'ordering-arrows' },
      React.createElement('button', {
        onClick: this.onUpClick,
        className: 'up-arrow ',
        disabled: this.isArrowDisabled('up')
      }),
      React.createElement('button', {
        onClick: this.onDownClick,
        className: 'down-arrow',
        disabled: this.isArrowDisabled('down')
      })
    );
  };

  return OrderingArrows;
}(React.PureComponent), _class.defaultProps = {
  selectedKeys: [],
  selectedParent: null
}, _temp2);
export { OrderingArrows as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmVlLW9yZGVyaW5nLWFycm93cy5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiT3JkZXJpbmdBcnJvd3MiLCJvblVwQ2xpY2siLCJuZXdJdGVtcyIsImdldFVwZGF0ZWRUcmVlQWZ0ZXJTaGlmdCIsInByb3BzIiwib25PcmRlckJ1dHRvbkNsaWNrIiwib25Eb3duQ2xpY2siLCJnZXRBcnJhbmdlZEFycmF5Iiwib3JpZ2luYWwiLCJkaXIiLCJkYXRhTG9va1VwS2V5Iiwic2VsZWN0ZWRLZXlzIiwiaWQiLCJtb2RpZmllZCIsInNsaWNlIiwic3RhcnRJbmRleCIsImZpbmRJbmRleCIsIml0ZW0iLCJlbmRJbmRleCIsImxlbmd0aCIsInN3YXBwZWQiLCJhcnJheSIsInRyZWVEYXRhIiwiZGF0YUxvb2tVcENoaWxkcmVuIiwiVHlwZUVycm9yIiwiZm91bmQiLCJmaW5kIiwiaSIsImNoaWxkIiwiaXNBcnJvd0Rpc2FibGVkIiwic2VsZWN0ZWRQYXJlbnQiLCJwYXJlbnRBcnIiLCJBcnJheSIsImlzQXJyYXkiLCJpbmRleCIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0lBRXFCQyxjOzs7Ozs7Ozs7Ozs7Z0tBa0JuQkMsUyxHQUFZLFlBQU07QUFDaEIsVUFBTUMsV0FBVyxNQUFLQyx3QkFBTCxDQUE4QixJQUE5QixDQUFqQjtBQUNBLFlBQUtDLEtBQUwsQ0FBV0Msa0JBQVgsQ0FBOEJILFFBQTlCO0FBQ0QsSyxRQUVESSxXLEdBQWMsWUFBTTtBQUNsQixVQUFNSixXQUFXLE1BQUtDLHdCQUFMLENBQThCLE1BQTlCLENBQWpCO0FBQ0EsWUFBS0MsS0FBTCxDQUFXQyxrQkFBWCxDQUE4QkgsUUFBOUI7QUFDRCxLLFFBUURLLGdCLEdBQW1CLFVB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RXZCQSxjQUZ1QjtBQUFBLFVBRVBuQixZQUZPLGdCQUVQQSxZQUZPO0FBQUEsVUFFT0QsYUFGUCxnQkFFT0EsYUFGUDtBQUFBLFVBRXNCYSxrQkFGdEIsZ0JBRXNCQSxrQkFGdEI7O0FBSXpCLFVBQUksQ0FBQ1osYUFBYVEsTUFBbEIsRUFBMEIsT0FBTyxJQUFQOztBQUUxQixVQUFNWSxZQUFZQyxNQUFNQyxPQUFOLENBQWNILGNBQWQsSUFDaEJBLGNBRGdCLEdBQ0NBLGVBQWVQLGtCQUFmLENBRG5CO0FBRUEsVUFBTVcsUUFBUUgsVUFBVWYsU0FBVixDQUFvQjtBQUFBLGVBQVFDLEtBQUtQLGFBQUwsTUFBd0JDLGFBQWEsQ0FBYixDQUFoQztBQUFBLE9BQXBCLENBQWQ7O0FBRUEsVUFBSUYsUUFBUSxJQUFaLEVBQWtCLE9BQU95QixVQUFVLENBQWpCO0FBQ2xCLGFBQU9BLFVBQVVILFVBQVVaLE1BQVYsR0FBbUIsQ0FBcEM7QUFDRCxLOzs7QUFoRkQ7Ozs7Ozs7O0FBMEJBOzs7Ozs7OztBQXFDQTs7Ozs7OzsyQkFtQkFnQixNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFDRSxpQkFBUyxLQUFLbEMsU0FEaEI7QUFFRSxtQkFBVSxXQUZaO0FBR0Usa0JBQVUsS0FBSzRCLGVBQUwsQ0FBcUIsSUFBckI7QUFIWixRQURGO0FBTUU7QUFDRSxpQkFBUyxLQUFLdkIsV0FEaEI7QUFFRSxtQkFBVSxZQUZaO0FBR0Usa0JBQVUsS0FBS3VCLGVBQUwsQ0FBcUIsTUFBckI7QUFIWjtBQU5GLEtBREY7QUFjRCxHOzs7RUE3SHlDL0IsTUFBTXNDLGEsVUFhekNDLFksR0FBZTtBQUNwQjFCLGdCQUFjLEVBRE07QUFFcEJtQixrQkFBZ0I7QUFGSSxDO1NBYkg5QixjIiwiZmlsZSI6InRyZWUtb3JkZXJpbmctYXJyb3dzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlcmluZ0Fycm93cyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uT3JkZXJCdXR0b25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBkYXRhTG9va1VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGF0YUxvb2tVcENoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc2VsZWN0ZWRLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICB0cmVlRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHt9KSkuaXNSZXF1aXJlZCxcbiAgICBzZWxlY3RlZFBhcmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe30pLFxuICAgICAgUHJvcFR5cGVzLmFycmF5LFxuICAgIF0pLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICBzZWxlY3RlZFBhcmVudDogbnVsbCxcbiAgfTtcblxuICBvblVwQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlQWZ0ZXJTaGlmdCgndXAnKTtcbiAgICB0aGlzLnByb3BzLm9uT3JkZXJCdXR0b25DbGljayhuZXdJdGVtcyk7XG4gIH07XG5cbiAgb25Eb3duQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbXMgPSB0aGlzLmdldFVwZGF0ZWRUcmVlQWZ0ZXJTaGlmdCgnZG93bicpO1xuICAgIHRoaXMucHJvcHMub25PcmRlckJ1dHRvbkNsaWNrKG5ld0l0ZW1zKTtcbiAgfTtcblxuICAvKipcbiAgICogU3dhcHMgYXJyYXkgZWxlbWVudHNcbiAgICogQHBhcmFtIG9yaWdpbmFsIC0gb3JpZ2luYWwgYXJyYXlcbiAgICogQHBhcmFtIGRpciAtIGNsaWNrIGRpcmVjdGlvbiAoJ3VwL2Rvd24nKVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEFycmFuZ2VkQXJyYXkgPSAob3JpZ2luYWwsIGRpcikgPT4ge1xuICAgIGNvbnN0IHsgZGF0YUxvb2tVcEtleSwgc2VsZWN0ZWRLZXlzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlkID0gc2VsZWN0ZWRLZXlzWzBdO1xuICAgIGNvbnN0IG1vZGlmaWVkID0gb3JpZ2luYWwuc2xpY2UoKTtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gbW9kaWZpZWQuZmluZEluZGV4KGl0ZW0gPT4gaXRlbVtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgIGxldCBlbmRJbmRleCA9IHN0YXJ0SW5kZXg7XG5cbiAgICBpZiAoZGlyID09PSAndXAnICYmIHN0YXJ0SW5kZXggPiAwKSB7XG4gICAgICBlbmRJbmRleCAtPSAxO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAnZG93bicgJiYgc3RhcnRJbmRleCA8IG1vZGlmaWVkLmxlbmd0aCAtIDEpIHtcbiAgICAgIGVuZEluZGV4ICs9IDE7XG4gICAgfVxuXG4gICAgY29uc3Qgc3dhcHBlZCA9IG1vZGlmaWVkW3N0YXJ0SW5kZXhdO1xuICAgIG1vZGlmaWVkW3N0YXJ0SW5kZXhdID0gbW9kaWZpZWRbZW5kSW5kZXhdO1xuICAgIG1vZGlmaWVkW2VuZEluZGV4XSA9IHN3YXBwZWQ7XG5cbiAgICByZXR1cm4gbW9kaWZpZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgdHJlZSBhZnRlciByZS1vcmRlcmluZyAoYXJyb3cgYnV0dG9uIGNsaWNrKVxuICAgKiBAcGFyYW0gZGlyXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFVwZGF0ZWRUcmVlQWZ0ZXJTaGlmdCA9IChkaXIsIGFycmF5ID0gdGhpcy5wcm9wcy50cmVlRGF0YSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNlbGVjdGVkS2V5cywgZGF0YUxvb2tVcEtleSwgb25PcmRlckJ1dHRvbkNsaWNrLCBkYXRhTG9va1VwQ2hpbGRyZW4sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHNlbGVjdGVkS2V5cy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIW9uT3JkZXJCdXR0b25DbGljaykgdGhyb3cgVHlwZUVycm9yKCdUcmVlOiBvbk9yZGVyQnV0dG9uQ2xpY2sgY2FsbGJhY2sgaXMgbm90IGRlZmluZWQnKTtcbiAgICBjb25zdCBuZXdJdGVtcyA9IGFycmF5LnNsaWNlKCk7XG4gICAgY29uc3QgaWQgPSBzZWxlY3RlZEtleXNbMF07XG5cbiAgICAvLyBJZiBpdGVtIGlzIGZvdW5kIG9uIG1haW4gbGV2ZWw6XG4gICAgbGV0IGZvdW5kID0gbmV3SXRlbXMuZmluZChpdGVtID0+IGl0ZW1bZGF0YUxvb2tVcEtleV0gPT09IGlkKTtcbiAgICBpZiAoZm91bmQpIHJldHVybiB0aGlzLmdldEFycmFuZ2VkQXJyYXkoYXJyYXksIGRpcik7XG5cbiAgICAvLyBPdGhlcndpc2UuLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIGlmICghZm91bmQgJiYgaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dKSB7XG4gICAgICAgIGZvdW5kID0gISFpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0uZmluZChjaGlsZCA9PiBjaGlsZFtkYXRhTG9va1VwS2V5XSA9PT0gaWQpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICBpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gPSB0aGlzLmdldEFycmFuZ2VkQXJyYXkoaXRlbVtkYXRhTG9va1VwQ2hpbGRyZW5dLCBkaXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtW2RhdGFMb29rVXBDaGlsZHJlbl0gJiYgIWZvdW5kKSB7XG4gICAgICAgICAgZm91bmQgPSB0aGlzLmdldFVwZGF0ZWRUcmVlQWZ0ZXJTaGlmdChkaXIsIGl0ZW1bZGF0YUxvb2tVcENoaWxkcmVuXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfTtcblxuICAvKipcbiAgICogSXMgb3JkZXJpbmcgYXJyb3cgZGlzYWJsZWRcbiAgICogQHBhcmFtIGRpciAoJ3VwL2Rvd24nKVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQXJyb3dEaXNhYmxlZCA9IChkaXIpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzZWxlY3RlZFBhcmVudCwgc2VsZWN0ZWRLZXlzLCBkYXRhTG9va1VwS2V5LCBkYXRhTG9va1VwQ2hpbGRyZW4sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFzZWxlY3RlZEtleXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IHBhcmVudEFyciA9IEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRQYXJlbnQpID9cbiAgICAgIHNlbGVjdGVkUGFyZW50IDogc2VsZWN0ZWRQYXJlbnRbZGF0YUxvb2tVcENoaWxkcmVuXTtcbiAgICBjb25zdCBpbmRleCA9IHBhcmVudEFyci5maW5kSW5kZXgoaXRlbSA9PiBpdGVtW2RhdGFMb29rVXBLZXldID09PSBzZWxlY3RlZEtleXNbMF0pO1xuXG4gICAgaWYgKGRpciA9PT0gJ3VwJykgcmV0dXJuIGluZGV4ID09PSAwO1xuICAgIHJldHVybiBpbmRleCA9PT0gcGFyZW50QXJyLmxlbmd0aCAtIDE7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9yZGVyaW5nLWFycm93c1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17dGhpcy5vblVwQ2xpY2t9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidXAtYXJyb3cgXCJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0Fycm93RGlzYWJsZWQoJ3VwJyl9XG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRG93bkNsaWNrfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImRvd24tYXJyb3dcIlxuICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmlzQXJyb3dEaXNhYmxlZCgnZG93bicpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19