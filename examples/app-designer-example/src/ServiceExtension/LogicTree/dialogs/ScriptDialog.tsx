import { useTranslate } from "@rxdrag/react-locales";
import { Form, Modal } from "antd"
import { memo, useCallback, useEffect } from "react"
import { IExtendsionScript } from "../../../interfaces/extension";
import { MethodFormCommonItems } from "./MethodFormCommonItems";

export const ScriptDialog = memo((
  props: {
    title?: string,
    open?: boolean,
    script?: IExtendsionScript,
    onClose: () => void,
    onConfirm: (script: IExtendsionScript) => void,
    saving?: boolean,
  }
) => {
  const { title, open, script, onClose, onConfirm, saving } = props;
  const [form] = Form.useForm<IExtendsionScript>();
  useEffect(() => {
    if (script) {
      form.setFieldsValue(script)
    }

  }, [form, script])
  const t = useTranslate();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm(changeValues)
      form.resetFields()
    })
  }, [form, onConfirm])

  const handleCancel = useCallback(() => {
    form.resetFields()
    onClose?.()
  }, [form, onClose])

  return (
    <Modal
      title={title}
      open={open}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
      okButtonProps={{ loading: saving }}
      centered
      wrapProps={
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick: (e: any) => {
            e.stopPropagation()
          },
        }
      }
    >
      <Form
        name="editScript"
        labelWrap
        initialValues={script || { title: "", description: "" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        form={form}
        autoComplete="off"
      >
        {
          script && <MethodFormCommonItems method={script} />
        }
      </Form>
    </Modal>
  )
})