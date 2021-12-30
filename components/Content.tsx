import styles from "./Content.module.scss";

type Props = {
  children: unknown;
};

export default function Content({ children }: Props) {
  return <div className={styles.content}>{children}</div>;
}
