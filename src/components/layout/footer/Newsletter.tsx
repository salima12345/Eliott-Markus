"use client";

import { useForm, Controller } from "react-hook-form";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      agreeTerms: false,
    },
  });

  const onSubmit = (data: { agreeTerms?: boolean; email: string }) => {
    console.log(data);
  };

  const arrowIcon =
    theme === "dark"
      ? "/images/icons/arrowRightLight.svg" 
      : "/images/icons/arrowRight.svg"; 

  return (
    <div className="w-full">
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
                  placeholder="Adresse mail"
                  className={`w-full text-lg bg-transparent focus:outline-none ${
                    errors.email ? "border-red-500" : "border-transparent"
                  } placeholder-foreground placeholder:text-sm`}
                />
                <button type="submit" className="ml-2 flex-shrink-0">
                  <Image
                    src={arrowIcon}
                    alt="Arrow Right"
                    width={19}
                    height={19}
                    className="text-lg"
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
            label="J’accepte les conditions générales"
            defaultValue={false}
            className="space-x-2"
          />
          {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>}
        </div>
      </form>
    </div>
  );
}
