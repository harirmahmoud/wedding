import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type EventFormData = {
  [key: string]: string | number | boolean | undefined;
};

type FormContext = {
  watch: (name: keyof EventFormData) => string | undefined;
  setValue: (name: keyof EventFormData, value: any) => void;
};

type RadioGroupFieldProps = {
  name: keyof EventFormData;
  options: { value: string; label: string }[];
  form: any;
};

export  const RadioGroupField = ({ name, options, form }: RadioGroupFieldProps) => {
  const value = form.watch(name) as string | undefined;

  return (
    <RadioGroup
      value={value}
      onValueChange={(val) => form.setValue(name, val as any)}
      className="flex flex-wrap gap-3"
    >
      {options.map((option) => (
        <Label
          key={option.value}
          htmlFor={`${name}-${option.value}`}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border
          cursor-pointer transition-colors
          data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary"
        >
          <RadioGroupItem
            id={`${name}-${option.value}`}
            value={option.value}
          />
          <span className="text-sm">{option.label}</span>
        </Label>
      ))}
    </RadioGroup>
  );
};
