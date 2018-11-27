// tslint:disable-next-line:max-line-length
import { IFormSchema, IFormNormalizedSchema, IFieldDefinition, INormalizedFieldDefinition, fieldValue } from './interfaces/Form';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export function omit<P, K>(obj: P, omitKeys: string[]): Omit<P, K> {
	const result = {};

	Object.keys(obj).forEach(key => {
		if (omitKeys.indexOf(key) === -1) {
			result[key] = obj[key];
		}
	});

	return result as Omit<P, K>;
}

export function objectPath(str: string): string[] {
	if (typeof str !== 'string') {
		throw new TypeError('Field name must be passed a string');
	}

	const parts: string[] = [];
	let i = 0, d, b, q, c;

	while (i < str.length) {
		d = str.indexOf('.', i);
		b = str.indexOf('[', i);

		// we've reached the end
		if (d === -1 && b === -1) {
			parts.push(str.slice(i, str.length));
			i = str.length;
		}

		// dots
		else if (b === -1 || (d !== -1 && d < b)) {
			parts.push(str.slice(i, d));
			i = d + 1;
		}

		// brackets
		else {
			if (b > i) {
				parts.push(str.slice(i, b));
				i = b;
			}
			q = str.slice(b + 1, b + 2);
			if (q !== '"' && q !== '\'') {
				c = str.indexOf(']', b);
				if (c === -1) {
					c = str.length;
				}
				parts.push(str.slice(i + 1, c));
				i = (str.slice(c + 1, c + 2) === '.') ? c + 2 : c + 1;
			} else {
				c = str.indexOf(q + ']', b);
				if (c === -1) {
					c = str.length;
				}
				while (str.slice(c - 1, c) === '\\' && b < str.length) {
					b++;
					c = str.indexOf(q + ']', b);
				}
				parts.push(str.slice(i + 2, c).replace(new RegExp('\\' + q, 'g'), q));
				i = (str.slice(c + 2, c + 3) === '.') ? c + 3 : c + 2;
			}
		}
	}
	return parts;
}

export function objectMissProps(propNames: string[], obj: any): string[] | null {
	const missingProps: string[] = [];

	for (const propName of propNames) {
		if (!obj.hasOwnProperty(propName)) {
			missingProps.push(propName);
		}
	}

	return missingProps.length ? missingProps : null;
}

export function isNumeric(str: string): boolean {
	return parseInt(str, 10).toString() === str;
}

export function verifyRequiredProps(required, props, component): void {
	const missingProps = objectMissProps(required, props);

	if (missingProps) {
		throw (new Error(`You forgot to specify '${missingProps.join(', ')}' propert${missingProps.length > 1 ? 'ies' : 'y'}
				for <${Object.getPrototypeOf(component).constructor.name} name="${component.props.name}" /> component.`));
	}
}

export function normalizeSchema(draftSchema: IFormSchema): IFormNormalizedSchema {
	return Object.keys(draftSchema).reduce((schema: IFormNormalizedSchema, fieldName: string): IFormNormalizedSchema => {
		const fieldDefinition: IFieldDefinition = draftSchema[fieldName];
		let normalizedFieldDefinition: INormalizedFieldDefinition;

		if (Array.isArray(fieldDefinition)) {
			// tslint:disable-next-line:max-line-length
			normalizedFieldDefinition = (fieldDefinition.length === 2) ? (fieldDefinition as [fieldValue, string]) : [fieldDefinition[0], ''];
		} else {
			normalizedFieldDefinition = [fieldDefinition as fieldValue, ''];
		}

		schema[fieldName] = normalizedFieldDefinition;

		return schema;
	}, {});
}
