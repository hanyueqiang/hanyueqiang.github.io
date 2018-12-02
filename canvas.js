
var _class7, _temp2, _initialiseProps;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cycle(value, total) {
    return (value % total + total) % total;
}

//*??????????????????????????????/
// Entity
//*?????????????????????????????*/

var Entity = function Entity() {
    var _this = this;

    _classCallCheck(this, Entity);

    this.dpr = window.devicePixelRatio || 1;

    this.toValue = function (value) {
        return value * _this.dpr;
    };

    this.draw = function () {};

    this.update = function () {};
};

//*??????????????????????????????/
// Point
//*?????????????????????????????*/

var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: 'clone',
        value: function clone() {
            return new Point(this.x, this.y);
        }
    }, {
        key: 'delta',
        value: function delta(point) {
            return [this.x - point.x, this.y - point.y];
        }
    }, {
        key: 'distance',
        value: function distance(point) {
            var dx = point.x - this.x;
            var dy = point.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
    }, {
        key: 'moveAtAngle',
        value: function moveAtAngle(angle, distance) {
            this.x += Math.cos(angle) * distance;
            this.y += Math.sin(angle) * distance;
            return this;
        }
    }, {
        key: 'applyVelocity',
        value: function applyVelocity(velocity) {
            this.x += velocity.vx;
            this.y += velocity.vy;
            return this;
        }
    }, {
        key: 'angleRadians',
        value: function angleRadians(point) {
            // radians = atan2(deltaY, deltaX)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x);
        }
    }, {
        key: 'angleDeg',
        value: function angleDeg(point) {
            // degrees = atan2(deltaY, deltaX) * (180 / PI)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x) * (180 / Math.PI);
        }
    }, {
        key: 'rotate',
        value: function rotate(origin, radians) {
            // rotate the point around a given origin point
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            this.x = cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
            this.y = cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
            return this;
        }
    }, {
        key: 'position',
        get: function get() {
            return [this.x, this.y];
        }
    }]);

    return Point;
}();

//*??????????????????????????????/
// Velocity
//*?????????????????????????????*/

var Velocity = function () {
    function Velocity(vx, vy) {
        _classCallCheck(this, Velocity);

        this.vx = vx;
        this.vy = vy;
    }

    _createClass(Velocity, [{
        key: 'flip',
        value: function flip() {
            // reflection on both axis
            this.vx *= -1;
            this.vy *= -1;
            return this;
        }
    }, {
        key: 'flipX',
        value: function flipX() {
            // reflection on x axis
            this.vx *= -1;
            return this;
        }
    }, {
        key: 'flipY',
        value: function flipY() {
            // reflection on y axis
            this.vy *= -1;
            return this;
        }
    }, {
        key: 'multiply',
        value: function multiply(scalar) {
            this.vx *= scalar;
            this.vy *= scalar;
            return this;
        }
    }, {
        key: 'divide',
        value: function divide(scalar) {
            this.vx /= scalar;
            this.vy /= scalar;
            return this;
        }
    }]);

    return Velocity;
}();

//*??????????????????????????????/
// Bounds
//*?????????????????????????????*/

var Bounds = function () {
    function Bounds(x, y, w, h) {
        _classCallCheck(this, Bounds);

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        var hw = w / 2;
        var hh = h / 2;
        this.center = new Point(hw, hh);
        this.position = new Point(x, y);
    }

    _createClass(Bounds, [{
        key: 'offsetOuter',
        value: function offsetOuter(offset) {
            var _params = _slicedToArray(this.params, 4),
                x = _params[0],
                y = _params[1],
                w = _params[2],
                h = _params[3];

            return new Bounds(x - offset, y - offset, w + offset * 2, h + offset * 2);
        }
    }, {
        key: 'offsetInner',
        value: function offsetInner(offset) {
            var _params2 = _slicedToArray(this.params, 4),
                x = _params2[0],
                y = _params2[1],
                w = _params2[2],
                h = _params2[3];

            return new Bounds(x + offset, y + offset, w - offset * 2, h - offset * 2);
        }
    }, {
        key: 'params',
        get: function get() {
            return [this.x, this.y, this.w, this.h];
        }
    }]);

    return Bounds;
}();

//*??????????????????????????????/
// Background
//*?????????????????????????????*/

var Background = function (_Entity) {
    _inherits(Background, _Entity);

    function Background() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, Background);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Background.__proto__ || Object.getPrototypeOf(Background)).call.apply(_ref, [this].concat(args))), _this2), _this2.draw = function (context) {
            _this2.drawGradient(context);
            // this.drawText(context);
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Background, [{
        key: 'drawText',
        value: function drawText(_ref2) {
            var ctx = _ref2.ctx,
                canvas = _ref2.canvas;

            var ms = Math.min(canvas.width, canvas.height);
            var size = ms / 15;

            var copy = 'Waves';
            var x = canvas.width / 2;
            var y = canvas.height / 3 + size / 3;
            ctx.font = '700 italic ' + size + 'px futura, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#edb07b';
            ctx.fillText(copy, x, y);
        }
    }, {
        key: 'drawGradient',
        value: function drawGradient(_ref3) {
            var ctx = _ref3.ctx,
                canvas = _ref3.canvas,
                bounds = _ref3.bounds;

            // const gradient = ctx.createLinearGradient(...bounds.params);
            // gradient.addColorStop(0, '#333');
            // gradient.addColorStop(1, '#222');

            // ctx.fillStyle = gradient;
            //ctx.fillStyle = '#252f3d';
            ctx.fillStyle = '#21282e';
            // ctx.globalAlpha = 0.9;
            ctx.fillRect.apply(ctx, _toConsumableArray(bounds.params));
            // ctx.globalAlpha = 1;
        }
    }]);

    return Background;
}(Entity);

//*??????????????????????????????/
// Canvas
//*?????????????????????????????*/

var Canvas = function () {
    function Canvas(_ref4) {
        var _this3 = this;

        var canvas = _ref4.canvas,
            _ref4$entities = _ref4.entities,
            entities = _ref4$entities === undefined ? [] : _ref4$entities,
            pointer = _ref4.pointer;

        _classCallCheck(this, Canvas);

        this.setCanvasSize = function () {
            var _window = window,
                w = _window.innerWidth,
                h = _window.innerHeight;

            var w2 = w * _this3.dpr;
            var h2 = h * _this3.dpr;
            _this3.canvas.width = w2;
            _this3.canvas.height = h2;
            _this3.canvas.style.width = w + 'px';
            _this3.canvas.style.height = h + 'px';
            _this3.bounds = new Bounds(0, 0, w2, h2);
        };

        this.addEntity = function (newEntity) {
            _this3.entities = [].concat(_toConsumableArray(_this3.entities), [newEntity]);
            return _this3.entities.length - 1;
        };

        this.render = function () {
            // Main loop

            // Draw and Update items here.
            _this3.entities.forEach(function (_ref5) {
                var draw = _ref5.draw,
                    update = _ref5.update;

                draw(_this3);
                update(_this3);
            });

            // update pointer for demos
            _this3.pointer.update(_this3);

            // Cleanup "dead" entities
            _this3.removeDead();

            ++_this3.tick;
            window.requestAnimationFrame(_this3.render);
        };

        // setup a canvas
        this.canvas = canvas;
        this.dpr = window.devicePixelRatio || 1;
        this.ctx = canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);

        // tick counter
        this.tick = 0;

        // entities to be drawn on the canvas
        this.entities = entities;

        // track mouse/touch movement
        this.pointer = pointer || null;

        // setup and run
        this.setCanvasSize();
        this.setupListeners();
        this.render();

        // demo pointer
        this.pointer.addPointerModifier(function (pointer, tick) {
            var cx = window.innerWidth / 2 * _this3.dpr;
            var cy = window.innerHeight / 2 * _this3.dpr;

            // const dx = window.innerWidth / 3 * this.dpr;
            var dy = window.innerHeight / 4 * _this3.dpr;

            var offX = cx;
            var offY = cy + Math.cos(-tick / 20) * dy;

            pointer.lastPosition.moveTo(pointer.position.x, pointer.position.y);
            pointer.position.moveTo(offX, offY);
        });
    }

    _createClass(Canvas, [{
        key: 'setupListeners',
        value: function setupListeners() {
            window.addEventListener('resize', this.setCanvasSize);
        }
    }, {
        key: 'removeEntity',
        value: function removeEntity(deleteIndex) {
            this.entities = this.entities.filter(function (el, i) {
                return i !== deleteIndex;
            });
            return this.entities;
        }
    }, {
        key: 'removeDead',
        value: function removeDead() {
            this.entities = this.entities.filter(function (_ref6) {
                var _ref6$dead = _ref6.dead,
                    dead = _ref6$dead === undefined ? false : _ref6$dead;
                return !dead;
            });
        }
    }]);

    return Canvas;
}();

//*??????????????????????????????/
// Cursor
//*?????????????????????????????*/

var Cursor = function (_Entity2) {
    _inherits(Cursor, _Entity2);

    function Cursor(radius) {
        _classCallCheck(this, Cursor);

        var _this4 = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this));

        _this4.draw = function (_ref7) {
            var ctx = _ref7.ctx,
                pointer = _ref7.pointer;

            ctx.strokeStyle = _this4.strokeStyle;
            ctx.lineWidth = _this4.lineWidth;
            ctx.beginPath();
            ctx.arc(pointer.position.x, pointer.position.y, _this4.radius, 0, _this4.pi2, true);
            ctx.closePath();
            ctx.stroke();
        };

        _this4.radius = _this4.toValue(radius);
        _this4.pi2 = Math.PI * 2;
        _this4.lineWidth = _this4.toValue(2);
        _this4.strokeStyle = '#7bc4a2';
        return _this4;
    }

    return Cursor;
}(Entity);

//*??????????????????????????????/
// Pointer
//*?????????????????????????????*/

var Pointer = function () {
    function Pointer() {
        var _this5 = this;

        _classCallCheck(this, Pointer);

        this.update = function (_ref8) {
            var tick = _ref8.tick;

            _this5.modifier && _this5.modifier(_this5, tick);
        };

        this.dpr = window.devicePixelRatio || 1;
        this.delta;
        this.lastPosition = new Point(0, 0);
        this.position = new Point(0, 0);
        this.addListeners();
    }

    _createClass(Pointer, [{
        key: 'delta',
        value: function delta() {
            return this.position.delta(this.lastPosition);
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this6 = this;

            ['mousemove', 'touchmove'].forEach(function (event, touch) {
                window.addEventListener(event, function (e) {
                    // move previous point
                    var _position = _this6.position,
                        px = _position.x,
                        py = _position.y;

                    // disable the demo modifier if it's been added

                    if (_this6.modifier) {
                        _this6.modifier = null;
                    }

                    if (touch) {
                        e.preventDefault();
                        var x = e.targetTouches[0].clientX * _this6.dpr;
                        var y = e.targetTouches[0].clientY * _this6.dpr;
                        _this6.position.moveTo(x, y);
                        _this6.lastPosition.moveTo(px, py);
                    } else {
                        var _x = e.clientX * _this6.dpr;
                        var _y = e.clientY * _this6.dpr;
                        _this6.position.moveTo(_x, _y);
                        _this6.lastPosition.moveTo(px, py);
                    }
                }, false);
            });
        }
    }, {
        key: 'addPointerModifier',
        value: function addPointerModifier(modifier) {
            this.modifier = modifier;
        }
    }]);

    return Pointer;
}();

//*??????????????????????????????/
// PolyWave
//*?????????????????????????????*/

var PolyWave = function (_Entity3) {
    _inherits(PolyWave, _Entity3);

    function PolyWave(_ref9) {
        var verts = _ref9.verts,
            color = _ref9.color,
            elasticity = _ref9.elasticity,
            damping = _ref9.damping;

        _classCallCheck(this, PolyWave);

        var _this7 = _possibleConstructorReturn(this, (PolyWave.__proto__ || Object.getPrototypeOf(PolyWave)).call(this));

        _this7.draw = function (_ref10) {
            var ctx = _ref10.ctx,
                bounds = _ref10.bounds;

            ctx.beginPath();

            _this7.points.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            });

            ctx.closePath();

            ctx.fillStyle = _this7.color;
            ctx.lineWidth = _this7.toValue(2);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 0.9;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';
        };

        _this7.update = function (context) {
            _this7.points.forEach(function (point) {
                return point.update(context);
            });
        };

        _this7.verts = verts; // corners
        _this7.color = color;
        _this7.points = [];
        _this7.resolution = 50;
        _this7.elasticity = elasticity;
        _this7.damping = damping;

        _this7.constructPolyWave();
        _this7.setAttractors();
        return _this7;
    }

    _createClass(PolyWave, [{
        key: 'constructPolyWave',
        value: function constructPolyWave() {
            for (var i = 0; i < this.verts.length; i++) {
                var p1 = this.verts[i];
                var p2 = this.verts[i + 1];

                if (p1 && p2) {
                    var _p2$point$delta = p2.point.delta(p1.point),
                        _p2$point$delta2 = _slicedToArray(_p2$point$delta, 2),
                        dx = _p2$point$delta2[0],
                        dy = _p2$point$delta2[1];

                    var distance = p2.point.distance(p1.point);
                    var amount = distance / this.resolution;
                    var pointAmt = Math.round(amount);

                    var offX = dx / pointAmt;
                    var offY = dy / pointAmt;

                    if (p1.isSpring) {
                        for (var k = 1; k <= pointAmt; k++) {
                            // debugger;
                            var x = p1.point.x + offX * k;
                            var y = p1.point.y + offY * k;
                            var point = new Spring({
                                x: x,
                                y: y,
                                elasticity: this.elasticity,
                                damping: this.damping,
                                isFixed: k === 0 || k === pointAmt
                            });
                            this.points.push(point);
                        }
                    } else {
                        this.points.push(new Spring({
                            x: p2.point.x,
                            y: p2.point.y,
                            isFixed: true
                        }));
                    }
                }
            }
        }
    }, {
        key: 'setAttractors',
        value: function setAttractors() {
            var _this8 = this;

            this.points.forEach(function (p, i) {
                var isLast = i === _this8.points.length - 1;
                var isFirst = i === 0;
                if (isLast) {
                    var prevPoint = _this8.points[i - 1];
                    var nextPoint = _this8.points[0];
                    !p.isFixed && p.addAttractor(prevPoint);
                    !p.isFixed && p.addAttractor(nextPoint);
                } else if (isFirst) {
                    var _prevPoint = _this8.points[_this8.points.length - 1];
                    var _nextPoint = _this8.points[i + 1];
                    !p.isFixed && p.addAttractor(_prevPoint);
                    !p.isFixed && p.addAttractor(_nextPoint);
                } else {
                    var _prevPoint2 = _this8.points[i - 1];
                    var _nextPoint2 = _this8.points[i + 1];
                    !p.isFixed && p.addAttractor(_prevPoint2);
                    !p.isFixed && p.addAttractor(_nextPoint2);
                }
            });
        }
    }]);

    return PolyWave;
}(Entity);

//*??????????????????????????????/
// Spring
//*?????????????????????????????*/

// defaults and constants


var ELASTICITY = 0.05; // elastic force toward the origin
var DAMPING = 0.4;
var MASS = 10;
var ADJACENT_SPRING_CONSTANT = 0.12;

var DPR = window.devicePixelRatio || 1;

var Spring = (_temp2 = _class7 = function (_Point) {
    _inherits(Spring, _Point);

    function Spring(_ref11) {
        var x = _ref11.x,
            y = _ref11.y,
            isFixed = _ref11.isFixed,
            _ref11$mass = _ref11.mass,
            mass = _ref11$mass === undefined ? MASS : _ref11$mass,
            _ref11$elasticity = _ref11.elasticity,
            elasticity = _ref11$elasticity === undefined ? ELASTICITY : _ref11$elasticity,
            _ref11$damping = _ref11.damping,
            damping = _ref11$damping === undefined ? DAMPING : _ref11$damping;

        _classCallCheck(this, Spring);

        var _this9 = _possibleConstructorReturn(this, (Spring.__proto__ || Object.getPrototypeOf(Spring)).call(this, x, y));

        _initialiseProps.call(_this9);

        _this9.ox = x; // original origin x, never changes
        _this9.oy = y; // original origin y, never changes
        _this9.vx = 0; // velocity x
        _this9.vy = 0; // velocity y
        _this9.fx = 0; // force x
        _this9.fy = 0; // force y

        _this9.isFixed = isFixed; // indeicates whether this point can be moved

        // spring constants
        _this9.mass = mass;
        _this9.elasticity = elasticity;
        _this9.damping = damping;
        return _this9;
    }

    _createClass(Spring, [{
        key: 'applyForce',
        value: function applyForce(x, y) {
            this.fx += x;
            this.fy += y;
        }
    }, {
        key: 'addAttractor',
        // just testing

        value: function addAttractor(point) {
            this.attractors = [].concat(_toConsumableArray(this.attractors), [point]);
        }
    }, {
        key: 'setAdjacentForces',
        value: function setAdjacentForces() {
            var _this10 = this;

            // currently unused, was testing out an
            this.attractors.forEach(function (point, i) {
                var x = point.x,
                    y = point.y;


                var force = { x: 0, y: 0 }; // prev point force
                var x1 = point.x,
                    y1 = point.y;
                var x2 = _this10.x,
                    y2 = _this10.y;


                force.x = x1 - x2;
                force.y = y1 - y2;

                // apply adjacent forces to current spring
                _this10.applyForce(force.x, force.y);
            });
        }
    }, {
        key: 'applyForceFromMouse',
        value: function applyForceFromMouse(pointer) {
            var _pointer$position = pointer.position,
                x = _pointer$position.x,
                y = _pointer$position.y;


            var distance = this.distance(pointer.position);

            if (distance < MOUSE_RADIUS) {
                var _pointer$delta = pointer.delta(),
                    _pointer$delta2 = _slicedToArray(_pointer$delta, 2),
                    dx = _pointer$delta2[0],
                    dy = _pointer$delta2[1];

                var power = (1 - distance / MOUSE_RADIUS) * MOUSE_STRENGTH;

                this.applyForce(dx * power, dy * power);
            }
        }
    }, {
        key: 'setSpringForce',
        value: function setSpringForce() {
            // force to origin, difference multiplied by elasticity constant
            var fx = (this.ox - this.x) * this.elasticity;
            var fy = (this.oy - this.y) * this.elasticity;

            // sum forces
            this.fx += fx;
            this.fy += fy;
        }
    }, {
        key: 'solveVelocity',
        value: function solveVelocity() {
            if (this.fx === 0 && this.fy === 0) return;

            // acceleration = force / mass;
            var ax = this.fx / this.mass;
            var ay = this.fy / this.mass;

            // velocity, apply damping then ad acceleration
            this.vx = this.damping * this.vx + ax;
            this.vy = this.damping * this.vy + ay;

            // add velocity to center and top/left
            this.x += this.vx;
            this.y += this.vy;

            // reset any applied forces
            this.fx = 0;
            this.fy = 0;
        }
    }]);

    return Spring;
}(Point), _initialiseProps = function _initialiseProps() {
    var _this11 = this;

    this.attractors = [];

    this.update = function (_ref12) {
        var pointer = _ref12.pointer;

        if (_this11.isFixed) return;
        _this11.applyForceFromMouse(pointer);
        _this11.setSpringForce();
        _this11.setAdjacentForces();

        _this11.solveVelocity();
    };

    this.draw = function (_ref13) {
        var ctx = _ref13.ctx;

        // temporary, just to see what's happening
        var x = _this11.x,
            y = _this11.y;

        ctx.fillStyle = 'white';
        ctx.lineWidth = 5;
        ctx.fillRect(x - 2, y - 2, 4, 4);
        // ctx.beginPath();
        // ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        // ctx.closePath();
        // ctx.stroke();
    };
}, _temp2);


var MOUSE_STRENGTH = 1; // 0 - 1
var MOUSE_RADIUS = 200 * DPR;

var colors = ['#fff', '#edb07b', '#21282e', '#343a5b', '#9b7bad', '#a05065'];
//var colors = ['#fff', '#21282e'];

function generateRandomTriangle(center, size) {
    var rad1 = getRandomFloat(0, 2);
    var rad2 = getRandomFloat(0, 2);
    var rad3 = 2 + rad1 + rad2;

    var p1 = center.clone().moveAtAngle(rad1, size);
    var p2 = center.clone().moveAtAngle(rad2, size);
    var p3 = center.clone().moveAtAngle(rad3, size);
    return [p1, p2, p3];
}

var center = new Point(window.innerWidth / 2 * DPR, window.innerHeight / 2 * DPR);

var createWaves = function createWaves(amount) {
    return Array(amount).fill(null).map(function (_, i) {
        var size = 40 * (amount - i) * DPR;
        var points = 6 + (amount - i);
        var verts = [{
            point: new Point(0, window.innerHeight * DPR / 2),
            isSpring: true
        }, {
            point: new Point(window.innerWidth * DPR, window.innerHeight * DPR / 2)
        }, {
            point: new Point(window.innerWidth * DPR, window.innerHeight * DPR)
        }, {
            point: new Point(0, window.innerHeight * DPR)
        }];

        var cdx = cycle(i, colors.length);
        return new PolyWave({
            verts: [].concat(verts, [verts[0]]),
            elasticity: getRandomFloat(0.1, 0.2),
            damping: getRandomFloat(0.88, 0.90),
            color: colors[cdx]
        });
    });
};

// Kick off
var canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background()].concat(_toConsumableArray(createWaves(4)), [new Cursor(10)])
});