import { forwardRef } from "react"

interface FormSelectProps {
  label: string
  required?: boolean
  error?: string
  options: { value: string; label: string }[]
  className?: string
  value?: string
  onValueChange?: (value: string) => void
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, value, onValueChange, onChange, required = false, error, options, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-2 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          ref={ref}
          {...props} // react-hook-form register will attach onChange, ref, name
          {...(value !== undefined ? { value } : {})} // only set value if defined (controlled)
          onChange={(e) => {
            onChange?.(e)          // for react-hook-form
            onValueChange?.(e.target.value) // for controlled usage
          }}
          className={`w-full h-12 px-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#202A37] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
        >
          <option value="">নির্বাচন করুন</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }
)

FormSelect.displayName = "FormSelect"
