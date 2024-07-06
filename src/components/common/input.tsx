"use client"

import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, LegacyRef, useState } from "react"
import { Eye, EyeOff } from "./icons"
import clsx from "clsx"

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
}

export const Input = forwardRef(function Input({ className, ...props }: InputProps, ref: LegacyRef<HTMLInputElement> | undefined) {
  return (
    <input className={`w-full rounded-lg px-3.5 py-2.5 focus:outline-bg-200 bg-bg-50 text-text-200 font-light placeholder:text-gray-400 ${className}`} {...props} {...(ref == undefined) ? {} : { ref }} />
  )
})

export const PasswordInput = forwardRef(function PasswordInput({ className, ...props }: InputProps, ref: LegacyRef<HTMLInputElement> | undefined) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className={`flex items-center w-full bg-bg-50 rounded-lg pr-2.5 gap-1 ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        className="w-full rounded-lg px-3.5 py-2.5 focus:outline-none text-text-200 font-light placeholder:text-gray-400"
        {...props} {...(ref == undefined) ? {} : { ref }}/>
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}>
        <Eye className={clsx("stroke-text-200", { "hidden": showPassword })} />
        <EyeOff className={clsx("stroke-text-200", { "hidden": !showPassword })} />
      </button>
    </div>
  )
})
