"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSmooth = _interopRequireDefault(require("react-smooth"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Surface = _interopRequireDefault(require("../container/Surface"));

var _Layer = _interopRequireDefault(require("../container/Layer"));

var _Rectangle = _interopRequireDefault(require("../shape/Rectangle"));

var _ReactUtils = require("../util/ReactUtils");

var _Tooltip = _interopRequireDefault(require("../component/Tooltip"));

var _PureRender = _interopRequireDefault(require("../util/PureRender"));

var _ChartUtils = require("../util/ChartUtils");

var _class, _class2, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var computeNode = function computeNode(_ref) {
  var depth = _ref.depth,
      node = _ref.node,
      index = _ref.index,
      valueKey = _ref.valueKey;
  var children = node.children;
  var childDepth = depth + 1;
  var computedChildren = children && children.length ? children.map(function (child, i) {
    return computeNode({
      depth: childDepth,
      node: child,
      index: i,
      valueKey: valueKey
    });
  }) : null;
  var value;

  if (children && children.length) {
    value = computedChildren.reduce(function (result, child) {
      return result + child.value;
    }, 0);
  } else {
    value = (0, _isNaN2.default)(node[valueKey]) || node[valueKey] <= 0 ? 0 : node[valueKey];
  }

  return _objectSpread({}, node, {
    children: computedChildren,
    value: value,
    depth: depth,
    index: index
  });
};

var filterRect = function filterRect(node) {
  return {
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height
  };
}; // Compute the area for each child based on value & scale.


var getAreaOfChildren = function getAreaOfChildren(children, areaValueRatio) {
  var ratio = areaValueRatio < 0 ? 0 : areaValueRatio;
  return children.map(function (child) {
    var area = child.value * ratio;
    return _objectSpread({}, child, {
      area: (0, _isNaN2.default)(area) || area <= 0 ? 0 : area
    });
  });
}; // Computes the score for the specified row, as the worst aspect ratio.


var getWorstScore = function getWorstScore(row, parentSize, aspectRatio) {
  var parentArea = parentSize * parentSize;
  var rowArea = row.area * row.area;

  var _row$reduce = row.reduce(function (result, child) {
    return {
      min: Math.min(result.min, child.area),
      max: Math.max(result.max, child.area)
    };
  }, {
    min: Infinity,
    max: 0
  }),
      min = _row$reduce.min,
      max = _row$reduce.max;

  return rowArea ? Math.max(parentArea * max * aspectRatio / rowArea, rowArea / (parentArea * min * aspectRatio)) : Infinity;
};

var horizontalPosition = function horizontalPosition(row, parentSize, parentRect, isFlush) {
  var rowHeight = parentSize ? Math.round(row.area / parentSize) : 0;

  if (isFlush || rowHeight > parentRect.height) {
    rowHeight = parentRect.height;
  }

  var curX = parentRect.x;
  var child;

  for (var i = 0, len = row.length; i < len; i++) {
    child = row[i];
    child.x = curX;
    child.y = parentRect.y;
    child.height = rowHeight;
    child.width = Math.min(rowHeight ? Math.round(child.area / rowHeight) : 0, parentRect.x + parentRect.width - curX);
    curX += child.width;
  } // what's z


  child.z = true; // add the remain x to the last one of row

  child.width += parentRect.x + parentRect.width - curX;
  return _objectSpread({}, parentRect, {
    y: parentRect.y + rowHeight,
    height: parentRect.height - rowHeight
  });
};

var verticalPosition = function verticalPosition(row, parentSize, parentRect, isFlush) {
  var rowWidth = parentSize ? Math.round(row.area / parentSize) : 0;

  if (isFlush || rowWidth > parentRect.width) {
    rowWidth = parentRect.width;
  }

  var curY = parentRect.y;
  var child;

  for (var i = 0, len = row.length; i < len; i++) {
    child = row[i];
    child.x = parentRect.x;
    child.y = curY;
    child.width = rowWidth;
    child.height = Math.min(rowWidth ? Math.round(child.area / rowWidth) : 0, parentRect.y + parentRect.height - curY);
    curY += child.height;
  }

  child.z = false;
  child.height += parentRect.y + parentRect.height - curY;
  return _objectSpread({}, parentRect, {
    x: parentRect.x + rowWidth,
    width: parentRect.width - rowWidth
  });
};

var position = function position(row, parentSize, parentRect, isFlush) {
  if (parentSize === parentRect.width) {
    return horizontalPosition(row, parentSize, parentRect, isFlush);
  }

  return verticalPosition(row, parentSize, parentRect, isFlush);
}; // Recursively arranges the specified node's children into squarified rows.


var squarify = function squarify(node, aspectRatio) {
  var children = node.children;

  if (children && children.length) {
    var rect = filterRect(node);
    var row = [];
    var best = Infinity; // the best row score so far

    var child, score; // the current row score

    var size = Math.min(rect.width, rect.height); // initial orientation

    var scaleChildren = getAreaOfChildren(children, rect.width * rect.height / node.value);
    var tempChildren = scaleChildren.slice();
    row.area = 0;

    while (tempChildren.length > 0) {
      // row first
      // eslint-disable-next-line prefer-destructuring
      row.push(child = tempChildren[0]);
      row.area += child.area;
      score = getWorstScore(row, size, aspectRatio);

      if (score <= best) {
        // continue with this orientation
        tempChildren.shift();
        best = score;
      } else {
        // abort, and try a different orientation
        row.area -= row.pop().area;
        rect = position(row, size, rect, false);
        size = Math.min(rect.width, rect.height);
        row.length = row.area = 0;
        best = Infinity;
      }
    }

    if (row.length) {
      rect = position(row, size, rect, true);
      row.length = row.area = 0;
    }

    return _objectSpread({}, node, {
      children: scaleChildren.map(function (c) {
        return squarify(c, aspectRatio);
      })
    });
  }

  return node;
};

var Treemap = (0, _PureRender.default)(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(Treemap, _Component);

  function Treemap() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Treemap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Treemap)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = _this.constructor.createDefaultState();
    return _this;
  }

  _createClass(Treemap, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data !== this.props.data) {
        this.setState(this.constructor.createDefaultState());
      }
    }
    /**
     * Returns default, reset state for the treemap chart.
     * @return {Object} Whole new state
     */

  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(node, e) {
      var _this$props = this.props,
          onMouseEnter = _this$props.onMouseEnter,
          children = _this$props.children;
      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.default);

      if (tooltipItem) {
        this.setState({
          isTooltipActive: true,
          activeNode: node
        }, function () {
          if (onMouseEnter) {
            onMouseEnter(node, e);
          }
        });
      } else if (onMouseEnter) {
        onMouseEnter(node, e);
      }
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave(node, e) {
      var _this$props2 = this.props,
          onMouseLeave = _this$props2.onMouseLeave,
          children = _this$props2.children;
      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.default);

      if (tooltipItem) {
        this.setState({
          isTooltipActive: false,
          activeNode: null
        }, function () {
          if (onMouseLeave) {
            onMouseLeave(node, e);
          }
        });
      } else if (onMouseLeave) {
        onMouseLeave(node, e);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(node) {
      var onClick = this.props.onClick;

      if (onClick) {
        onClick(node);
      }
    }
  }, {
    key: "renderAnimatedItem",
    value: function renderAnimatedItem(content, nodeProps, isLeaf) {
      var _this2 = this;

      var _this$props3 = this.props,
          isAnimationActive = _this$props3.isAnimationActive,
          animationBegin = _this$props3.animationBegin,
          animationDuration = _this$props3.animationDuration,
          animationEasing = _this$props3.animationEasing,
          isUpdateAnimationActive = _this$props3.isUpdateAnimationActive;
      var width = nodeProps.width,
          height = nodeProps.height,
          x = nodeProps.x,
          y = nodeProps.y;
      var translateX = parseInt((Math.random() * 2 - 1) * width, 10);
      var event = {};

      if (isLeaf) {
        event = {
          onMouseEnter: this.handleMouseEnter.bind(this, nodeProps),
          onMouseLeave: this.handleMouseLeave.bind(this, nodeProps),
          onClick: this.handleClick.bind(this, nodeProps)
        };
      }

      return _react.default.createElement(_reactSmooth.default, {
        from: {
          x: x,
          y: y,
          width: width,
          height: height
        },
        to: {
          x: x,
          y: y,
          width: width,
          height: height
        },
        duration: animationDuration,
        easing: animationEasing,
        isActive: isUpdateAnimationActive
      }, function (_ref2) {
        var currX = _ref2.x,
            currY = _ref2.y,
            currWidth = _ref2.width,
            currHeight = _ref2.height;
        return _react.default.createElement(_reactSmooth.default, {
          from: "translate(".concat(translateX, "px, ").concat(translateX, "px)"),
          to: "translate(0, 0)",
          attributeName: "transform",
          begin: animationBegin,
          easing: animationEasing,
          isActive: isAnimationActive,
          duration: animationDuration
        }, _react.default.createElement(_Layer.default, event, _this2.constructor.renderContentItem(content, _objectSpread({}, nodeProps, {
          isAnimationActive: isAnimationActive,
          isUpdateAnimationActive: !isUpdateAnimationActive,
          width: currWidth,
          height: currHeight,
          x: currX,
          y: currY
        }))));
      });
    }
  }, {
    key: "renderNode",
    value: function renderNode(root, node, i) {
      var _this3 = this;

      var content = this.props.content;

      var nodeProps = _objectSpread({}, (0, _ReactUtils.getPresentationAttributes)(this.props), node, {
        root: root
      });

      var isLeaf = !node.children || !node.children.length;
      return _react.default.createElement(_Layer.default, {
        key: "recharts-treemap-node-".concat(i),
        className: "recharts-treemap-depth-".concat(node.depth)
      }, this.renderAnimatedItem(content, nodeProps, isLeaf), node.children && node.children.length ? node.children.map(function (child, index) {
        return _this3.renderNode(node, child, index);
      }) : null);
    }
  }, {
    key: "renderAllNodes",
    value: function renderAllNodes() {
      var _this$props4 = this.props,
          width = _this$props4.width,
          height = _this$props4.height,
          data = _this$props4.data,
          dataKey = _this$props4.dataKey,
          aspectRatio = _this$props4.aspectRatio;
      var root = computeNode({
        depth: 0,
        node: {
          children: data,
          x: 0,
          y: 0,
          width: width,
          height: height
        },
        index: 0,
        valueKey: dataKey
      });
      var formatRoot = squarify(root, aspectRatio);
      return this.renderNode(formatRoot, formatRoot, 0);
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      var _this$props5 = this.props,
          children = _this$props5.children,
          nameKey = _this$props5.nameKey;
      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.default);

      if (!tooltipItem) {
        return null;
      }

      var _this$props6 = this.props,
          width = _this$props6.width,
          height = _this$props6.height,
          dataKey = _this$props6.dataKey;
      var _this$state = this.state,
          isTooltipActive = _this$state.isTooltipActive,
          activeNode = _this$state.activeNode;
      var viewBox = {
        x: 0,
        y: 0,
        width: width,
        height: height
      };
      var coordinate = activeNode ? {
        x: activeNode.x + activeNode.width / 2,
        y: activeNode.y + activeNode.height / 2
      } : null;
      var payload = isTooltipActive && activeNode ? [{
        payload: activeNode,
        name: (0, _ChartUtils.getValueByDataKey)(activeNode, nameKey, ''),
        value: (0, _ChartUtils.getValueByDataKey)(activeNode, dataKey)
      }] : [];
      return _react.default.cloneElement(tooltipItem, {
        viewBox: viewBox,
        active: isTooltipActive,
        coordinate: coordinate,
        label: '',
        payload: payload
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!(0, _ReactUtils.validateWidthHeight)(this)) {
        return null;
      }

      var _this$props7 = this.props,
          width = _this$props7.width,
          height = _this$props7.height,
          className = _this$props7.className,
          style = _this$props7.style,
          children = _this$props7.children,
          others = _objectWithoutProperties(_this$props7, ["width", "height", "className", "style", "children"]);

      var attrs = (0, _ReactUtils.getPresentationAttributes)(others);
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('recharts-wrapper', className),
        style: _objectSpread({}, style, {
          position: 'relative',
          cursor: 'default',
          width: width,
          height: height
        })
      }, _react.default.createElement(_Surface.default, _extends({}, attrs, {
        width: width,
        height: height
      }), this.renderAllNodes(), (0, _ReactUtils.filterSvgElements)(children)), this.renderTooltip());
    }
  }], [{
    key: "createDefaultState",
    value: function createDefaultState() {
      return {
        isTooltipActive: false,
        activeNode: null
      };
    }
  }, {
    key: "renderContentItem",
    value: function renderContentItem(content, nodeProps) {
      if (_react.default.isValidElement(content)) {
        return _react.default.cloneElement(content, nodeProps);
      }

      if ((0, _isFunction2.default)(content)) {
        return content(nodeProps);
      }

      return _react.default.createElement(_Rectangle.default, _extends({
        fill: "#fff",
        stroke: "#000"
      }, nodeProps));
    }
  }]);

  return Treemap;
}(_react.Component), _class2.displayName = 'Treemap', _class2.propTypes = {
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  data: _propTypes.default.array,
  style: _propTypes.default.object,
  aspectRatio: _propTypes.default.number,
  content: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  fill: _propTypes.default.string,
  stroke: _propTypes.default.string,
  className: _propTypes.default.string,
  nameKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.func]),
  dataKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.func]),
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onClick: _propTypes.default.func,
  isAnimationActive: _propTypes.default.bool,
  isUpdateAnimationActive: _propTypes.default.bool,
  animationBegin: _propTypes.default.number,
  animationDuration: _propTypes.default.number,
  animationEasing: _propTypes.default.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}, _class2.defaultProps = {
  dataKey: 'value',
  aspectRatio: 0.5 * (1 + Math.sqrt(5)),
  isAnimationActive: !(0, _ReactUtils.isSsr)(),
  isUpdateAnimationActive: !(0, _ReactUtils.isSsr)(),
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'linear'
}, _temp)) || _class;

var _default = Treemap;
exports.default = _default;