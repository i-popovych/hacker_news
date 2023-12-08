import './index.css'


export const CustomSelector = ({ value, handleChange, options }) => {
  return (
    <div className="custom-selector-container">
      <select className="selector" value={value} onChange={(e) =>  handleChange(e.currentTarget.value)}>
        {options.map(({value, name}) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
