import { IMaterialResource } from "core-react";
import { inputIcon } from "../../Input/icon";
import { inputFieldResourceLocales } from "./locales";

export const InputFieldResource: IMaterialResource = {
  name: "InputField",
  icon: inputIcon,
  color: "#dfa324",
  resourceLocales: inputFieldResourceLocales,
  elements: [
    {
      componentName: "Field",
      props: {
        label: "InputField",
      },
      locked: true,
      slots: {
        input: {
          componentName: "Input",
          props: {
            placeholder: "输入框",
          }
        }
      }
    }
  ]
}
