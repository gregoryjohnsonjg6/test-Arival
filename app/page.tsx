"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
//@ts-ignore
import { useCountries } from "use-react-countries";
import {
  Card,
  Input,
  Button,
  Typography,
  Menu,
  Option,
  Select,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { classNames } from "./lib";

type Inputs = {
  username: string;
  email: string;
  phone: string;
  country: string;
  password?: string;
  passwordConfirm?: string;
};

export default function Home() {
  const [step, setStep] = useState(1);
  const { countries } = useCountries();
  const [phoneCountry, setPhoneCountry] = useState(195);
  const { name, flags, countryCallingCode } = countries[phoneCountry];
  const [countryName, setCountryName] = useState(countries[195].name);
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const password = watch('password');

  const onSubmit = () => {
    if (step === 1 ) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  }

  const renderStep1 = () => (
    <div
      className="mb-1 flex flex-col gap-6"
    >
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3 text-white"
      >
        Username
      </Typography> 
      <Input
        size="lg"
        placeholder="Input username (at least 4 characters)"
        className="focus:!border-primary"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "bg-white rounded-lg",
        }}
        crossOrigin={undefined}
        {...register("username", { required: {value: true, message: 'Username is required'}, minLength: {value: 4, message:'Username must be at least 4 characters long'}, maxLength: {value: 12, message: 'Username must be at most 12 characters long'} })}
      />
      {errors.username && <span className="text-red-700">{errors.username.message}</span>}
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3 text-white"
      >
        Email
      </Typography>
      <Input
        size="lg"
        placeholder="Input email"
        className="focus:!border-primary"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "bg-white rounded-lg",
        }}
        type="email"
        crossOrigin={undefined}
        {...register("email", { required: {value: true, message: 'Email is required'} })}
      />
      {errors.email && <span className="text-red-700">{errors.email.message}</span>}
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3 text-white"
      >
        Phone number
      </Typography>
      <div className="relative flex w-full max-w-[24rem]">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-white focus:!bg-white pl-3"
            >
              <img
                src={flags.svg}
                alt={name}
                className="h-4 w-4 rounded-full object-cover"
              />
              {countryCallingCode}
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {countries.map(
              //@ts-ignore
              ({ name, flags, countryCallingCode }, index) => {
                return (
                  <MenuItem
                    key={name}
                    value={name}
                    className="flex items-center gap-2"
                    onClick={() => setPhoneCountry(index)}
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name}{" "}
                    <span className="ml-auto">
                      {countryCallingCode}
                    </span>
                  </MenuItem>
                );
              }
            )}
          </MenuList>
        </Menu>
        <Input
          type="tel"
          placeholder="Mobile Number"
          className="rounded-l-none focus:!border-transparent"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0 bg-white rounded-lg rounded-l-none",
          }}
          crossOrigin={undefined}
          {...register("phone", { required: {value:true, message: 'Phone number is required'}, pattern: {
            value: /^[0-9]{10}$/, // Regex pattern for a 10-digit phone number
            message: "Invalid phone number"
          } })}
        />
      </div>
      {errors.phone && <span className="text-red-700">{errors.phone.message}</span>}
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3 text-white"
      >
        Country
      </Typography>
      <Select
        size="lg"
        className="focus:!border-transparent !border-none"
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
        value={countryName}
        onChange={selectedOption => setCountryName(selectedOption)}
        containerProps={{
          className: "bg-white rounded-lg"
        }}
      >
        {/* @ts-ignore */}
        {countries.map(({ name, flags }) => (
          <Option key={name} value={name} className="flex items-center gap-2">
            <img
              src={flags.svg}
              alt={name}
              className="h-5 w-5 rounded-full object-cover"
            />
            {name}
          </Option>
        ))}
      </Select>
      
      {errors.country && <span className="text-red-700">{errors.country.message}</span>}
    </div>
  );
  const renderStep2 = () => (
    <div
      className="mb-1 flex flex-col gap-6"
    >
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3 text-white"
      >
        Password
      </Typography>
      <Input
        size="lg"
        placeholder="Input password"
        className="focus:!border-primary"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "bg-white rounded-lg",
        }}
        type="password"
        {...register("password", {required: {value:true, message: 'Password is required'}, minLength: {value:8, message: 'Password must be at least 8 characters long'}, maxLength: {value: 16, message: 'Password must be at most 16 characters long'}})}
      />
      {errors.password && <span className="text-red-700">{errors.password.message}</span>}
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3 text-white"
      >
        Repeat password
      </Typography>
      <Input
        size="lg"
        placeholder="Repeat password"
        className="focus:!border-primary"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "bg-white rounded-lg",
        }}
        type="password"
        {...register("passwordConfirm", {required: {value: true, message: 'Confirm Password is required'}, validate: value => value === password || "Passwords do not match"})}
      />
      {errors.passwordConfirm && <span className="text-red-700">{errors.passwordConfirm.message}</span>}
    </div>
  );
  const renderStep3 = () => (
    <div
      className="mb-1 flex flex-col gap-6"
    >
      <div className="flex justify-between">
        <p className="text-secondary">Username</p>
        <p className="text-white">{getValues("username")}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-secondary">Email</p>
        <p className="text-white">{getValues("email")}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-secondary">Country</p>
        <p className="text-white">{countryName}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-10 mt-32">
        <Typography
          variant="h3"
          className="text-black"
        >
          Super test form
        </Typography>
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-secondary"
        >
          {step === 1? 'Initial info': step === 2? 'Password screen': 'Review screen'}
        </Typography>
      </div>
      <div className="md:grid md:grid-cols-3 flex flex-col">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-4 items-center">
            <div
              className={classNames(
                "h-5 w-5 rounded-sm",
                step === 1 ? "bg-primary" : "bg-[#87839F]"
              )}
            />
            <p className="text-[#817CA5]">Initial info</p>
          </div>
          <div className="flex gap-4 items-center">
            <div
              className={classNames(
                "h-5 w-5 rounded-sm",
                step === 2 ? "bg-primary" : step === 1 ? "bg-secondary" : "bg-[#87839F]"
              )}
            />
            <p className="text-[#817CA5]">Password screen</p>
          </div>
          <div className="flex gap-4 items-center">
            <div
              className={classNames(
                "h-5 w-5 rounded-sm",
                step === 3 ? "bg-primary" : "bg-secondary"
              )}
            />
            <p className="text-[#817CA5]">Review</p>
          </div>
        </div>
        <div className="w-fit rounded-xl px-5 py-10 bg-[#817CA5] flex flex-col gap-10">
          <Card color="transparent" shadow={false}>
            <form
              className="mt-2 mb-2 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit(onSubmit)}
            >
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              <Button type="submit" className={classNames("capitalize mt-10 text-xl", Object.keys(errors).length !== 0 ? 'bg-secondary text-primary' : 'bg-white text-black' )} fullWidth disabled={Object.keys(errors).length !== 0} >
                <p>{step === 3 ? 'Complete' : 'Continue'}</p>
              </Button>
            </form>
          </Card>
        </div>
        <div></div>
      </div>
    </div>
  );
}
