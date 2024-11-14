import {Form} from "antd";
import {Label} from "@/components/ui/label";
import {PhoneInput} from "@/components/form/phone/input";
import {CountryCode} from "libphonenumber-js";


const FormPhoneInput = ({name, label, initialValue, className, required, defaultCountry}: {
    name: string;
    label?: string;
    initialValue?: string;
    className?: string;
    required?: boolean;
    defaultCountry?: CountryCode;
}) => {

    const Component = ({value, onChange}: {
        value?: string;
        onChange?: any
    }) => {

        return (
            <>
                <div className="space-y-2">
                    <Label>{label}</Label>
                    <PhoneInput
                        value={value}
                        onChange={onChange}
                        defaultCountry={defaultCountry || "BD"}
                    />
                </div>
            </>
        )
    }


    return (
        <Form.Item
            name={name}
            initialValue={initialValue || ""}
            className={className || "mb-4"}
            rules={[{required: required, message: `${label} is required`}]}
        >
            <Component/>
        </Form.Item>
    )
}

export default FormPhoneInput;