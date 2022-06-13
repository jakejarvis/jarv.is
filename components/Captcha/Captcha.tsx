import { memo } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useHasMounted } from "../../hooks/use-has-mounted";
import { useTheme } from "../../hooks/use-theme";

export type CaptchaProps = {
  size?: "normal" | "compact" | "invisible";
  theme?: "light" | "dark";
  className?: string;

  // callbacks pulled verbatim from node_modules/@hcaptcha/react-hcaptcha/types/index.d.ts
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onExpire?: () => any;
  onOpen?: () => any;
  onClose?: () => any;
  onChalExpired?: () => any;
  onError?: (event: string) => any;
  onVerify?: (token: string, ekey: string) => any;
  onLoad?: () => any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

const Captcha = ({ size = "normal", theme, className, ...rest }: CaptchaProps) => {
  const hasMounted = useHasMounted();
  const { activeTheme } = useTheme();

  return (
    <div className={className}>
      {hasMounted && (
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
          reCaptchaCompat={false}
          tabIndex={0}
          size={size}
          theme={theme || (activeTheme === "dark" ? activeTheme : "light")}
          {...rest}
        />
      )}
    </div>
  );
};

export default memo(Captcha);
