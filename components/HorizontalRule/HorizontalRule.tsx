import classNames from "classnames";

import styles from "./HorizontalRule.module.css";

type Props = {
  className?: string;
};

const HorizontalRule = ({ className, ...rest }: Props) => <hr className={classNames(styles.hr, className)} {...rest} />;

export default HorizontalRule;
