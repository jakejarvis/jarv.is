import styles from "./SkipToContent.module.css";

const skipNavId = "skip-nav";

export const SkipToContentLink = () => {
  return (
    <a href={`#${skipNavId}`} tabIndex={0} className={styles.hidden}>
      Skip to content
    </a>
  );
};

export const SkipToContentTarget = () => {
  return <div id={skipNavId} />;
};

export default SkipToContentLink;
