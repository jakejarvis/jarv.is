import { memo } from "react";
import { useTheme } from "next-themes";
import HCaptcha from "@hcaptcha/react-hcaptcha";

type CaptchaProps = {
  size?: "normal" | "compact" | "invisible";
  theme?: "light" | "dark";
  id?: string;

  // callbacks pulled verbatim from node_modules/@hcaptcha/react-hcaptcha/types/index.d.ts
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onExpire?: () => any;
  onOpen?: () => any;
  onClose?: () => any;
  onChalExpired?: () => any;
  onError?: (event: string) => any;
  onVerify?: (token: string) => any;
  onLoad?: () => any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

const Captcha = ({ size = "normal", theme, id, ...rest }: CaptchaProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <HCaptcha
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
      reCaptchaCompat={false}
      tabIndex={0}
      size={size}
      theme={theme || (resolvedTheme === "dark" ? "dark" : "light")}
      id={id}
      {...rest}
    />
  );
};

export default memo(Captcha);
