import PropTypes from "prop-types";

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`neuromorphic w-full p-2 ${className}`}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
