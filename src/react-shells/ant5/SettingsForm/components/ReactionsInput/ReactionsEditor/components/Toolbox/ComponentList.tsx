import { Space, Typography } from "antd";
import { memo, useCallback } from "react"
import { listenVariableMaterial, reactionMaterial, setPropMaterial, setVariableMaterial } from "react-shells/ant5/materials/controllerReactions";
import { IReactionMaterial } from "runner/reaction/interfaces/material";
import { IControllerMeta, IReactionMeta, IReactionNodeMeta } from "runner/reaction/interfaces/metas";
import styled from "styled-components";
import { listenVariableIcon, methodIcon, setPropIcon, setVariableIcon } from "../../../../../../icons/reactions";
import { useControllerNodes } from "../../hooks/useControllerNodes";
import { useDnd } from "../../hooks/useDnd";
import { useGetNodeConfig } from "../../hooks/useGetNodeConfig";
import { useGraph } from "../../hooks/useGraph";
import { useTrans } from "../../hooks/useTrans";
import { createUuid } from "../../utils";

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const ReactionList = styled.div`
  display: flex;
  flex-flow: column;
  padding: 8px 16px 0 16px;
`

const ItemTitle = styled.div`
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  padding: 4px 8px; 
  border-radius: 4px;
  cursor: move;
`
export const ComponentList = memo((
  props: {
    currentController: IControllerMeta
  }
) => {
  const { currentController } = props;
  const t = useTrans()
  const graph = useGraph()
  const dnd = useDnd()
  const getNodeConfig = useGetNodeConfig()

  const startDefaultDragFn = useCallback((marterial: IReactionMaterial, controllerId:string|undefined, reactionName:string) => {
    console.log("哈哈", controllerId, reactionName)
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IReactionNodeMeta = {
        id: createUuid(),
        label: t(marterial.label),
        type: marterial.reactionType,
        materialName: marterial.name,
        ...marterial.meta,
        config:{
          controllerId,
          reactionRef: reactionName,
        }
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph, t])

  const startDragFn = useCallback((reaction: IReactionMeta, marterial: IReactionMaterial) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IReactionNodeMeta = {
        id: createUuid(),
        label: reaction.label || reaction.name,
        type: marterial.reactionType,
        materialName: marterial.name,
        ...marterial.meta
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph])

  const controllerNodes = useControllerNodes()

  return (
    <div>
      {
        controllerNodes.map((node, index) => {
          const controller: IControllerMeta = currentController.id === node.meta?.["x-reactions"]?.id ? currentController : node.meta?.["x-reactions"]
          return (
            <Container
              key={node.id}
            >
              <Typography.Text type="secondary" style={{ marginTop: index !== 0 ? 8 : 0 }}>
                {controller.name || node.title}
              </Typography.Text>
              <ReactionList>
                <Space direction="vertical">
                  <ItemTitle onMouseDown={startDefaultDragFn(setPropMaterial, controller.id, setPropMaterial.name)}>{setPropIcon} {t("$setProp")}</ItemTitle>
                  {
                    !!controller.variables?.length &&
                    <>
                      <ItemTitle onMouseDown={startDefaultDragFn(setVariableMaterial, controller.id, setVariableMaterial.name)}>{setVariableIcon} {t("$setVariable")}</ItemTitle>
                      <ItemTitle onMouseDown={startDefaultDragFn(listenVariableMaterial, controller.id, setVariableMaterial.name)}>{listenVariableIcon} {t("$listenVariable")}</ItemTitle>
                    </>
                  }
                  {
                    controller.reactions?.map(reaction => {
                      return (<ItemTitle key={reaction.id} onMouseDown={startDragFn(reaction, reactionMaterial)}>{methodIcon} {reaction.label}</ItemTitle>)
                    })
                  }
                </Space>
              </ReactionList>
            </Container>
          )
        })
      }
    </div>
  )
})