function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Accurate_Interval.js
// Thanks Squeege! For the elegant answer provided to this question:
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time).

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel };

};

//variables

const start = "Start";
const stop = "Stop";

const Reset = function (props) {
  return /*#__PURE__*/(
    React.createElement("button", { onClick: props.onClickReset, id: "reset", className: "control-button" }, "Reset"));

};

//components
class Control extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleClick",




    e => {
      if (this.state.value === start) {
        this.setState({
          value: stop });

      } else {
        this.setState({
          value: start });

      }
    });_defineProperty(this, "handleChange",
    e => {
      return this.props.onClick(e);
    });this.state = { value: start };}
  render() {
    return /*#__PURE__*/(
      React.createElement("button", {
        id: "start_stop",
        className: "control-button",
        onClick: e => {
          this.handleChange(e);
          this.handleClick(e);
        } },
      this.state.value));
  }}


class TimerLengthControl extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("button", {
        className: "fa-button",
        id: this.props.addID,
        onClick: this.props.onClick,
        value: "+" }, /*#__PURE__*/

      React.createElement("i", { id: "increment", class: "fa fa-plus", "aria-hidden": "true" })), /*#__PURE__*/

      React.createElement("div", { id: this.props.lengthID, className: "shootMe" },
      this.props.length), /*#__PURE__*/

      React.createElement("button", {
        className: "fa-button",
        id: this.props.minID,
        onClick: this.props.onClick,
        value: "-" }, /*#__PURE__*/

      React.createElement("i", { id: "decrement", class: "fa fa-minus", "aria-hidden": "true" }))));



  }}


class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "reset",






























































































































    () => {
      this.setState({
        brkLength: 1,
        seshLength: 4,
        timerState: 'stopped',
        timerType: 'Work',
        timer: 240,
        intervalID: '',
        alarmColor: { color: 'black' } });

      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    });this.state = { brkLength: 1, seshLength: 4, timerState: 'stopped', timerType: 'Work', timer: 240, intervalID: '', alarmColor: { color: 'black' } }; //bindings
    this.setBrkLength = this.setBrkLength.bind(this);this.setSeshLength = this.setSeshLength.bind(this);this.lengthControl = this.lengthControl.bind(this);this.timerControl = this.timerControl.bind(this);this.beginCountDown = this.beginCountDown.bind(this);this.decrementTimer = this.decrementTimer.bind(this);this.phaseControl = this.phaseControl.bind(this);this.warning = this.warning.bind(this);this.buzzer = this.buzzer.bind(this);this.switchTimer = this.switchTimer.bind(this);this.clockify = this.clockify.bind(this);} //functions
  setBrkLength(e) {this.lengthControl('brkLength', e.currentTarget.value, this.state.brkLength, 'Work');}setSeshLength(e) {this.lengthControl('seshLength', e.currentTarget.value, this.state.seshLength, 'Rest');}lengthControl(stateToChange, sign, currentLength, timerType) {if (this.state.timerState === 'running') {return;}if (this.state.timerType === timerType) {if (sign === '-' && currentLength !== 1) {this.setState({ [stateToChange]: currentLength - 1 });} else if (sign === '+' && currentLength !== 60) {this.setState({ [stateToChange]: currentLength + 1 });}} else if (sign === '-' && currentLength !== 1) {this.setState({ [stateToChange]: currentLength - 1, timer: currentLength * 60 - 60 });} else if (sign === '+' && currentLength !== 60) {this.setState({ [stateToChange]: currentLength + 1, timer: currentLength * 60 + 60 });}}timerControl() {if (this.state.timerState === 'stopped') {this.beginCountDown();this.setState({ timerState: 'running' });} else {this.setState({ timerState: 'stopped' });if (this.state.intervalID) {this.state.intervalID.cancel();}}}beginCountDown() {this.setState({ intervalID: accurateInterval(() => {this.decrementTimer();this.phaseControl();}, 1000) });}decrementTimer() {this.setState({ timer: this.state.timer - 1 });}phaseControl() {let timer = this.state.timer;this.warning(timer);this.buzzer(timer);if (timer < 0) {if (this.state.intervalID) {this.state.intervalID.cancel();}if (this.state.timerType === 'Work') {this.beginCountDown();this.switchTimer(this.state.brkLength * 60, 'Rest');} else {this.beginCountDown();this.switchTimer(this.state.seshLength * 60, 'Work');}}}warning(_timer) {if (_timer < 61) {this.setState({ alarmColor: { color: '#a50d0d' } });} else {this.setState({ alarmColor: { color: 'black' } });}}buzzer(_timer) {if (_timer === 0) {this.audioBeep.play();}}switchTimer(num, str) {this.setState({ timer: num, timerType: str, alarmColor: { color: 'black' } });}clockify() {let minutes = Math.floor(this.state.timer / 60);let seconds = this.state.timer - minutes * 60;seconds = seconds < 10 ? '0' + seconds : seconds;minutes = minutes < 10 ? '0' + minutes : minutes;return minutes + ':' + seconds;}render() {return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "container", className: "overlay" }, /*#__PURE__*/

      React.createElement("div", { className: "main" }, /*#__PURE__*/

      React.createElement("div", { className: "sub-main" }, /*#__PURE__*/
      React.createElement("div", { className: "left" }, /*#__PURE__*/

      React.createElement("div", { className: "session-header" }, "WORK"), /*#__PURE__*/
      React.createElement(TimerLengthControl, {
        addID: "session-increment",
        length: this.state.seshLength,
        lengthID: "session-length",
        minID: "session-decrement",
        onClick: this.setSeshLength,
        titleID: "session-label" }), /*#__PURE__*/


      React.createElement("hr", null), /*#__PURE__*/

      React.createElement("div", { className: "break-header" }, "REST"), /*#__PURE__*/
      React.createElement(TimerLengthControl, {
        addID: "break-increment",
        length: this.state.brkLength,
        lengthID: "break-length",
        minID: "break-decrement",
        onClick: this.setBrkLength,
        titleID: "break-label" }))), /*#__PURE__*/






      React.createElement("div", { className: "sub-main" }, /*#__PURE__*/
      React.createElement("div", { className: "right" }, /*#__PURE__*/


      React.createElement("div", { id: "timer-container" }, /*#__PURE__*/
      React.createElement("div", { className: "timer-header" }, "Time Remaining"), /*#__PURE__*/

      React.createElement("div", { id: "timer", style: this.state.alarmColor }, /*#__PURE__*/
      React.createElement("div", { id: "time-left", className: "row" }, this.clockify()), /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.timerType))), /*#__PURE__*/




      React.createElement("div", { id: "control-container", className: "row" }, /*#__PURE__*/
      React.createElement(Control, { onClick: this.timerControl }), /*#__PURE__*/
      React.createElement(Reset, { onClickReset: this.reset })))))), /*#__PURE__*/








      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        ref: audio => {
          this.audioBeep = audio;
        },
        src: "http://soundbible.com/mp3/Boxing%20Bell%20Start%20Round-SoundBible.com-1691615580.mp3" }), /*#__PURE__*/


      React.createElement("br", null), /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("hr", { id: "footer" }), /*#__PURE__*/
      React.createElement("div", { id: "contact-section" }, "\xA0 \xA0 \xA0 ", /*#__PURE__*/
      React.createElement("section", { id: "contact", class: "container" }, /*#__PURE__*/
      React.createElement("h2", { id: "contact-title" }, "Designed & Coded by Cole Crum"), /*#__PURE__*/
      React.createElement("div", { class: "contact-links" }, /*#__PURE__*/

      React.createElement("a", { id: "profile-link", href: "https://github.com/colecrum?tab=repositories", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { id: "git-logo", class: "contact-img", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXk1n8mQe3sbaaMDgiqtSeSC8QySxLfgkaA&usqp=CAU", title: "GitHub" })), /*#__PURE__*/
      React.createElement("a", { href: "https://codepen.io/colecrum", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { class: "contact-img", src: "https://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Large.png", title: "CodePen" })), /*#__PURE__*/
      React.createElement("a", { href: "mailto:colemcrum@gmail.com", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { class: "contact-img", src: "https://lh3.googleusercontent.com/VS3B_qhOFTYsdyNfnlr98zg3HNjB_Gcs9bxVnaQO9MysAoBOXMHATClhRviImKKJV8RV-0s7hl8KeVQcij5Iagb1exHzt40x679l8Q=w0", title: "Email" })), /*#__PURE__*/
      React.createElement("a", { href: "tel:512-517-8503", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { class: "contact-img", src: "https://cdn4.iconfinder.com/data/icons/phones-colored/48/JD-32-512.png", title: "Phone" }))), "\xA0 \xA0 \xA0 "), "\xA0 \xA0 ")));








  }}




ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));