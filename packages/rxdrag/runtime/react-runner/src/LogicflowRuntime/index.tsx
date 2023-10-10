import React, { memo, useEffect, useMemo, useRef } from "react"
import { useState } from "react"
import { ControllerEngineContext } from "../contexts"
import { ControllerEngine } from "./ControllerEngine"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { IComponentRenderSchema } from "../ComponentView"
import { IVariable } from "@rxdrag/minions-schema"
import { useControllerEngine } from "../hooks/useControllerEngine"
import { ControllerReaction, useLogicDefines } from "@rxdrag/minions-runtime-react"
import { ILoopScope, ILoopScopeContext, LogicFlow } from "@rxdrag/minions-runtime"

export type LogicFlowOptions = {
  ownerId?: string,
  reactions?: Record<string, ControllerReaction>,
  variables?: IVariable[],
}

export const LogicflowRuntime = memo((props: {
  children: React.ReactNode,
  schema: IComponentRenderSchema,
  loopRow?: unknown,
  loopIndex?: number,
} & LogicFlowOptions) => {
  const { children, schema, ownerId, reactions, variables, loopRow, loopIndex } = props
  const { flows, fxFlows, scripts, fxScripts, } = useLogicDefines() || {}
  const loopScope: ILoopScope = useMemo(() => {
    return {
      value: loopRow,
      index: loopIndex,
    }
  }, [loopIndex, loopRow])
  const [controllerEngine, setControllerEngine] = useState<ControllerEngine | null>(null)
  const engineRef = useRef(controllerEngine)
  engineRef.current = controllerEngine

  const parent = useControllerEngine()

  useEffect(() => {
    const rtEngine = new ControllerEngine(
      schema,
      {
        parent,
        variableMetas: variables,
        reactions: { ...parent?.reactions, ...reactions },
        fxFlows,
        loopScope
      }
    )
    engineRef.current?.destroy()
    setControllerEngine(rtEngine)
  }, [fxFlows, loopScope, parent, reactions, schema, variables])

  useEffect(() => {
    return () => {
      engineRef.current?.destroy()
    }
  }, [])

  const logicFlowContext = useLogicFlowContext(controllerEngine);

  useEffect(() => {
    if (logicFlowContext?.controllers) {
      const flowRuntimes = flows?.filter(flow => flow.ownerId === ownerId)?.map(flowMeta => {
        return new LogicFlow(flowMeta, logicFlowContext)
      })

      return () => {
        flowRuntimes?.forEach(flow => flow.destroy())
      }
    }
  }, [flows, logicFlowContext, ownerId])

  return (
    controllerEngine ?
      <ControllerEngineContext.Provider value={controllerEngine}>
        {
          children
        }
      </ControllerEngineContext.Provider>
      : <>can not create run time engine</>
  )
})