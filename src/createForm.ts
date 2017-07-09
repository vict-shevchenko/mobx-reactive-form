import React, { Component, createElement } from 'react';
import * as PropTypes from 'prop-types';
import { observable, action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import { Form } from './Form';
import { formSchema } from './interface';

function isFormSchemaValid(schema: formSchema) {
	return schema && typeof schema === 'object' && !Array.isArray(schema)
}


export function createForm(formName: string, initialSchema: formSchema = {}) {

	return wrappedForm => {
		@inject('formStore')
		@observer
		class FormUI extends Component<{ formStore: any, onSubmit?: any, schema?: formSchema }, any> {
			form: Form;

			static childContextTypes = {
				_ReactiveMobxForm: PropTypes.object.isRequired
			}

			static defaultProps = {
				schema: {}
			};

			constructor(props, context) {
				super(props, context);
				
				// todo: remove for production build
				const mergedSchema = (isFormSchemaValid(initialSchema) && isFormSchemaValid(props.schema)) ? Object.assign(initialSchema, props.schema) : {} 

				this.form = new Form(mergedSchema);
				this.form.component = wrappedForm; // for debugging/error handling purposes
			}

			getChildContext() {
				return { _ReactiveMobxForm: this.form };
			}

			componentWillMount() {
				this.props.formStore.registerForm(formName, this.form);
				this.form.registerValidation();
			}

			componentDidMount() {
				this.form.mounted = true;
			}

			componentWillUnmount() {
				this.form.mounted = false;
				this.props.formStore.unRegisterForm(formName);
			}

			// todo: pass additional information to submimt
			submitForm(event: Event) {
				event.preventDefault();

				this.form.submitting = true;

				Promise.all([this.props.onSubmit(this.form.values)])
					.catch(error => {
						this.form.submissionError = error;
					})
					.then(result => {
						this.resetForm();
					})
					.then(() => {
						this.form.submitting = false;
					})
			}

			resetForm() {
				this.form.reset();
			}

			render() {
				return createElement(wrappedForm, {
					submit: this.submitForm.bind(this),
					reset: this.resetForm.bind(this),
					submitting: this.form.submitting, // todo: when submit change - full form render method is executed. Thing on more performat approach. May be Submitting component
					/* validation: form.validation, */ //todo - this case render been called when any field change
					valid: this.form.isValid,
					dirty: this.form.isDirty
					/* errors: this.form.errors */ //todo - this case render been called when any field change
				});
			}
		}

		return FormUI;
	}
}