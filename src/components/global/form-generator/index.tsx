import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ErrorMessage} from "@hookform/error-message";

interface FormGeneratorProps {
    type?: "text" | "email" | "password" | "number"
    inputType: "select" | "input" | "textarea"
    options?: {value : string; label : string; id : string}[]
    label?: string
    placeholder: string
    register: UseFormRegister<any>
    name : string
    errors : FieldErrors<FieldValues>
    lines?: number
}

const FormGenerator = ({errors, inputType, label, lines, name, options, placeholder, register, type} : FormGeneratorProps) => {
    switch (inputType) {
        case "input":
            return <div className="mt-2">
                <Input className="border border-[#232325]" type={type} placeholder={placeholder} {...register(name)} style={{borderRadius: "0.4rem"}} />
                <ErrorMessage name={name} errors={errors} render={({message}) => (
                    <p className="text-red-600 mt-1">
                        {message}
                    </p>
                )} />
            </div>

    }
}

export default FormGenerator