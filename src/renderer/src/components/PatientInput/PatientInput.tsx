import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

interface PatientFormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  address?: string
}

function MaterialInput({
  label,
  error,
  type = "text",
  ...inputProps
}: {
  label: string
  error?: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const isDate = type === "date"

  return (
    <div className="relative w-full mb-6">
      <input
        type={type}
        placeholder=" "
        className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-5 pb-1 text-sm text-gray-400
          focus:border-blue-600 focus:outline-none transition-colors
          placeholder-transparent
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          [&::-webkit-calendar-picker-indicator]:rounded
          [&::-webkit-calendar-picker-indicator]:p-1
          [&::-webkit-calendar-picker-indicator]:hover:bg-blue-100
          [&::-webkit-calendar-picker-indicator]:transition-colors
          [&::-webkit-calendar-picker-indicator]:invert
          [&::-webkit-calendar-picker-indicator]:opacity-60
          [&::-webkit-calendar-picker-indicator]:hover:opacity-100`}
        {...inputProps}
      />
      <label
        className={`absolute left-0 text-sm transition-all duration-200
          ${isDate
            ? 'top-0 text-xs text-gray-500 peer-focus:text-blue-600'
            : `top-4 text-gray-500
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600
               peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500`
          }`}
      >
        {label}
      </label>
      <div
        className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-blue-600 transition-all duration-300
          peer-focus:left-0 peer-focus:w-full"
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  )
}

function PatientInput() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PatientFormData>();
  const dispatch = useDispatch();

  const onSubmit = (patientInfo: PatientFormData) => {
    console.log(patientInfo)

    reset()
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Patient Input</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-6">
          <MaterialInput
            label="First Name"
            error={errors.firstName?.message}
            {...register('firstName', { required: 'First name is required' })}
          />
          <MaterialInput
            label="Last Name"
            error={errors.lastName?.message}
            {...register('lastName', { required: 'Last name is required' })}
          />
        </div>

        <MaterialInput
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth?.message}
          {...register('dateOfBirth', { required: 'Date of birth is required' })}
        />

        <MaterialInput
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
        />

        <MaterialInput
          label="Phone"
          error={errors.phone?.message}
          {...register('phone', {
            required: 'Phone is required',
            minLength: { value: 10, message: 'Phone must be at least 10 digits' },
          })}
        />

        <MaterialInput
          label="Address"
          {...register('address')}
        />

        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 py-2.5 text-sm font-medium text-white uppercase tracking-wide
            shadow hover:bg-blue-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Patient
        </button>
      </form>
    </div>
  )
}

export default PatientInput
