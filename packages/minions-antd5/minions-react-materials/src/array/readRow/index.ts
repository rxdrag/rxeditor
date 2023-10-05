import { createId } from "@rxdrag/shared"
import { NodeType } from "@rxdrag/minions-schema"
import { IControllerConfig, IControllerMeta, ReadRow } from "@rxdrag/minions-runtime-react"
import { IRxDragActivityMaterial } from "../../interfaces"
import { LogicflowContextParam } from "../../../types"
import { getControllerComponentInfo } from "../../controller/utils"
import { currentRowIcon } from "../../icons"

export const readRowMaterial: IRxDragActivityMaterial<IControllerConfig, LogicflowContextParam> = {
  label: "$readCurrentRow",
  icon: currentRowIcon,
  activityType: NodeType.Activity,
  activityName: ReadRow.NAME,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "",
      },
    ],
  },

  color: (config?: IControllerConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    return material?.resource?.color
  },
  subTitle: (config?: IControllerConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config?.param, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
}
