import { Controller } from 'react-hook-form'

const InputComponent = ({
  type = 'text',
  placeholder,
  name,
  id,
  error,
  control,
  validate,
  className,
  label,
  disabled,
  readOnly,
  maxLength,
  autoComplete,
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { onChange, onBlur, ...props } }: any) => {
        return (
          <div className={className}>
            {
              label && (<div>{label}</div>)
            }
            <div className="w-full relative">
              <input
                name={name}
                id={id || name}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                className={error ? `${className} invalid` : className}
                disabled={disabled}
                readOnly={readOnly}
                maxLength={maxLength}
                autoComplete={autoComplete}
                {...props}
              />
              {
                error && (
                  <span>
                    {error}
                  </span>
                )
              }
            </div>
          </div>
        )
      }}
    />
  )
}

export default InputComponent
