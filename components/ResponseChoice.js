export const ResponseChoice = ({ choice }) => {
  const splitChoice = choice.text.split(/[-•]/);
  const spliteChoiceShifted = splitChoice.shift();
  return (
    <ul className="list-decimal list-inside">
      {splitChoice.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
};
