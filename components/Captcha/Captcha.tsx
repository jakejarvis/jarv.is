import Turnstile from "react-turnstile";
import useHasMounted from "../../hooks/useHasMounted";
import useTheme from "../../hooks/useTheme";
import type { ComponentPropsWithoutRef } from "react";

export type CaptchaProps = Omit<ComponentPropsWithoutRef<typeof Turnstile>, "sitekey"> & {
  className?: string;
};

const Captcha = ({ theme, className, ...rest }: CaptchaProps) => {
  const hasMounted = useHasMounted();
  const { activeTheme } = useTheme();

  return (
    <div className={className}>
      {hasMounted && (
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          theme={theme || (activeTheme === "dark" ? activeTheme : "light")}
          {...rest}
        />
      )}
    </div>
  );
};

export default Captcha;
