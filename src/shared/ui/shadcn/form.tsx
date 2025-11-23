"use client";

import * as React from "react";
import {
	type Control,
	Controller,
	type ControllerProps,
	type ControllerRenderProps,
	type FieldError,
	type FieldPath,
	type FieldValues,
	FormProvider,
	type PathValue,
	useFormContext,
} from "react-hook-form";

import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";
import { Label } from "./label";

const getHasError = (
	fieldError: FieldError | undefined,
	error: boolean | null | undefined,
): boolean => {
	return typeof error === "boolean" ? error : !!fieldError;
};

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
	null,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	if (!itemContext) {
		throw new Error("useFormField should be used within <FormItem>");
	}

	const fieldState = getFieldState(fieldContext.name, formState);

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={cn("space-y-2", className)} {...props} />
		</FormItemContext.Provider>
	);
});
FormItem.displayName = "FormItem";

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot> & {
		error?: boolean | null;
		disabled?: boolean;
	}
>(({ className, error: errorOverride, ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();
	const hasError = getHasError(error, errorOverride);

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!hasError
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={hasError}
			className={cn("", className)}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof Label> & {
		error?: boolean | null;
		applyErrorStyle?: boolean;
	}
>(({ className, error: errorOverride, applyErrorStyle, ...props }, ref) => {
	const { formItemId, error } = useFormField();
	const hasError = getHasError(error, errorOverride);

	return (
		<Label
			ref={ref}
			className={cn(
				"",
				hasError && applyErrorStyle && "!text-alert",
				className,
			)}
			htmlFor={formItemId}
			aria-invalid={hasError}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

const FormDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn(
				"paragraph-14 flex items-center gap-1 text-blue-20",
				className,
			)}
			{...props}
		/>
	);
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement> & { error?: boolean | null }
>(({ className, children, error: errorOverride, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const hasError = getHasError(error, errorOverride);
	const body = hasError ? String(error?.message ?? "") : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn("text-xs text-alert", className)}
			{...props}
		>
			{body}
		</p>
	);
});
FormMessage.displayName = "FormMessage";

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
};

export type { Control, FieldPath, FieldValues, PathValue };

export type FormFieldRenderProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	field: ControllerRenderProps<TFieldValues, TName>;
};
