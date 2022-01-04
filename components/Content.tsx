import styles from "./Content.module.scss";

type Props = {
  children: unknown;
};

const Content = ({ children }: Props) => <div className={styles.content}>{children}</div>;

export default Content;