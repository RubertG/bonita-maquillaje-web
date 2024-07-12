"use client"

import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, LegacyRef, useState } from "react"
import { Eye, EyeOff, Selector, Upload } from "./icons"
import clsx from "clsx"
import { branch } from "@/fonts/branch/branch"
import { Category } from "@/types/db/db"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = forwardRef(function Input({ className, ...props }: InputProps, ref: LegacyRef<HTMLInputElement> | undefined) {
  return (
    <input className={`w-full rounded-lg px-3.5 py-2.5 focus:outline-bg-200 bg-bg-50 text-text-200 font-light placeholder:text-gray-400 shadow-button ${className}`} {...props} {...(ref == undefined) ? {} : { ref }} />
  )
})

export const PasswordInput = forwardRef(function PasswordInput({ className, ...props }: InputProps, ref: LegacyRef<HTMLInputElement> | undefined) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className={`flex items-center w-full bg-bg-50 rounded-lg pr-2.5 gap-1 shadow-button ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        className="w-full rounded-lg px-3.5 py-2.5 focus:outline-none text-text-200 font-light placeholder:text-gray-400"
        {...props} {...(ref == undefined) ? {} : { ref }} />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}>
        <Eye className={clsx("stroke-text-200", { "hidden": showPassword })} />
        <EyeOff className={clsx("stroke-text-200", { "hidden": !showPassword })} />
      </button>
    </div>
  )
})

export const FileInput = forwardRef(function FileInput({ className, ...props }: InputProps, ref: LegacyRef<HTMLInputElement> | undefined) {
  return (
    <button className={`block w-full ${className}`}>
      <label
        className={`relative w-full inline-flex items-center justify-center py-2.5 px-3.5 rounded-lg bg-accent-200 text-text-100 gap-2 text-center text-xl shadow-button lg:hover:bg-principal-100 lg:transition-colors cursor-pointer ${branch.className}`}
        htmlFor="file">
        <Upload className="absolute top-1/2 -translate-y-1/2 left-0 ml-3.5 stroke-text-100 w-6 h-6" />
        Cargar imágenes
        <input
          type="file"
          id="file"
          accept="image/*"
          multiple
          className="hidden"
          {...props} {...(ref == undefined) ? {} : { ref }} />
      </label>
    </button>
  )
})

interface SelectInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  items?: Pick<Category, "name" | "id">[]
  title: string
}

export const SelectInput = forwardRef(function SelectInput({ className, items, title, ...props }: SelectInputProps, ref: LegacyRef<HTMLSelectElement> | undefined) {
  return (
    <div className="relative cursor-pointer">
      <select
        className={`w-full rounded-lg px-3.5 py-2.5 border-none focus:outline-bg-200 bg-bg-50 text-text-200 font-light placeholder:text-gray-400 appearance-none shadow-button cursor-pointer ${className}`}
        defaultValue={title}
        {...props} {...(ref == undefined) ? {} : { ref }}>
        <option
          className="text-text-300 font-light py-1 bg-bg-50 hover:bg-bg-200"
          disabled
          selected 
          value="">{title}</option>
        {items?.map((item) => (
          <option
            className="text-text-200 font-light py-1 bg-bg-50 cursor-pointer hover:bg-bg-200"
            key={item.id}
            value={item.id}>{item.name}</option>
        ))}
      </select>
      <Selector className="absolute stroke-text-200 right-3 top-1/2 -translate-y-1/2" />
    </div>
  )
})

interface TextAreaProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

export const TextArea = forwardRef(function TextArea({ className, ...props }: TextAreaProps, ref: LegacyRef<HTMLTextAreaElement> | undefined) {
  return (
    <textarea
      className={`w-full rounded-lg px-3.5 py-2.5 resize-none focus:outline-bg-200 bg-bg-50 text-text-200 font-light placeholder:text-gray-400 shadow-button ${className}`}
      {...props} {...(ref == undefined) ? {} : { ref }} />
  )
})