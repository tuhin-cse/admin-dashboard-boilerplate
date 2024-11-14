import {Form} from "antd";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {LockIcon, LockOpenIcon} from "lucide-react";

const FormPassword = ({
                          name,
                          label,
                          className,
                          required,
    placeholder,
                      }: {
    name: string;
    label?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
}) => {


    const [show, setShow] = useState(false)


    const Component = ({value, onChange}: {
        value?: string;
        onChange?: any
    }) => {


        return (
            <>
                <div className="space-y-2">
                    <Label>{label}</Label>
                    <div className="relative">
                        <Input
                            type={show ? 'text' : 'password'}
                            value={value}
                            className="pr-10"
                            autoFocus={false}
                            placeholder={placeholder || ""}
                            onChange={onChange}
                        />
                        <div
                            onClick={() => setShow(!show)}
                            className="absolute right-3 top-3 cursor-pointer">
                            {show ? <LockOpenIcon size={16}/> : <LockIcon size={16}/>}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Form.Item
            name={name}
            initialValue={""}
            className={className || "mb-4"}
            rules={[{required, message: `${label} is required`}]}
        >
            <Component/>
        </Form.Item>
    )
}

export default FormPassword;
