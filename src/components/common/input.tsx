"use client"

import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, LegacyRef, useState } from "react"
import { Eye, EyeOff, Upload } from "./icons"
import clsx from "clsx"
import { branch } from "@/fonts/branch/branch"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
}

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