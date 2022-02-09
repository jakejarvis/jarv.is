import classNames from "classnames";

import styles from "./HorizontalRule.module.css";

type HorizontalRuleProps = JSX.IntrinsicElements["hr"];

const HorizontalRule = ({ className, ...rest }: HorizontalRuleProps) => (
  <hr className={classNames(styles.hr, className)} {...rest} />
);

export default HorizontalRule;
