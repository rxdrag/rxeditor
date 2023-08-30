import { UnorderedListOutlined } from "@ant-design/icons"
import { memo } from "react"
import styled from "styled-components"
import { CanvasFloatButton } from "../common"

const Container = styled.div`
  position: fixed;
  top: 64px;
  left: 64px;
`

export const LeftSideSecondary = memo(() => {
  return (
    <Container className="rx-left-secondary">
      <CanvasFloatButton  icon={<UnorderedListOutlined />} />
    </Container>
  )
})