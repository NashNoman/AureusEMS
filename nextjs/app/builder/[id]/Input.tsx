export const SingleChoiceInput = ({ id, text, isChecked, qid }) => {
  let labelCn = "border";
  const inputId = id.toString() + qid.toString();
  return (
    <label
      htmlFor={inputId}
      className={`cursor-pointer hover:shadow-sm transition-shadow flex rounded-md items-center ${
        isChecked ? "border-2 border-green-300 bg-green-50" : "border"
      }`}
    >
      <input
        type="radio"
        name={qid}
        id={inputId}
        value={id}
        className=""
        // checked={isChecked}
      />
      <span className="font-semibold py-3 px-4 bg-gray-500 rounded-l-md bg-opacity-20">
        {id}
      </span>
      <span className="mx-3">{text}</span>
    </label>
  );
};
