import { createUuid } from "@rxdrag/shared";
import { readFieldValueSchema } from "./schema";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { fieldReadIcon } from "../icons";
import { ReadFieldValueActivityName } from "@rxdrag/fieldy-minions-activities";

export const readFieldValueMaterial: IActivityMaterial<ReactNode> = {
  activityName: ReadFieldValueActivityName,
  icon: fieldReadIcon,
  label: "$readFieldValue",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: readFieldValueSchema,
}