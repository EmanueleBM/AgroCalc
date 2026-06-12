function FormField({ error, field, onChange, value }) {
  const errorId = error ? `${field.name}-error` : undefined;

  return (
    <label className="field">
      <span>
        {field.label}
        <em>{field.required ? 'obligatorio' : 'opcional'}</em>
      </span>
      <div className="input-shell">
        <input
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          inputMode="decimal"
          min="0"
          name={field.name}
          onChange={onChange}
          placeholder={field.placeholder}
          type="number"
          value={value}
        />
        <b>{field.suffix}</b>
      </div>
      {error ? (
        <small className="field-error" id={errorId}>
          {error}
        </small>
      ) : null}
    </label>
  );
}

export default FormField;
