
import { infoIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { infoMessageSchema } from "./schema";
import { ReactNode } from "react";
import { ActivityType, IActivityMaterial } from "@rxdrag/minions-schema";

export const infoMessageMaterial: IActivityMaterial<ReactNode> = {
  icon: infoIcon,
  label: "$infoMessage",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: infoMessageSchema,
  reaction: InfoMessage,
  subTitle: (config?: IInfoMessageConfig) => {
    if (config?.type) {
      return config?.type?.toString()
    }
  },
}