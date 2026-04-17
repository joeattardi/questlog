import { Controller, type Control, type FieldValues, type RegisterOptions, type Path } from 'react-hook-form';
import { TextField } from '@radix-ui/themes';
import { type ComponentProps } from 'react';

interface InputProps<T extends FieldValues = FieldValues> extends Omit<ComponentProps<typeof TextField.Root>, 'name'> {
    name: Path<T>;
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
}

export default function Input<T extends FieldValues = FieldValues>({ control, rules, name, ...rest }: InputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <TextField.Root {...field} {...rest} />
            )}
        />
    );
}
