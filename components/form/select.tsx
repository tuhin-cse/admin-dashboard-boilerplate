import {Label} from "@/components/ui/label";
import {Form} from "antd";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const FormSelect = ({
                        name,
                        label,
                        className,
                        required,
                        placeholder,
                        options
                    }: {
    name: string;
    label?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    options?: any[]
}) => {
    const Component = ({value, onChange}: {
        value?: string;
        onChange?: any
    }) => {

        return (
            <>
                <div className="space-y-2">
                    <Label>{label}</Label>
                    <Select value={value} onValueChange={onChange}>
                        <SelectTrigger>
                            <div className={!!value ? '' : 'opacity-70'}>
                                <SelectValue  placeholder={placeholder || ""}/>
                            </div>

                        </SelectTrigger>
                        <SelectContent>
                            {options?.map((option, index) => (
                                <SelectItem
                                    key={index}
                                    value={option.value || option?._id}>
                                    {option.label || option?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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

export default FormSelect;
