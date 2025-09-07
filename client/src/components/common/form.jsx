import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import React from 'react'


// dcm bi loi {} 2 lan lien tuc dcm 
function CommonForm({ formControls, formData, setFormData, buttonText, onSubmit }) {

    const types = {
        INPUT: "input",
        TEXTAREA: "textarea",
        SELECT: "select"
    }
    const renderInputsByComponentType = (getcontrolItems) => {
        let element = null;
        const value = formData[getcontrolItems.name] || '';
        switch (getcontrolItems.componentType) {
            case types.INPUT:
                element = (<Input
                    name={getcontrolItems.name}
                    placeholder={getcontrolItems.placeholder}
                    label={getcontrolItems.label}
                    required={getcontrolItems.required}
                    type={getcontrolItems.type}
                    value={value}
                    onChange={event => {
                        setFormData({
                            ...formData,
                            [getcontrolItems.name]: event.target.value
                        })
                    }} />)
                break;
            case types.SELECT:
                element = (
                    <Select value={value}
                        onValueChange={value => setFormData({
                            ...formData,
                            [getcontrolItems.name]: value
                        })}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getcontrolItems.placeholder} />

                        </SelectTrigger>
                        <SelectContent>
                            {
                                getcontrolItems.options &&
                                    getcontrolItems.options.length > 0 ?
                                    getcontrolItems.options.map(optionItem => {
                                        <SelectItem key={optionItem.id} value={optionItem.id} >{optionItem.label}</SelectItem>

                                    })
                                    : console.warn("No options provided for select component")
                            }
                        </SelectContent>
                    </Select>
                )
                break;
            case types.TEXTAREA:
                element = (<Textarea
                    name={getcontrolItems.name}
                    type={getcontrolItems.type}
                    placeholder={getcontrolItems.placeholder}
                    value={value}
                    onChange={
                        event => {
                            setFormData({
                                ...formData,
                                [getcontrolItems.name]: event.target.value
                            })
                        }
                    }
                />)
                break;
            default:
                element = (<Input
                    name={getcontrolItems.name}
                    type={getcontrolItems.type}
                    placeholder={getcontrolItems.placeholder}
                    value={value}
                    onChange={
                        event => {
                            setFormData({
                                ...formData,
                                [getcontrolItems.name]: event.target.value
                            })
                        }
                    }
                />)
                break;
        }
        return element;

    }
    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <div className="flex flex-col gap-3">
                    {
                        formControls.map(controlItem => <div className='grid w-full gap-3' key={controlItem.name}>
                            <Label className="mb-1 text-left">{controlItem.label} </Label>
                            {
                                renderInputsByComponentType(controlItem)
                            }

                        </div>)
                    }
                </div>
                <Button type="submit" variant="default" className="mt-3 w-full"> {buttonText || "Submit"}</Button>
            </form>

        </div>
    )
}
export default CommonForm;
