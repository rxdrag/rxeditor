import { useCallback } from "react"
import { useFieldy, useFormName } from "runtime/fieldy"
import { useField } from "runtime/fieldy/hooks/useField"
import { PREFIX_SELF, Self } from "../classes/self"
import { PREFIX_SIBLINGS, Siblings } from "../classes/siblilings"

export function useNewFunction() {
  const fieldy = useFieldy()
  const fieldParams = useField()
  const formName = useFormName()

  const newFunc = useCallback((jsCode: string) => {
    if (fieldy && formName) {
      // eslint-disable-next-line no-new-func
      const func = new Function(PREFIX_SIBLINGS, PREFIX_SELF, jsCode)
      func(
        new Siblings(fieldParams, fieldy, formName),
        new Self(fieldParams, fieldy, formName),
      )
    }
  }, [fieldParams, fieldy, formName])

  return newFunc
}