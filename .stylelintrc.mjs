/* eslint-disable import/no-anonymous-default-export */

/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules", "stylelint-prettier/recommended"],
  rules: {
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "media-feature-range-notation": null,
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["after-single-line-comment"],
        ignore: ["inside-block"],
      },
    ],
    "color-hex-length": "long",
  },
};
