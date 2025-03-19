"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { CustomCheckbox } from "@/components/ui/Checkbox";
import { useTheme } from "@/lib/themes";



const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  agreeTerms: yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
});

export default function Newsletter() {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: { agreeTerms?: boolean; email: string }) => {
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // WordPress API endpoint for newsletter subscription
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you for subscribing to our newsletter!",
        });
        reset();
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const arrowIcon =
    theme === "dark"
      ? "/images/icons/arrowRightLight.svg" 
      : "/images/icons/arrowRight.svg"; 

  return (
    <div className="w-full">
      {submitStatus.success ? (
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
          <p className="text-green-600 dark:text-green-400">{submitStatus.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Email Input */}
          <div className="relative mb-4 w-full">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex items-center border-b pb-2 transition-colors focus-within:border-[#454545] w-full">
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email address"
                    className={`w-full text-lg bg-transparent focus:outline-none ${
                      errors.email ? "border-red-500" : "border-transparent"
                    } placeholder-foreground placeholder:text-sm`}
                    disabled={isSubmitting}
                  />
                  <button 
                    type="submit" 
                    className="ml-2 flex-shrink-0" 
                    disabled={isSubmitting}
                  >
                    <Image
                      src={arrowIcon}
                      alt="Arrow Right"
                      width={19}
                      height={19}
                      className={`text-lg ${isSubmitting ? 'opacity-50' : ''}`}
                    />
                  </button>
                </div>
              )}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <CustomCheckbox
              name="agreeTerms"
              control={control}
              label="I agree to the terms and conditions"
              defaultValue={false}
              className="space-x-2"
            />
            {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>}
          </div>

          {submitStatus.success === false && (
            <p className="text-sm text-red-500 mt-2">{submitStatus.message}</p>
          )}
        </form>
      )}
    </div>
  );
}