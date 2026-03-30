import { useEffect, useState } from "react";

const Form = ({ fields, onSubmit, formId, onFileChange }) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const initialData = fields.map(field => ({
      id: field.id,
      value: field.value || ''
    }));
    setFormData(initialData);
  }, [fields]);

  const handleChange = (e, id, type) => {
    const value = type === 'file' ? e.target.files[0] : e.target.value;

    setFormData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, value } : item
      )
    );

    if (type === 'file' && onFileChange) {
      onFileChange(e);
    }
  };

  const getValue = (id) => {
    const field = formData.find(item => item.id === id);
    return field ? field.value : '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {};
    formData.forEach(item => {
      formattedData[item.id] = item.value;
    });

    onSubmit(formattedData);
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.id} style={{ marginBottom: '10px' }}>
          <label htmlFor={field.id}>{field.label}</label>
          <div>
            {(() => {
              switch (field.type) {
                case 'input':
                  return (
                    <input
                      type={field.inputType || "text"}
                      id={field.id}
                      placeholder={field.placeholder}
                      value={getValue(field.id)}
                      onChange={(e) => handleChange(e, field.id)}
                      style={{ padding: '8px', width: '100%' }}
                    />
                  );

                case 'image':
                  return (
                    <input
                      type="file"
                      id={field.id}
                      accept="image/*"
                      onChange={(e) => handleChange(e, field.id, 'file')}
                      style={{ padding: '8px' }}
                    />
                  );

                case 'dropdown':
                  return (
                    <select
                      id={field.id}
                      value={getValue(field.id)}
                      onChange={(e) => handleChange(e, field.id)}
                      style={{ padding: '8px', width: '100%' }}
                    >
                      <option value="" disabled>
                        {field.placeholder || "Select an option"}
                      </option>
                      {field.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  );

                default:
                  return null;
              }
            })()}
          </div>
        </div>
      ))}
    </form>
  );
};

export default Form;