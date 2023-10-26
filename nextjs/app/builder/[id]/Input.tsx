export const SingleChoiceInput = ({ id, text, isChecked }) => {
  let labelCn = "border";
  return (
    <label
      htmlFor={id}
      className={`cursor-pointer hover:shadow-sm transition-shadow flex rounded-md items-center ${
        isChecked ? "border-2 border-green-300 bg-green-50" : "border"
      }`}
    >
      <input
        type="radio"
        name={id.toString()}
        id={id}
        value={id}
        className=""
        checked={isChecked}
      />
      <span className="font-semibold py-3 px-4 bg-gray-500 rounded-l-md bg-opacity-20">
        {id}
      </span>
      <span className="mx-3">{text}</span>
    </label>
  );
};
