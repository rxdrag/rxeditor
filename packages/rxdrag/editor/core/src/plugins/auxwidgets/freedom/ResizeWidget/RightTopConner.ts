import { IDesignerEngine, IRect, ITreeNode } from "../../../../interfaces";
import { CornerHandler, Offset } from "./CornerHandler";
import { rigtTopCursor } from "./cursors";
import { HandlerSize, leftBottomTopRightCursor, svgCursor } from "./utils";

export class RightTopConner extends CornerHandler {
  constructor(protected nodes: (ITreeNode | undefined)[], protected rect: IRect, container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(nodes, rect, container, engine)
    this.htmlElement.style.transform = "translate(50%, -50%)"
    this.htmlElement.style.cursor = svgCursor(leftBottomTopRightCursor, "ne-resize")
    this.htmlElement.style.right = "0"
    this.htmlElement.style.top = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = svgCursor(rigtTopCursor, "default")
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.right = "-1px"
    rightRotate.style.bottom = "0"
    rightRotate.style.transform = "translate(100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = svgCursor(rigtTopCursor, "default")
    rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.left = "0"
    rightRotate.style.top = "-1px"
    rightRotate.style.transform = "translate(0, -100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }

  protected onDragging(offset: Offset): void {
    throw new Error("Method not implemented.");
  }

  protected onDrop(offset: Offset): void {
    throw new Error("Method not implemented.");
  }

}