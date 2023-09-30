import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { IControllerMeta, IPropConfig, ListenProp } from "@rxdrag/minions-runtime-react";
import { IRxDragActivityMaterial } from "../../interfaces";
import { propSchema } from "../setProp/schema";
import { listenPropIcon } from "../../../icons";
import { LogicflowContextParam } from "../../../types";
import { getControllerComponentInfo } from "../utils";

export const listenPropMaterial: IRxDragActivityMaterial<IPropConfig, LogicflowContextParam> = {
  label: "$listenProp",
  activityType: NodeType.Activity,
  defaultPorts: {
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: propSchema,
  icon: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    return material?.resource?.icon || listenPropIcon
  },

  color: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    return material?.resource?.color
  },

  title: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config?.param, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
  subTitle: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config?.param, context?.engine)
    const prop = config?.param?.prop
    const label = material?.controller?.props?.find(pro => pro.name === prop)?.label
    const transedLabel = label?.startsWith("$")
              ? context?.engine?.getLocalesManager().getComponentSettingsMessage(material?.componentName||"", label.substring(1))
              : label
    return transedLabel || prop
  },
  activityName: ListenProp.NAME,
}