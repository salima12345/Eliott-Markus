'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { CustomCheckbox } from '@/components/ui/Checkbox';
import { FormData } from '@/types/forms';
import ArrowUpRightIcon from '@/components/ui/ArrowUp';
import ObjetMenu from './components/ObjectMenu';
import AttachmentField from './components/Attachement';
import { contactFormSchema } from '@/types/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { getFormContent } from './components/ContactFormContent';
import MadeMenu from './components/MadeIn';
import ExpertiseMenu from './components/Expertise';
import { Expertise as ExpertiseType } from './components/Expertise';
import { Expertise as MadeInType } from './components/MadeIn';
import { Subject } from '@/types/enums';

const Contact: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      website: '',
      message: '',
      agree: false,
      subject: '',
      attachment: null,
      expertise: undefined,
      madeIn: undefined,
    },
  });

  const selectedSubject = watch('subject') as Subject;
  const formContent = getFormContent(selectedSubject);
  const showAttachment = selectedSubject === 'Hiring';
  const showProjectMenus = selectedSubject === 'Project';

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // Add your submission logic here
  };

  const handleFileSelect = (file: File | null) => {
    setValue('attachment', file, { shouldValidate: true });
  };

  return (
    <>
    <div className="container mx-auto px-4 h-screen mt-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full rounded-[27px] bg-grayDark p-5 md:p-8 flex flex-col xl:flex-row gap-5"
        autoComplete="off"
      >
        <div className="w-full relative">
          <h3 className="text-[20px] xl:text-[34px] font-semibold">{formContent.title}</h3>

          <div className="absolute top-[50px] xl:top-[70px] left-0 z-30 w-full flex xl:flex-row flex-col gap-4 ">
            <div className="flex flex-col">
              <Controller
                name="subject"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ObjetMenu
                    selectedItem={value || "Subject *"}
                    onSelect={(newValue: string) => {
                      onChange(newValue);
                      if (newValue !== 'Hiring') {
                        setValue('attachment', null);
                      }
                      if (newValue !== 'Project') {
                        setValue('expertise', undefined);
                        setValue('madeIn', undefined);
                        
                      }
                    }}
                  />
                )}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            {showProjectMenus && (
              <>
                <div className="flex flex-col">
                  <Controller
                    name="expertise"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <ExpertiseMenu
                        selectedItem={value || "E&M expertise *"}
                        onSelect={(newValue: ExpertiseType) => onChange(newValue)}
                      />
                    )}
                  />
                  {errors.expertise && <p className="text-red-500 text-xs mt-1">{errors.expertise.message}</p>}
                </div>

                <div className="flex flex-col">
                  <Controller
                    name="madeIn"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MadeMenu
                        selectedItem={value || "Made in em *"}
                        onSelect={(newValue: MadeInType) => onChange(newValue)}
                      />
                    )}
                  />
                  {errors.madeIn && <p className="text-red-500 text-xs mt-1">{errors.madeIn.message}</p>}
                </div>
              </>
            )}

            {showAttachment && (
              <div className="flex flex-col">
                <AttachmentField onFileSelect={handleFileSelect} />
                {errors.attachment && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.attachment.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
            <div className="form-group">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="First Name *"
                    error={errors.firstName?.message}
                    className="w-full bg-transparent border-b border-[#2e2e2e] outline-none py-3 transition-all text-white placeholder:text-[#454545]"
                  />
                )}
              />
            </div>

            <div className="form-group">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Last Name *"
                    error={errors.lastName?.message}
                    className="w-full bg-transparent border-b border-[#2e2e2e] outline-none py-3 transition-all placeholder:text-[#454545]"
                  />
                )}
              />
            </div>

            <div className="form-group">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email Address *"
                    error={errors.email?.message}
                    className="w-full bg-transparent border-b border-[#2e2e2e] outline-none py-3 transition-all placeholder:text-[#454545]"
                  />
                )}
              />
            </div>

            <div className="form-group">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Phone Number *"
                    error={errors.phone?.message}
                    className="w-full bg-transparent border-b border-[#2e2e2e] outline-none py-3 transition-all placeholder:text-[#454545]"
                  />
                )}
              />
            </div>

            <div className="form-group">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="City"
                    error={errors.city?.message}
                    className="w-full bg-transparent border-b border-[#2e2e2e] outline-none py-3 transition-all placeholder:text-[#454545]"
                  />
                )}
              />
            </div>

            <div className="form-group">
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="url"
                    placeholder="Website"
                    error={errors.website?.message}
                    className="w-full bg-transparent border-b border-[#2e2e2e] outline-none py-3 transition-all placeholder:text-[#454545]"
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="font-medium text-[#fff] opacity-50 mb-[5px]">Message</label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={4}
                  placeholder={formContent.messagePlaceholder}
                  className="w-full bg-transparent border border-[#2e2e2e] rounded-lg p-3"
                />
              )}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
        </div>

        <div className="mt-8 flex justify-end items-end">
          <button
            type="submit"
            className="w-[120px] h-[120px] bg-[#f2bd41] p-3 rounded-[15px] transition-all duration-300 transform hover:scale-105 flex flex-col justify-between"
          >
            <div className="ml-auto right-0">
              <ArrowUpRightIcon color="#1d4520" />
            </div>
            <div className="text-[#1d4520] font-medium text-[20px]">send</div>
          </button>
        </div>
      </form>

      <div className="w-full rounded-[27px] bg-grayDark p-5 md:p-8 mt-4">
        <Controller
          name="agree"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CustomCheckbox
              name="agree"
              control={control}
              label="I agree to share my data with Eliott & Markus as detailed in the privacy policy"
              onChange={onChange}
              defaultValue={value}
            />
          )}
        />
        {errors.agree && <p className="text-xs text-red-500 mt-2">{errors.agree.message}</p>}
      </div>
    </div>
    </>

  );
};

export default Contact;