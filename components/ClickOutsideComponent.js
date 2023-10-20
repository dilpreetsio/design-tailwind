import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickOutsideComponent extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.mouseDownHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.mouseDownHandler);
    document.removeEventListener("mouseup", this.mouseUpHandler);
  }

  mouseDownHandler = (e) => {
    document.removeEventListener("mousedown", this.mouseDownHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  };

  mouseUpHandler = (e) => {
    if (this.ref.current && !this.ref.current.contains(e.target)) {
      if (this.props.outsideClickHandler) this.props.outsideClickHandler();
    }
    document.removeEventListener("mouseup", this.mouseUpHandler);
    document.addEventListener("mousedown", this.mouseDownHandler);
  };

  render() {
    const children = this.props.children;
    return (
      <div
        ref={this.ref}
        className={this.props.className}
        style={{
          top: `${this.props.style?.top}px`,
          left: `${this.props.style?.left}px`,
        }}
      >
        {children}
      </div>
    );
  }
}

ClickOutsideComponent.propTypes = {
  outsideClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ClickOutsideComponent;
