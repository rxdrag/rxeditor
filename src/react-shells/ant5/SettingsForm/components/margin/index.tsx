import { memo, useCallback, useMemo } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import { SizeInput, SizeInputItem } from "../SizeInput"

export const marginTopIcon = `<svg viewBox="0 0 1024 1024" height="16" width="16" fill="currentColor" focusable="false" aria-hidden="true"><path d="M539.414911,228.284271 L765.689081,454.558441 C781.310053,470.179413 781.310053,495.506012 765.689081,511.126984 C750.06811,526.747955 724.74151,526.747955 709.120539,511.126984 L551.13,353.137 L551.13064,904 C551.13064,926.09139 533.22203,944 511.13064,944 C489.03925,944 471.13064,926.09139 471.13064,904 L471.13,353.137 L313.140741,511.126984 C297.51977,526.747955 272.19317,526.747955 256.572199,511.126984 C240.951227,495.506012 240.951227,470.179413 256.572199,454.558441 L482.846369,228.284271 C498.46734,212.6633 523.79394,212.6633 539.414911,228.284271 Z M872,80 C894.09139,80 912,97.90861 912,120 C912,142.09139 894.09139,160 872,160 L152,160 C129.90861,160 112,142.09139 112,120 C112,97.90861 129.90861,80 152,80 L872,80 Z"></path></svg>`

export const marginRightIcon = `<svg viewBox="0 0 1024 1024" height="16" width="16" fill="currentColor" focusable="false" aria-hidden="true"><path d="M539.414911,228.284271 L765.689081,454.558441 C781.310053,470.179413 781.310053,495.506012 765.689081,511.126984 C750.06811,526.747955 724.74151,526.747955 709.120539,511.126984 L551.13,353.137 L551.13064,904 C551.13064,926.09139 533.22203,944 511.13064,944 C489.03925,944 471.13064,926.09139 471.13064,904 L471.13,353.137 L313.140741,511.126984 C297.51977,526.747955 272.19317,526.747955 256.572199,511.126984 C240.951227,495.506012 240.951227,470.179413 256.572199,454.558441 L482.846369,228.284271 C498.46734,212.6633 523.79394,212.6633 539.414911,228.284271 Z M872,80 C894.09139,80 912,97.90861 912,120 C912,142.09139 894.09139,160 872,160 L152,160 C129.90861,160 112,142.09139 112,120 C112,97.90861 129.90861,80 152,80 L872,80 Z" transform="translate(512.000000, 512.000000) rotate(-270.000000) translate(-512.000000, -512.000000) "></path></svg>
`

export const marginBottomIcon = `<svg viewBox="0 0 1024 1024" height="16" width="16" fill="currentColor" focusable="false" aria-hidden="true"><path d="M539.414911,228.284271 L765.689081,454.558441 C781.310053,470.179413 781.310053,495.506012 765.689081,511.126984 C750.06811,526.747955 724.74151,526.747955 709.120539,511.126984 L551.13,353.137 L551.13064,904 C551.13064,926.09139 533.22203,944 511.13064,944 C489.03925,944 471.13064,926.09139 471.13064,904 L471.13,353.137 L313.140741,511.126984 C297.51977,526.747955 272.19317,526.747955 256.572199,511.126984 C240.951227,495.506012 240.951227,470.179413 256.572199,454.558441 L482.846369,228.284271 C498.46734,212.6633 523.79394,212.6633 539.414911,228.284271 Z M872,80 C894.09139,80 912,97.90861 912,120 C912,142.09139 894.09139,160 872,160 L152,160 C129.90861,160 112,142.09139 112,120 C112,97.90861 129.90861,80 152,80 L872,80 Z" transform="translate(512.000000, 512.000000) scale(1, -1) translate(-512.000000, -512.000000) "></path></svg>
`

export const marginLeftIcon = `<svg viewBox="0 0 1024 1024" height="16" width="16" fill="currentColor" focusable="false" aria-hidden="true"><path d="M539.414911,228.284271 L765.689081,454.558441 C781.310053,470.179413 781.310053,495.506012 765.689081,511.126984 C750.06811,526.747955 724.74151,526.747955 709.120539,511.126984 L551.13,353.137 L551.13064,904 C551.13064,926.09139 533.22203,944 511.13064,944 C489.03925,944 471.13064,926.09139 471.13064,904 L471.13,353.137 L313.140741,511.126984 C297.51977,526.747955 272.19317,526.747955 256.572199,511.126984 C240.951227,495.506012 240.951227,470.179413 256.572199,454.558441 L482.846369,228.284271 C498.46734,212.6633 523.79394,212.6633 539.414911,228.284271 Z M872,80 C894.09139,80 912,97.90861 912,120 C912,142.09139 894.09139,160 872,160 L152,160 C129.90861,160 112,142.09139 112,120 C112,97.90861 129.90861,80 152,80 L872,80 Z" transform="translate(512.000000, 512.000000) scale(-1, 1) rotate(-270.000000) translate(-512.000000, -512.000000) "></path></svg>`

export interface IMargin {
  marginTop?: string,
  marginRight?: string,
  marginBottom?: string,
  marginLeft?: string,
}

export const MarginStyleSetter = memo((props: {
  title?: string,
  topTitle?: string,
  rightTitle?: string,
  leftTitle?: string,
  bottomTitle?: string,
  value?: IMargin,
  onChange?: (value?: IMargin) => void
}) => {
  const { title, topTitle, rightTitle, leftTitle, bottomTitle, value, onChange } = props;

  const handleTopChange = useCallback((value?: string | null) => {
    onChange?.({ marginTop: value || undefined })
  }, [onChange])

  const baseValue = useMemo(() => {
    if (value?.marginBottom === value?.marginLeft
      && value?.marginLeft === value?.marginRight &&
      value?.marginRight === value?.marginTop) {
      return value?.marginBottom
    }
    return ""
  }, [value?.marginBottom, value?.marginLeft, value?.marginRight, value?.marginTop])

  const handleBaseChange = useCallback((value?: string | null) => {
    onChange?.({
      marginTop: value || undefined,
      marginBottom: value || undefined,
      marginRight: value || undefined,
      marginLeft: value || undefined,
    })
  }, [onChange])

  return (
    <Fold>
      <FoldBase title={title}>
        <MarginInput value={baseValue} onChange={handleBaseChange} />
      </FoldBase>
      <FoldExtra>
        <MarginTopInput
          title={topTitle}
          value={value?.marginTop}
          onChange={handleTopChange}
        />
        <MarginRightInput
          title={rightTitle}
          value={value?.marginRight}
        />
        <MarginLeftInput title={leftTitle} value={value?.marginLeft} />
        <MarginBottomInput title={bottomTitle} value={value?.marginBottom} />
      </FoldExtra>
    </Fold>
  )
})

export const MarginInput = memo((props: {
  value?: string,
  onChange?: (value?: string | null) => void
}) => {
  return (
    <SizeInput exclude={["inherit", "auto"]} {...props} />
  )
})

export const MarginTopInput = memo((props: {
  title?: string,
  span?: number,
  value?: string,
  onChange?: (value?: string | null) => void
}) => {

  return (
    <SizeInputItem icon={marginTopIcon} {...props} />
  )
})

export const MarginRightInput = memo((props: {
  title?: string,
  span?: number,
  value?: string,
  onChange?: (value?: string | null) => void
}) => {

  return (
    <SizeInputItem icon={marginRightIcon} {...props} />
  )
})

export const MarginBottomInput = memo((props: {
  title?: string,
  span?: number,
  value?: string,
  onChange?: (value?: string | null) => void
}) => {

  return (
    <SizeInputItem icon={marginBottomIcon} marginTop={8} {...props} />
  )
})

export const MarginLeftInput = memo((props: {
  title?: string,
  span?: number,
  value?: string,
  onChange?: (value?: string | null) => void
}) => {

  return (
    <SizeInputItem icon={marginLeftIcon} marginTop={8} {...props} />
  )
})