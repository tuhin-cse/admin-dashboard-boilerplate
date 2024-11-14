import {Form} from "antd";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

const FormInput = ({
                       name,
                       label,
                       type,
                       initialValue,
                       placeholder,
                       className,
                       required,
    onChange,
                       textArea,
                       isEmail,
                       autoFill,
                       accept,
    readonly,
                   }: {
    name: string;
    label?: string;
    className?: string;
    type?: string;
    initialValue?: string;
    placeholder?: string;
    required?: boolean;
    textArea?: boolean;
    onChange?: any;
    isEmail?: boolean;
    autoFill?: boolean;
    accept?: string;
    readonly?: boolean;
}) => {


    const Component = ({value, onChange}: {
        value?: any;
        onChange?: any
    }) => {

        let input = (
            <Input
                type={type}
                value={value}
                className="block"
                onChange={onChange}
                placeholder={placeholder || ""}
                autoComplete={autoFill ? 'on' : 'off'}
                readOnly={readonly}
            />
        )

        if (textArea) {
            input = (
                <Textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || ""}
                    readOnly={readonly}
                />
            )
        }

        if (type === 'file') {
            input = (
                <Input
                    type="file"
                    accept={accept}
                    onChange={e => onChange(e.target.files[0])}
                />
            )
        }


        return (
            <>
                <div className="space-y-2">
                    <Label>{label}</Label>
                    {input}
                </div>
            </>
        )
    }

    const rules: any[] = [
        {required, message: `${label} is required`},
    ]
    if (isEmail) {
        rules.push({type: 'email', message: 'Invalid email'})
    }

    return (
        <Form.Item
            name={name}
            initialValue={initialValue || ""}
            className={className || "mb-4"}
            rules={rules}
        >
            <Component onChange={onChange}/>
        </Form.Item>
    )
}

export default FormInput;


export const HiddenInput = ({name, initialValue}: { name: string, initialValue?: string }) => {
    return (
        <Form.Item
            name={name}
            initialValue={initialValue || ""}
            hidden
        >
            <Input/>
        </Form.Item>
    )
}