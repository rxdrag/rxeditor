import { ITreeNode } from "@rxdrag/core";
import { useCurrentNode, useGetNode } from "@rxdrag/react-core";
import { useCallback, useEffect, useState } from "react";
import { IModelMeta, ModelType } from "../ModuleUiDesigner/interfaces";
import { useGetEntity } from "./useGetEntity";
import { EntityMeta } from "../ModuleUiDesigner/interfaces/EntityMeta";

export function useRecentEntity() {
  const [entity, setEntity] = useState<EntityMeta>()
  const node = useCurrentNode()

  const getNode = useGetNode()
  const getEntity = useGetEntity()
  const getEntityId = useCallback((node?: ITreeNode | null) => {
    const modelMeta = node?.meta?.["x-data"] as IModelMeta | undefined
    if (modelMeta?.modelMetaId && modelMeta.type === ModelType.Entity) {
      return modelMeta?.modelMetaId
    } else {
      if (node?.parentId) {
        const parent = getNode(node?.parentId)
        if (parent) {
          return getEntityId(parent)
        }
      }
    }
  }, [getNode])
  
  useEffect(() => {
    setEntity(getEntity(getEntityId(node)))
  }, [getEntity, getEntityId, node])

  return entity
}