import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { sendContactInquiry } from "../api/contact.api";
import {
	type ContactFormValues,
	toContactPayload,
} from "./contact-form-schema";

export type ContactMutationVariables = ContactFormValues;
export type ContactMutationData = undefined;

export function useContactFormMutation(
	options?: UseMutationOptions<
		ContactMutationData,
		Error,
		ContactMutationVariables
	>,
) {
	return useMutation<ContactMutationData, Error, ContactMutationVariables>({
		mutationKey: ["contact", "submit"],
		mutationFn: async (values: ContactMutationVariables) =>
			sendContactInquiry(toContactPayload(values)),
		...options,
	});
}
