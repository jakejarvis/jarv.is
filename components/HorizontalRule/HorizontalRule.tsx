import classNames from "classnames";
import type { HTMLAttributes } from "react";

import styles from "./HorizontalRule.module.css";

type Props = HTMLAttributes<HTMLHRElement>;

const HorizontalRule = ({ className, ...rest }: Props) => <hr className={classNames(styles.hr, className)} {...rest} />;

export default HorizontalRule;
