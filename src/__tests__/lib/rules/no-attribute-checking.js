/**
 * @fileoverview prefer toBeDisabled or toBeEnabled over attribute checks
 * @author Ben Monro
 */

import { RuleTester } from "eslint";
import createBannedAttributeTestCases from "../../__fixtures__/createBannedAttributeTestCases";

const bannedAttributes = [
  {
    preferred: "toBeDisabled()",
    negatedPreferred: "toBeEnabled()",
    attributes: ["disabled"],
    ruleName: "prefer-enabled-disabled",
  },
  {
    preferred: "toBeRequired()",
    negatedPreferred: "not.toBeRequired()",
    attributes: ["required", "aria-required"],
    ruleName: "prefer-required",
  },
  {
    preferred: "toBeChecked()",
    negatedPreferred: "not.toBeChecked()",
    attributes: ["checked", "aria-checked"],
    ruleName: "prefer-checked",
  },
];

bannedAttributes.forEach(
  ({ preferred, negatedPreferred, attributes, ruleName }) => {
    const rule = require(`../../../rules/${ruleName}`);

    // const preferred = 'toBeDisabled()';
    // const negatedPreferred = 'toBeEnabled()';
    // const attributes = ['disabled'];
    const ruleTester = new RuleTester({
      parserOptions: { ecmaVersion: 2015, sourceType: "module" },
    });
    attributes.forEach((attribute) => {
      ruleTester.run(
        ruleName,
        rule,
        createBannedAttributeTestCases({
          preferred,
          negatedPreferred,
          attribute,
        })
      );
    });
  }
);
