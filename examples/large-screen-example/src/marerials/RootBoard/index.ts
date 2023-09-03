import { IComponentMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { schema } from "./schema";
import { RootBoard } from "../../components/RootBoard";
import { ThemeTokenSetter } from "./setters";

export const RootBoardMaterial: IComponentMaterial = {
  componentName: "RootBoard",
  component: RootBoard,
  designer: RootBoard,
  propsSchema: schema,
  designerLocales: locales,
  behaviorRule: {
    droppable: true,
  },
  setters: {
    ThemeTokenSetter
  },
}