import  BaseNode  from "./components/BaseNode.jsx";

export const InputNode = ({ id, data }) => {
  const customFields = [
    {
      label: "Name",
      name: "inputName",
      type: "text",
      default: data?.inputName || id.replace("node-", "input_"),
    },
    {
      label: "Type",
      name: "inputType",
      type: "select",
      options: ["Text", "File"],
      default: data?.inputType || "Text",
    },
  ];

  const inputHandles = []; // Input node has no inputs
  const outputHandles = [{ id: `${id}-output` }]; // Output handle for connections

  return (
    <BaseNode
      id={id}
      label="Input"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
