import styles from "./SkipNav.module.css";

const skipNavId = "skip-nav";

export const SkipNavLink = () => {
  return (
    <a href={`#${skipNavId}`} tabIndex={0} className={styles.hidden}>
      Skip to content
    </a>
  );
};

export const SkipNavTarget = () => {
  return <div id={skipNavId} />;
};

export default SkipNavLink;
