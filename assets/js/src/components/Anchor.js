import { h } from "preact";
import isTouchDevice from "is-touch-device";

const Anchor = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      class="anchorjs-link"
      href={`#${props.id}`}
      title={`Jump to "${props.title}"`}
      style={{
        // if this is a touchscreen, always show the "#" icon instead waiting for hover
        // NOTE: this is notoriously unreliable; see https://github.com/Modernizr/Modernizr/pull/2432
        opacity: isTouchDevice() ? 1 : null,
      }}
      aria-hidden="true"
    />
  );
};

export default Anchor;
