import React, { useRef } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";

interface RichTextEditorProps {
  title?: string; // Title of the editor
  style?: React.CSSProperties|object; // Custom styles for the container
  className?: string; // Optional class name for styling
  placeholder?: string; // Placeholder text
  setValue: (value: string) => void; // Function to handle value change
  initialValue?: string; // Initial content
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  title = "Rich Text Editor",
  style,
  placeholder = "Start typing...",
  setValue,
  initialValue = "",
}) => {
  const richText = useRef<RichEditor>(null);

  return (
    <View style={[{ flex: 1, padding: 10, backgroundColor: "#F5F7FA" }, style]}>
      {/* Title */}
      {title && <Text style={{ fontSize: 18, marginBottom: 10 }}>{title}</Text>}

      {/* Rich Text Editor */}
      <RichEditor
        ref={richText}
        style={{ flex: 1, borderRadius: 10, backgroundColor: "white", padding: 10 }}
        placeholder={placeholder}
        initialContentHTML={initialValue}
        onChange={(text) => setValue(text)} // Set value when content changes
      />

      {/* Toolbar */}
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertImage,
          actions.undo,
          actions.redo,
        ]}
        iconTint={"#4A43EC"} // Customize the toolbar icon color
      />
    </View>
  );
};

export default RichTextEditor;
