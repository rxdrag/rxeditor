import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Button, Space, Tooltip } from "antd"
import { AppstoreOutlined, FunctionOutlined, ControlOutlined } from "@ant-design/icons"
import { FXes } from "./FXes"
import { Flows } from "./Flows"
import { PropertyPanel } from "./PropertyPanel"
import { LeftNav } from "../common/LeftNav"
import { LeftColumn } from "../common/LeftColumn"
import { Container } from "../common/Container"

const Content = styled.div`
  flex: 1;
`

enum NavType {
  toolbox = "toolbox",
  flows = "flows",
  fxes = "fxes",
}

export const FlowDesigner = memo((
  props: {
    showPropertyPanel?: boolean,
  }
) => {
  const { showPropertyPanel } = props;
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)


  const handleToggleToolbox = useCallback(() => {
    setNavType(type => type === NavType.toolbox ? null : NavType.toolbox)
  }, [])

  const handleToggleFlows = useCallback(() => {
    setNavType(type => type === NavType.flows ? null : NavType.flows)
  }, [])

  const handleToggleFxes = useCallback(() => {
    setNavType(type => type === NavType.fxes ? null : NavType.fxes)
  }, [])

  return (
    <Container>
      <LeftNav>
        <Space direction="vertical">
          <Tooltip title="元件箱" placement="right">
            <Button
              type={navType === NavType.toolbox ? "link" : "text"}
              icon={<AppstoreOutlined />}
              onClick={handleToggleToolbox}
            />
          </Tooltip>
          <Tooltip title="编排" placement="right">
            <Button
              type={navType === NavType.flows ? "link" : "text"}
              icon={<ControlOutlined />}
              onClick={handleToggleFlows}
            />
          </Tooltip>
          <Tooltip title="子编排" placement="right">
            <Button
              type={navType === NavType.fxes ? "link" : "text"}
              icon={<FunctionOutlined />}
              onClick={handleToggleFxes}
            />
          </Tooltip>
        </Space>
      </LeftNav>
      {
        navType && <LeftColumn
          width={200}
          maxWidth={500}
          minWidth={160}
        >
          {
            navType === NavType.flows &&
            <Flows />
          }
          {
            navType === NavType.fxes &&
            <FXes />
          }
        </LeftColumn>
      }
      <Content />
      {
        showPropertyPanel && <PropertyPanel />
      }

    </Container>
  )
})