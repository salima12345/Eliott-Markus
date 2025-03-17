import { Control, FieldValues, Path } from 'react-hook-form';
import * as yup from 'yup';
import { Expertise } from './enums';
import { MadeInExpertise } from './enums';
import { Subject } from './enums';

const phoneRegExp = /^[0-9]{10}$/;
const websiteRegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export type FormData = {
  subject: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  website?: string;
  message: string;
  agree: boolean;
  attachment: File | null;
  expertise?: Expertise;
  madeIn?:  MadeInExpertise;
};

export const contactFormSchema = yup.object().shape({
  // Subject validation
  subject: yup.string()
    .required('Subject is required')
    .oneOf(
      Object.values(Subject),
      'Please select a valid subject'
    ),

  // First name validation
  firstName: yup.string()
    .required('First name is required')
    .matches(
      /^[A-Za-zÀ-ÿ\s'-]+$/, 
      'First name can only contain letters, spaces, hyphens and apostrophes'
    )
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),

  // Last name validation
  lastName: yup.string()
    .required('Last name is required')
    .matches(
      /^[A-Za-zÀ-ÿ\s'-]+$/, 
      'Last name can only contain letters, spaces, hyphens and apostrophes'
    )
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),

  // Email validation
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters'),

  // Phone validation
  phone: yup.string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits'),

  // City validation (optional)
  city: yup.string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .max(100, 'City name cannot exceed 100 characters')
    .matches(
      /^[A-Za-zÀ-ÿ\s'-]*$/, 
      'City name can only contain letters, spaces, hyphens and apostrophes'
    ),

  // Website validation (optional)
  website: yup.string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .test('validWebsite', 'Invalid website URL format', (value) => {
      if (!value) return true;
      return websiteRegExp.test(value);
    })
    .max(200, 'Website URL cannot exceed 200 characters'),

  // Message validation
  message: yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),

  // Privacy policy agreement validation
  agree: yup.boolean()
    .required('You must accept the privacy policy')
    .oneOf([true], 'You must accept the privacy policy'),

  // Attachment validation
  attachment: yup.mixed()
    .nullable()
    .test('required-if-hiring', 'CV is required for hiring applications', function (value) {
      return this.parent.subject !== 'Hiring' || (value instanceof File);
    })
    .test('file-size', 'File size must be less than 5MB', function (value) {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    })
    .test('file-type', 'Only PDF, DOC, DOCX and TXT files are allowed', function (value) {
      if (!value) return true;
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
      ];
      return value instanceof File && allowedTypes.includes(value.type);
    }),

  expertise: yup.string().when('subject', (subject, schema) => {
    if (typeof subject === 'string' && subject === 'Project') {
      return schema
        .required('Expertise is required for projects')
        .oneOf(
          Object.values(Expertise) as string[],
          'Please select a valid expertise'
        );
    }
    return schema.optional();
  }),
  
  madeIn: yup.string().when('subject', (subject, schema) => {
    if (typeof subject === 'string' && subject === 'Project') {
      return schema
        .required('Made In field is required for projects')
        .oneOf(
          Object.values(MadeInExpertise) as string[],
          'Please select a valid option'
        );
    }
    return schema.optional();
  }),
}) as yup.ObjectSchema<FormData>;

export interface CustomCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}